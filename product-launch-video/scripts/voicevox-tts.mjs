#!/usr/bin/env node
// voicevox-tts.mjs — VOICEVOX synthesis for the dialogue-explainer style
// (references/dialogue-explainer.md). Self-contained client for a local
// VOICEVOX engine; no HeyGen/Kokoro plumbing. Two modes:
//
//   check    — verify the engine answers on --base (default http://127.0.0.1:50021).
//              Exits 1 with a docker hint when unreachable. Run in the FOREGROUND.
//   generate — parse `## Line N — … (Frame M)` sections from SCRIPT.md, read each
//              section's `speaker:` tag, synthesize one wav per turn, and write
//              audio_meta.json with per-turn start/duration plus accent-phrase
//              `words[]` derived from VOICEVOX mora timings (drop-in for reveal
//              pacing and dialogue-band swaps). Also concats ./audio/narration.wav.
//
//   node voicevox-tts.mjs check [--base URL]
//   node voicevox-tts.mjs generate --script ./SCRIPT.md --outdir ./audio --out ./audio_meta.json \
//        [--base URL] [--speakers '{"zundamon":3,"metan":2}'] [--speed 1.0] [--gap 0.35]
//
// Speaker ids are VOICEVOX style ids (GET /speakers). Defaults: ずんだもん
// ノーマル = 3, 四国めたん ノーマル = 2. Any tag present in --speakers works,
// so Pip/Bolt or custom casts can map onto any engine voice.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const argv = process.argv.slice(2);
const mode = argv[0] && !argv[0].startsWith("--") ? argv[0] : "generate";
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : def;
};

const BASE = (flag("base", "http://127.0.0.1:50021")).replace(/\/$/, "");
const DEFAULT_SPEAKERS = { zundamon: 3, metan: 2, "host-a": 3, "host-b": 2 };

const die = (msg) => {
  console.error(msg);
  process.exit(1);
};

async function engineVersion() {
  const res = await fetch(`${BASE}/version`, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.text()).replace(/"/g, "");
}

if (mode === "check") {
  try {
    console.log(`voicevox engine ${await engineVersion()} at ${BASE}`);
    process.exit(0);
  } catch {
    die(
      `voicevox engine unreachable at ${BASE}\n` +
        `Start one first, e.g.:\n` +
        `  docker run -d --rm --name voicevox -p 50021:50021 voicevox/voicevox_engine:cpu-latest\n` +
        `or launch the VOICEVOX app (https://voicevox.hiroshiba.jp/).`,
    );
  }
}

if (mode !== "generate") die(`unknown mode "${mode}" (use: check | generate)`);

const scriptPath = flag("script");
if (!scriptPath || !existsSync(scriptPath)) die("--script <SCRIPT.md> is required and must exist");
const outdir = resolve(flag("outdir", "./audio"));
const outMeta = resolve(flag("out", "./audio_meta.json"));
const speed = Number(flag("speed", "1.0"));
const gap = Number(flag("gap", "0.35"));
let speakers = DEFAULT_SPEAKERS;
const speakersArg = flag("speakers");
if (speakersArg) {
  try {
    speakers = { ...DEFAULT_SPEAKERS, ...JSON.parse(speakersArg) };
  } catch {
    die(`--speakers must be JSON like '{"zundamon":3,"metan":2}', got: ${speakersArg}`);
  }
}

// `## Line N — label (Frame M)` sections; a `speaker: <tag>` row (bare or
// bulleted or bold) sets the voice; the indented block is the spoken text.
function parseDialogueScript(md) {
  const out = [];
  let cur = null;
  const flush = () => {
    if (cur && cur.text.trim()) out.push({ ...cur, text: cur.text.trim().replace(/\s*\n\s*/g, "") });
    cur = null;
  };
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^#{2,3}\s+Line\s+(\d+).*?\(frame\s+(\d+)\)/i);
    if (h) {
      flush();
      cur = { line: Number(h[1]), frame: Number(h[2]), speaker: null, text: "" };
      continue;
    }
    if (!cur) continue;
    const sp = line.match(/^\s*(?:[-*]\s*)?\*{0,2}speaker\*{0,2}\s*:\s*([\w-]+)/i);
    if (sp) {
      cur.speaker = sp[1].toLowerCase();
      continue;
    }
    if (/^\s*\*\*\w[\w\s]*:\*\*/.test(line)) continue;
    if (/^(    |\t)\S/.test(line)) cur.text += (cur.text ? "\n" : "") + line.trim();
  }
  flush();
  return out;
}

async function synthesizeTurn(turn, idx) {
  const tag = turn.speaker ?? "host-a";
  const speaker = speakers[tag];
  if (speaker === undefined) die(`Line ${turn.line}: speaker "${tag}" not in speaker map ${JSON.stringify(speakers)}`);

  const qres = await fetch(
    `${BASE}/audio_query?speaker=${speaker}&text=${encodeURIComponent(turn.text)}`,
    { method: "POST" },
  );
  if (!qres.ok) die(`audio_query failed for Line ${turn.line}: HTTP ${qres.status}`);
  const query = await qres.json();
  query.speedScale = speed;

  const sres = await fetch(`${BASE}/synthesis?speaker=${speaker}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(query),
  });
  if (!sres.ok) die(`synthesis failed for Line ${turn.line}: HTTP ${sres.status}`);
  const file = join(outdir, `${String(idx + 1).padStart(2, "0")}-line.wav`);
  writeFileSync(file, Buffer.from(await sres.arrayBuffer()));

  // Accent-phrase timings (turn-relative seconds), scaled by speedScale like the
  // engine does. Good enough granularity for staged reveals and band swaps.
  const words = [];
  let t = (query.prePhonemeLength ?? 0) / speed;
  for (const phrase of query.accent_phrases ?? []) {
    const start = t;
    let text = "";
    for (const mora of phrase.moras ?? []) {
      text += mora.text;
      t += ((mora.consonant_length ?? 0) + (mora.vowel_length ?? 0)) / speed;
    }
    if (phrase.pause_mora) t += (phrase.pause_mora.vowel_length ?? 0) / speed;
    words.push({ id: `w${words.length}`, text, start: +start.toFixed(3), end: +t.toFixed(3) });
  }
  const duration = t + (query.postPhonemeLength ?? 0) / speed;
  return { file, duration: +duration.toFixed(3), words };
}

try {
  await engineVersion();
} catch {
  die(`voicevox engine unreachable at ${BASE} — run \`voicevox-tts.mjs check\` for setup hints`);
}

const turns = parseDialogueScript(readFileSync(scriptPath, "utf8"));
if (!turns.length) die(`no "## Line N — … (Frame M)" sections with spoken text found in ${scriptPath}`);
mkdirSync(outdir, { recursive: true });

const meta = { engine: "voicevox", base: BASE, speed, gap, lines: [] };
let clock = 0;
for (let i = 0; i < turns.length; i++) {
  const turn = turns[i];
  const { file, duration, words } = await synthesizeTurn(turn, i);
  meta.lines.push({
    line: turn.line,
    frame: turn.frame,
    speaker: turn.speaker ?? "host-a",
    text: turn.text,
    file,
    start: +clock.toFixed(3),
    duration,
    words,
  });
  clock += duration + gap;
  console.log(`line ${turn.line} (frame ${turn.frame}, ${turn.speaker}): ${duration.toFixed(2)}s`);
}
meta.total = +(clock - gap).toFixed(3);

// Single narration track with the same gaps, for players that want one file.
const listFile = join(outdir, "concat.txt");
const silence = join(outdir, "silence.wav");
execFileSync("ffmpeg", ["-y", "-v", "quiet", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", String(gap), silence]);
writeFileSync(
  listFile,
  meta.lines.map((l) => `file '${l.file}'`).join(`\nfile '${silence}'\n`) + "\n",
);
execFileSync("ffmpeg", ["-y", "-v", "quiet", "-f", "concat", "-safe", "0", "-i", listFile, join(outdir, "narration.wav")]);

writeFileSync(outMeta, JSON.stringify(meta, null, 2));
console.log(`wrote ${outMeta} (${meta.lines.length} turns, ${meta.total.toFixed(1)}s) and ${join(outdir, "narration.wav")}`);
