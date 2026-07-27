#!/usr/bin/env python3
"""Scrape all episode transcripts of a LISTEN (listen.style) podcast into markdown.

Usage: python3 scrape_listen.py <channel>            # e.g. karaage0703
       python3 scrape_listen.py <channel> --limit 3  # first N episodes (test)

Output: ./<channel>/NNN-<slug>.md, one file per episode. Existing files are
skipped, so reruns only fetch new episodes.
"""

import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path

BASE = "https://listen.style"
UA = {"User-Agent": "Mozilla/5.0 (transcript-archiver; personal use)"}
DELAY_SEC = 1.0


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read()


class TranscriptParser(HTMLParser):
    """Extracts chapters and speech segments from <article id="transcript">."""

    SKIP_TAGS = {"textarea", "button", "script", "style", "svg"}

    def __init__(self):
        super().__init__()
        self.in_article = False
        self.article_depth = 0
        self.segment_depth = 0
        self.skip_depth = 0
        self.buf = []
        self.chapters = []  # [{"time": str, "title": str, "segments": [str]}]

    def _attrs(self, attrs):
        return dict(attrs)

    def handle_starttag(self, tag, attrs):
        a = self._attrs(attrs)
        if not self.in_article:
            if tag == "article" and a.get("id") == "transcript":
                self.in_article = True
                self.article_depth = 1
            return

        self.article_depth += 1
        if self.skip_depth:
            self.skip_depth += 1
            return
        if tag in self.SKIP_TAGS:
            self.skip_depth = 1
            return

        cls = a.get("class", "")
        if tag == "div" and "chunk-header" in cls:
            self.chapters.append({
                "time": a.get("data-time", ""),
                "title": a.get("data-title", ""),
                "segments": [],
            })
        elif tag == "div" and "replaceable-content" in cls:
            if not self.chapters:
                self.chapters.append({"time": "", "title": "", "segments": []})
            self.segment_depth = 1
            self.buf = []
        elif self.segment_depth:
            self.segment_depth += 1

    def handle_endtag(self, tag):
        if not self.in_article:
            return
        self.article_depth -= 1
        if self.article_depth <= 0:
            self.in_article = False
            return
        if self.skip_depth:
            self.skip_depth -= 1
            return
        if self.segment_depth:
            self.segment_depth -= 1
            if self.segment_depth == 0:
                text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
                if text:
                    self.chapters[-1]["segments"].append(text)

    def handle_data(self, data):
        if self.in_article and self.segment_depth and not self.skip_depth:
            self.buf.append(data)


def episode_markdown(title, date, url, podcast, chapters) -> str:
    lines = [
        "---",
        f'title: "{title.replace(chr(34), chr(39))}"',
        f"date: {date}",
        f"url: {url}",
        f'podcast: "{podcast}"',
        "---",
        "",
        f"# {title}",
    ]
    for ch in chapters:
        if not ch["segments"]:
            continue
        heading = " ".join(x for x in (ch["time"], ch["title"]) if x)
        if heading:
            lines += ["", f"## {heading}"]
        lines += ["", "\n\n".join(ch["segments"])]
    lines.append("")
    return "\n".join(lines)


def main():
    channel = sys.argv[1] if len(sys.argv) > 1 else "karaage0703"
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])

    out_dir = Path(__file__).parent / channel
    out_dir.mkdir(parents=True, exist_ok=True)

    rss_bytes = fetch(f"{BASE}/p/{channel}/rss")
    # XXE / billion-laughs both need a DTD; refuse any feed that declares one
    if re.search(rb"<!(DOCTYPE|ENTITY)", rss_bytes[:4096], re.I):
        sys.exit("refusing to parse RSS containing a DTD declaration")
    rss = ET.fromstring(rss_bytes)
    podcast = rss.findtext("channel/title", default=channel)
    items = []
    for item in rss.iter("item"):
        link = item.findtext("link", default="")
        if f"/p/{channel}/" not in link:
            continue
        pub = item.findtext("pubDate")
        items.append({
            "title": item.findtext("title", default="untitled").strip(),
            "link": link.strip(),
            "date": parsedate_to_datetime(pub).date().isoformat() if pub else "",
        })

    items.reverse()  # oldest first -> stable episode numbering
    if limit:
        items = items[-limit:]
    print(f"{podcast}: {len(items)} episodes, output -> {out_dir}", flush=True)

    ok = skipped = failed = 0
    for i, ep in enumerate(items, start=1):
        slug = ep["link"].rstrip("/").rsplit("/", 1)[-1]
        path = out_dir / f"{i:03d}-{slug}.md"
        if path.exists():
            skipped += 1
            continue
        try:
            parser = TranscriptParser()
            parser.feed(fetch(ep["link"]).decode("utf-8", errors="replace"))
            n_seg = sum(len(c["segments"]) for c in parser.chapters)
            if n_seg == 0:
                print(f"WARN {path.name}: no transcript segments found", flush=True)
                failed += 1
            else:
                path.write_text(
                    episode_markdown(ep["title"], ep["date"], ep["link"],
                                     podcast, parser.chapters),
                    encoding="utf-8")
                ok += 1
                print(f"{path.name}: {n_seg} segments", flush=True)
        except Exception as e:  # keep going; rerun picks up the misses
            print(f"FAIL {ep['link']}: {e}", flush=True)
            failed += 1
        time.sleep(DELAY_SEC)

    print(f"done: {ok} written, {skipped} skipped, {failed} failed", flush=True)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
