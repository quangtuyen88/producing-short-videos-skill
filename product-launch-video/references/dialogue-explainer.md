# Dialogue explainer — VOICEVOX character-duo style (ずんだもん解説)

> Load in **Step 0** (cast mode), **Step 2** (design), **Step 3** (dialogue script), **Step 4** (chrome), and **Step 5** (frame-worker).
> Goal: reproduce the long-form Japanese "character commentary" video format — two VOICEVOX
> hosts talking over dense animated slides, with a persistent bottom dialogue band instead of
> karaoke captions. English variants keep the identical visual system with EN voices and copy.

This style was codified from a production reference (AtCoder AWTF 2026 recap, rendered with
Remotion, VOICEVOX ずんだもん + 四国めたん). It is the target look whenever a brief says
ずんだもん解説 / ゆっくり系 / character-duo commentary / "dialogue explainer", or shows a
reference video with a bottom speaker band and two mascot hosts.

---

## When this style applies

- Long-form (2–15 min) feature/event/match/product 解説 with two alternating hosts
- Briefs that name VOICEVOX characters or show a reference in this format
- JA first-class; EN supported (same chrome, translated copy, EN TTS voices)

When it applies, it **overrides** the default caption pill and the small cast dock from
`cast-avatars.md`: the dialogue band below IS the caption system and the cast presence.

---

## Palette (sampled from reference)

| Role | Hex | Use |
| --- | --- | --- |
| canvas | `#0f162a` → `#171e30` | Full-bleed gradient ground, faint diagonal hatch ≤6% opacity, soft vignette |
| panel | `#050b16` – `#0c1322` | Diagram/chart/card panels, 1px border `rgba(255,255,255,0.10)`, radius 8–10px |
| ink | `#f4f7ff` | Titles, dialogue text |
| muted | `#8b93a7` | Breadcrumb, sublabels, credits |
| gold | `#ffd24a` / `#e6be28` | Beams, highlights, numeric emphasis |
| cyan | `#35d4e0` | Secondary diagram elements |
| green | `#1bcc8c` / `#3dffb5` | Wins, AI/positive series, host-A accent |
| pink | `#ff6da3` | Host-B accent, second data series |
| red | `#ff5c5c` | Difficulty, warnings, section accents |
| blue | `#4a90e2` | "Human" series, links, section accents |

Typography: bold CJK gothic for JA (`Noto Sans JP` / `M PLUS 1p` — **ship the font file**,
never system-only); geometric bold sans for EN; monospace (`JetBrains Mono` class) for
scores, submission IDs, code. All px values in this document are at full 1920×1080.
Dialogue text 56–64px bold; section titles 56–60px bold.

---

## Persistent chrome

### 1. Bottom dialogue band (every spoken frame)

- Full-width strip inset ~115–125px from each side, ~25px from bottom, **height ~185–200px**
- Background near-black translucent (`rgba(4,10,19,0.92)`), 2px border
  `rgba(255,255,255,0.14)`, radius 14px
- **Speaker avatar**: circle 150–170px, vertically centered, overlapping the band's left
  edge; swaps with the active speaker
- **Name tag** pill under the avatar: host-A = yellow-green bg + dark text, host-B = pink bg
  + dark text (JA: ずんだもん / めたん; EN: the locked EN host names)
- **Line text**: bold ink, 56–64px, max 2 lines, left-aligned beside the avatar; inline
  color emphasis on key numbers/terms is encouraged
- One dialogue line per speaker turn; the band text and avatar **must swap exactly on the
  audio boundary** of each turn

### 2. Content-slide header (every content frame)

- Top-left: **accent bar** (~12×52px, radius 6px, color may vary per section: gold, red,
  cyan, green, blue) + section title, bold ink, 56–60px
- Top-right: series breadcrumb, 28–32px muted (e.g. `AWTF2026 Heuristic — Human vs AI`)

### 3. Title / hero slides

- No header bar. Centered stack: letter-spaced muted kicker → huge two-tone headline
  (e.g. blue term vs green term) → gold subtitle → optional pill rows (rosters, tags)
- Top-right corner: **engine credit** `VOICEVOX: <host names>` ~28px muted — **mandatory**
  on the first frame whenever VOICEVOX audio is used (VOICEVOX terms of use)

### 4. Outro / credits slide

- Summary panels + large thanks line + 2–4 muted credit lines: sources, code, 音声
  (VOICEVOX + host names), 立ち絵 author when third-party art is used, 制作 tool

---

## Layout patterns (content stage between header and band)

| Pattern | Shape |
| --- | --- |
| `two-col diagram` | Left: square grid/diagram panel (~38–42% width) with animated payload (beam, cascade); right: parts/legend/info cards |
| `chart panel` | Single wide panel: bar chart / timeline dots with per-series colors and axis sublabels |
| `submission card` | Monospace header (`submission #NNN — date`) + code/diff block with highlighted lines, callout rows |
| `score strip` | Big before→after numbers (`E 0.33 → 0.20`) with gold emphasis |
| `ranking table` | Rows: rank, name (series-colored), score in monospace; winner row highlighted |
| `dual timeline` | Two dot-series (pink/green) over a shared time axis with annotations |

Density bar from `density-and-chrome.md` applies: no single-line empty slides. A slide
persists across 3–8 dialogue turns; its inner elements reveal staged to the turns.

---

## Motion

- Hard cuts between slides; within a slide, staged reveals paced to dialogue turns
- Diagrams animate their payload (beam draw, splits, dots appearing along a timeline)
- Numbers count up or swap on the turn that speaks them
- The band itself does not animate except the text/avatar swap per turn (fast fade ~120ms)

---

## Audio (VOICEVOX route)

Engine: local VOICEVOX engine on `http://127.0.0.1:50021`
(Docker: `docker run -d --rm -p 50021:50021 voicevox/voicevox_engine:cpu-latest`).

Default JA speaker map — host-A: ずんだもん ノーマル `3`; host-B: 四国めたん ノーマル `2`.
Synthesis + per-line timing via this skill's `scripts/voicevox-tts.mjs`:

```bash
node <SKILL_DIR>/scripts/voicevox-tts.mjs check
node <SKILL_DIR>/scripts/voicevox-tts.mjs generate --script ./SCRIPT.md --outdir ./audio --out ./audio_meta.json
```

`generate` parses `speaker:` turns from SCRIPT.md, synthesizes one wav per turn, and writes
`audio_meta.json` with per-turn `start`/`duration` plus mora-derived `words[]` — drop-in for
duration sync and band-swap timing. BGM: none or very low lo-fi loop; speech is the track.

**EN variant**: identical visuals and band; copy translated (keep numbers/IDs verbatim);
TTS via the standard provider chain (`tts.md` in `../media-use/`) — two distinct EN voices,
one per host (e.g. Kokoro `af_heart` + `am_michael` offline). Band nameplates switch to the
EN host names. VOICEVOX credit line is dropped when VOICEVOX audio is not used.

**Character licensing**: VOICEVOX voices are usable with the credit line above. Character
likeness art (立ち絵) is third-party — never bundle it in this repo; have the user supply it
(credit the artist in the outro) or use original avatar art. Voices and names may be used
with credit even when the avatar art is original.

---

## Done-means checklist (style parity gate)

A render passes this style when all hold on a contact sheet + spot frames:

- [ ] Canvas within the sampled navy family (`#0f162a`±) with hatch/vignette, never pure black/white
- [ ] Bottom dialogue band present on all spoken frames, geometry per spec, avatar+name+text swap on audio turn boundaries
- [ ] Content slides have accent-bar header + breadcrumb; hero has none
- [ ] First frame shows the VOICEVOX credit when VOICEVOX voices are used
- [ ] ≥1 two-col diagram slide with animated payload; ≥1 chart/table panel slide
- [ ] Slides persist across multiple turns with staged reveals (no slide-per-sentence churn)
- [ ] JA text renders with a shipped CJK font (no tofu); EN variant same layout, EN voices, EN nameplates
- [ ] Output 1920×1080@30, h264 yuv420p
