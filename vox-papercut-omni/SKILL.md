---
name: vox-papercut-omni
description: "House-style template for Vox-style paper-cutout collage explainers generated on Google Flow with the Omni model: each beat becomes a hand-cut paper-collage poster (torn edges, tape, halftone dots, headline baked in) generated as a still, then brought alive as a 'living poster' by Omni image-to-video — through the pinned gflow-cli bridge when installed, else via a paste-ready manual Flow prompt pack; VO-measured timing, plain ffmpeg assembly, no Remotion. Use when the user asks for a Vox / paper-cutout / collage explainer AND names Google Flow, Omni, Flow credits, or gflow-cli — e.g. 'make a Vox papercut video on Google Flow', 'use my Flow subscription for this explainer' — or when no ATLASCLOUD_API_KEY is available for vox-director. With an Atlas key present and no engine named, defer to vox-director. On activation, always interview for the brief first. Not for the Atlas Cloud collage pipeline (vox-director), Remotion layer-parallax paper dioramas (paper-cutout-video), torn-paper collage ads (paper-collage-ad), archival poem scrapbooks (poem-explainer-video), or product promos (product-launch-video / product-demo-video)."
---

# Vox Papercut on Flow Omni — House-Style Template

> Creative direction for reproducibly producing Vox-style paper-cutout collage explainers with **Google Flow (Omni)** as the motion engine. The doctrine is the living poster: **the look is born in the image step** — each beat is a finished collage poster with the headline baked in — and Omni only *animates* that poster. If the poster isn't a rich layered collage, nothing downstream will save it.
> **The technique (craft) is universal; the topic is swappable.** Fill in the brief in #1, map beats in §4, and the same structure, prompt grammar, and cadence reproduce for any subject. The Bạch Đằng 1288 beat in `references/poster-and-motion-prompts.md` is the worked example.
> **This file is self-contained** for creative direction. It uses **one runtime sibling skill** — `../media-use/` — for poster generation, TTS, and BGM (gate in §6), and reaches Google Flow per §7: the **manual flow pack is the baseline contract**; the pinned `gflow-cli` bridge is the accelerator when installed. Prompt grammar lives in `references/poster-and-motion-prompts.md`; Flow operations in `references/flow-omni-ops.md`.

> ⚙️ **First behavior at runtime (important)**: when this skill activates, do not start building immediately. **First interview the user for the items in "#1 Brief"**. Skip items already known from the conversation context, and do not proceed to the beat map until the ★ items are filled. Bundle the questions into one concise message.

---

## 1. Brief (interview the user and fill this in first)

`★` = the minimum set that must always be asked first. Fill the rest from drafts, confirming only key points.

```
★ Topic / thesis (one line — what the video argues or explains):
★ Target duration / aspect (default ~45–60 s / 9:16 vertical; 16:9 for YouTube-type targets):
★ Distribution target (Shorts / TikTok / Reels / X / YouTube — affects aspect, duration, compression):
★ Narration language + voice character (default: energetic documentary narrator):
★ Flow access: gflow-cli installed, or manual Flow UI? Credit budget / appetite (see §7.4):

  Theme flavor (default: editorial Vox zine; era/palette override per topic — see references):
  Real people or brand logos on screen? (Omni refuses them — §7.5 decides the route early):
  Spoken captions (default: on for 9:16 social, off for 16:9):
  BGM mood (default: driving editorial percussion + bass, instrumental):
  Output path / project directory:
```

---

## 2. How to Use

1. **Interview for #1** (★ items first).
2. **§4**: map the story into beats and shots — the storyboard SSOT — and get the **user's approval** (the one mandatory gate).
3. **§5** style lock and **§3 philosophy** are the immutable constitution.
4. **§6**: generate the poster set (style-locked prompts, aspect bridge, frozen in the media ledger).
5. **§7**: pass the **style-proof gate**, then previz on Omni Flash, then finals on Omni — bridge or manual pack.
6. **§8**: narration + BGM; derive every beat duration from the measured audio.
7. Assemble with **§9**, pass the **§11 gates**, deliver.

---

## 3. Production Philosophy (immutable principles)

**Target texture**: "a zine page that came alive" — every beat a hand-assembled paper collage poster: torn and scissor-cut edges, tape corners, halftone dots, newspaper strips, one bold flat background color per beat, a big baked-in headline. Motion is *breathing collage*: layered cutouts drifting with drop-shadow parallax, one smooth continuous camera move per shot, cuts every 4–6 s carrying the energy. Punchy and editorial, never frantic inside a shot — the *edit* is fast, the *shots* are calm.

**Never do (anti-patterns)**:
- A blended painting instead of a collage — every poster must read as **separate cut-out pieces** with visible edges and their own drop shadows (a flat blend can only pan as one plane; §6.3)
- Asking Omni to render, redraw, or move headline text — text is baked into the poster; the motion prompt anchors it stable (§7.3)
- "snap / punch-in / slam / whip / quick zoom" vocabulary in motion prompts — Omni over-reacts and jump-cuts *inside* the shot; ask for ONE smooth continuous move
- Negative phrasing ("no X", "don't") in Omni motion prompts — it backfires; state the positive target (the style lock's NOT-3D wording is the image prompt's job, not the motion prompt's)
- More than one camera move per shot — richer editing comes from cutting between short shots, not choreographing one long one
- A single ≥8 s static shot per beat — dead air; every beat is a wide + a detail cut
- Hand-tuned beat durations — every duration derives from the measured VO (§8)
- Busy or gradient backgrounds behind the cutouts — one bold flat paper color per beat
- Emoji, hype copy, or invented facts in narration or headlines (§10)

---

## 4. Beat Map [do first — the one approval gate]

1. **Arc.** Pick a narrative arc that fits the topic: `timeline` for history, `how_it_works` for explainers, `problem→agitate→solve` for ads/persuasion, `man_in_hole` for transformations.
2. **Beats.** Beat 1 is a **≤3 s hook** (one shot, the sharpest image + headline). Every other beat carries ~8–10 s of narration and **2 shots**: a **wide** (headline visible) and a **detail** cut-in (no headline, free to go bolder). Budget (hook + content beats; content beat ≈ 8–10 s): ~30 s → 4 beats (7 shots), ~45 s → 5–6 beats (9–11 shots), ~60 s → 7 beats (13 shots).
3. **Cadence.** Cut every **4–6 s**; no shot exceeds 7 s. Narration runs continuously across a beat's two shots — the visual cuts mid-sentence. Shot durations are provisional until §8 measures the VO.
4. **Palette travel.** Assign each beat one bold flat background color; let the palette move with the story (e.g. aged sepia → bold pop → champion gold).
5. **Storyboard SSOT** (`STORYBOARD.md` in the project dir): brief echo + beat table — beat id, narration line, headline (2–3 words, verbatim), bg color, feel, per-shot rows (`s1a`, `s1b`, …) with scene description, camera move, element motion. Every later artifact (prompts, take ids, measured durations, trims) is written back here.
6. **Show the user the beat map and get approval before generating anything.** This is the only mandatory approval gate; everything after runs autonomously through the §7 style-proof checkpoint.

---

## 5. Style Lock & Design Tokens

**Style lock** — reuse this block **verbatim as part 1 of every poster prompt**; only scene, background color, and headline change per shot (full 5-part grammar in `references/poster-and-motion-prompts.md`):

```
Mixed-media hand-cut PAPER COLLAGE, editorial Vox-explainer zine style. Torn and
scissor-cut paper edges, tape corners, halftone print dots, newspaper clippings,
paper-stencil shapes, real paper drop shadows. Figures are PRINTED-texture
cut-outs of real imagery (photo / woodblock / engraving), NOT CGI, NOT a 3D
render — keep print grain and paper imperfections. High-contrast, flat even
scanned-document light.
```

| Token | Purpose | Rule |
|---|---|---|
| `{{BG}}` | per-beat flat paper background | one bold flat color per beat; palette travels per §4.4 |
| `{{HEADLINE}}` | baked poster text | 2–3 bold words, **in "quotes" in the prompt**, named real type style (bold condensed grotesque by default) |
| `{{ACCENT}}` | the one recurring mark | a red seal / red underline strip appearing on every wide shot — the film's signature |
| texture language | consistency | edge roughness and halftone density identical across beats; **color travels, texture doesn't** |

**Theme flavor**: the default is editorial Vox zine. For era- or culture-specific topics, swap the era/palette/type axes per the compact banks in the references file — the style lock's paper DNA stays.

---

## 6. Posters (media-use → gpt-image-1)

**Sibling-skill dependency gate.** This skill uses one sibling skill at runtime: `../media-use/`. It is not bundled here — `npx hyperframes init` (or `npx hyperframes skills update media-use`) installs and updates it next to this skill. The wrapper scripts under `scripts/` locate it automatically (first beside this skill, then in `~/.agents/skills/`) and exit with that install hint when it is absent; on that failure, run the install command, and if it still fails, stop and report it instead of improvising.

### 6.1 Generate

One poster per shot, prompt = style lock + scene-as-cutouts + flat bg + headline + tech (grammar and worked example in the references file):

```
node <SKILL_DIR>/scripts/resolve.mjs --type image --intent "<5-part poster prompt>" --project .
```

Style-locked art requires a **generation** provider; on this machine that is OpenAI `gpt-image-1` (direct REST via media-use — the only verified working generator). Rate limit ~5 img/min: batch with concurrency ≤3 and retry on 429. Record every final prompt in the SSOT; the ledger freezes files under `.media/images/` so a re-render reproduces the same set.

### 6.2 Aspect bridge (gpt-image-1 has no 9:16 output)

gpt-image-1 outputs only 1024×1024 / 1536×1024 / 1024×1536. Compose for a **center-crop**:

| Target | Generate at | Center-crop to | Safe zone |
|---|---|---|---|
| 9:16 | 1024×1536 | 864×1536 | keep all pieces + headline inside the center 864 px width |
| 16:9 | 1536×1024 | 1536×864 | keep everything inside the center 864 px height |
| 1:1 | 1024×1024 | — | native |

State the safe zone in the prompt ("all elements and the headline composed well inside the central area; outer margins are plain background"). Crop with `ffmpeg -i posters/s1a.png -vf "crop=864:1536" posters/s1a-crop.png` (crop centers by default); the `-crop.png` is what goes to Flow. Upscaling to 1080×1920 happens once at assembly (§9).

### 6.3 Poster QA (before any motion spend)

- Reads as **assembled pieces**: distinct cutouts, visible edges, per-piece drop shadows — a blended scene is a re-roll (it can never parallax)
- Headline crisp, verbatim from the SSOT, inside the safe zone; `{{ACCENT}}` present on wides
- Flat bold background; print grain kept; nothing glossy/3D
- All posters sit together as **one editor's zine** — reject any piece that reads as a different hand, re-roll with the same style lock

---

## 7. Motion (Google Flow, Omni)

### 7.1 The bridge — baseline and accelerator

**Baseline (always works): the manual flow pack.** Emit `flow-pack.md` — per shot: the cropped poster path, the motion prompt, model tier, and the take-naming contract — and the user drives the Flow UI, dropping downloads into `takes/`. Format in `references/flow-omni-ops.md`. Assembly is identical either way.

**Accelerator: gflow-cli**, pinned at `ffroliva/gflow-cli/skills/gflow-cli#v0.42.0` per the skill-finder decision (install is gated by its waxa eval — do not install ad hoc; if absent, use the baseline and tell the user the pin). When present, **discover the command surface at runtime** (its SKILL.md / `--help`) and map the §7.2 contract onto it — never guess flags.

### 7.2 The generation contract

Per shot, regardless of path: **in** = cropped poster (start frame) + motion prompt + model tier (`omni` finals / `omni-flash` previz) + aspect + shortest available clip length ≥ shot duration; **out** = one mp4 saved as `takes/s{beat}{shot}-t{n}.mp4` (e.g. `takes/s3a-t2.mp4`). Accepted take id recorded in the SSOT.

### 7.3 Motion prompts

Five axes — GOAL (flat 2D collage motion graphic) · CAMERA (one smooth continuous move) · MOVEMENT (layered cutouts drift with drop-shadow parallax — the lever that makes Omni move *layers*) · AESTHETIC/FEEL/COLOR (this beat's mood and palette) · CONSTRAINTS (headline and layout perfectly stable; single continuous shot). Positive phrasing only; amplitude small near text. Full grammar, worked example, and the symptom→fix table: `references/poster-and-motion-prompts.md`. Trim-awareness: motion must be continuous so any out-point cuts clean; reserve "…then settles into place" endpoints for payoff/finale shots that play to their natural end.

### 7.4 Spend discipline (three checkpoints)

1. **Style-proof gate**: generate the hook beat only — 1 poster + 1 **Omni Flash** previz — and show the user before any batch spend. This validates papercut fidelity *and* motion in one cheap clip.
2. **Previz batch**: all shots on Omni Flash; QC each take (§7.6); fix prompts via the symptom table. A shot passes previz or its prompt/poster is revised — nothing goes to finals unproven.
3. **Finals batch**: proven prompts on **Omni**. Estimate first: `shots × (1 + 0.3 re-roll) × credits/clip` against the brief's budget; on overrun, ask before proceeding.

### 7.5 Content constraints

Omni refuses recognizable **real people and brand logos**. Decide at brief time: redesign those beats around period-style generated imagery (an "engraving of a general", not the named face), or route the whole project to `vox-director` (its Kling path allows real people).

### 7.6 Take QC (per take, previz and finals)

Extract 2–3 frames (`ffmpeg -ss <t> -i take.mp4 -frames:v 1 f.jpg`) and check: headline legible and unmoved · motion stays flat 2D (no perspective bend, no morph) · visible parallax between pieces (not a whole-frame pan) · no internal jump-cut · style intact (grain, edges, flat bg). Re-roll ≤2 with a targeted axis fix from the symptom table; a third failure means redesign the shot (usually: the poster isn't layered enough — fix the image, not the prompt).

**Pure T2V (exception path).** If posters are impossible (image provider down) Omni can generate from text alone: put the full 5-part poster description *and* the motion axes in one prompt, and plan to overlay headlines in post — expect weaker text and style stability. This is a degraded mode, not a default.

---

## 8. Narration, Timing, BGM (media-use audio engine)

**Script.** Punchy documentary register: short declaratives, concrete nouns, a question or reversal at the hook. One `lines[]` entry per beat, `id` matching the SSOT:

```json
{
  "lang": "vi",
  "lines": [
    { "id": "s1", "text": "Một dòng sông đánh chìm cả một hạm đội." },
    { "id": "s2", "text": "Năm 1288, quân Nguyên Mông tiến vào Bạch Đằng..." }
  ],
  "bgm": { "mode": "retrieve", "query": "driving editorial percussion, cinematic documentary, instrumental" }
}
```

```
node <SKILL_DIR>/scripts/audio.mjs --request ./audio_request.json --out ./audio_meta.json
```

The engine owns provider selection and auth (HeyGen TTS verified working, Vietnamese included; word timestamps required if captions are on).

**Timing model (load-bearing).** Each beat's duration = its line's measured `duration_s` (+ ~1.5 s hold on the finale only). Split each beat's span across its two shots at a mid-sentence point, each shot 3–6 s (rebalance the split, never the total). Write measured durations and per-shot trims back into the SSOT — the SSOT owns the timeline; takes are raw footage trimmed to it.

**Captions** (default on for 9:16): adopt the karaoke caption spec from the sibling `poem-explainer-video` (word-timestamp gate included) rather than inventing one here; burn at assembly. **BGM**: one instrumental bed, 16–20 dB under the voice, 1 s fade-in, fade out over the finale hold.

---

## 9. Assembly (ffmpeg only — no Remotion)

1. **Trim** each accepted take to its SSOT shot duration (in-point 0): `ffmpeg -i takes/s1a-t1.mp4 -t 4.2 -an ...` — takes carry no useful audio.
2. **Concat** all trimmed shots in SSOT order (concat demuxer; normalize to one fps/size first — scale crops to 1080×1920 here).
3. **Mix**: narration on top, BGM ducked per §8; burn captions if on.
4. **Verify**: you can't read an mp4 directly — contact sheet `ffmpeg -i final.mp4 -vf "fps=1,scale=480:-1,tile=4x4" sheet%02d.jpg`, then check cut rhythm against the SSOT and spot-check narration/visual sync at 2 beat boundaries.
5. **Ground truth & delivery**: duration via `ffprobe -select_streams v:0 -count_frames -show_entries stream=nb_read_frames`; deliver with `ffmpeg -i in.mp4 -c:v libx264 -crf 21 -movflags +faststart -pix_fmt yuv420p -c:a aac -b:a 128k out.mp4` (**keep the audio track**).

Project layout: `STORYBOARD.md` · `posters/` (`s1a.png` + `s1a-crop.png`) · `takes/` · `flow-pack.md` (manual mode) · `audio_request.json` / `audio_meta.json` · `.media/` (ledger) · `final.mp4`.

---

## 10. Copy Norms

- Headlines: 2–3 bold words, verbatim between SSOT and poster prompt; sentence-case subtitles only where the wide shot needs one.
- Vox style reads as journalism — **every on-screen claim and narration fact verified before generating**; don't invent statistics or history for punch.
- Generated "newspaper clippings" must not fabricate real mastheads or attribute invented quotes to real outlets/people — keep clippings generic or clearly stylized.
- Narration: punchy, concrete, zero hype-slop, no emoji; culture-matched language per the brief.

---

## 11. Quality Gates (all must pass before shipping)

- [ ] Beat map SSOT approved by the user before any generation (arc, beats, headlines, palette travel, per-shot scene+motion)
- [ ] Style-proof gate passed: hook poster + Omni Flash previz shown and approved before batch spend
- [ ] Style lock byte-identical across every poster prompt; poster set reads as one editor's zine
- [ ] Every poster passed §6.3 QA: distinct pieces with edges/shadows, headline verbatim + in safe zone, `{{ACCENT}}` on wides
- [ ] Aspect bridge exact: correct base size, centered crop, no content lost; Flow received `-crop.png` files
- [ ] Every shot has an accepted take at `takes/s{beat}{shot}-t{n}.mp4` logged in the SSOT with its final motion prompt; re-rolls ≤2 or the shot was redesigned
- [ ] Motion prompts: positive phrasing, one smooth continuous move, stability anchors present; zero snap/whip vocabulary
- [ ] Take QC done per §7.6 on finals: text stable, flat 2D, real parallax, no internal cuts
- [ ] Real-people/logo beats resolved per §7.5 before generation, not after a refusal
- [ ] All poster/take prompts + assets frozen (media ledger for images; takes/ committed to the project dir)
- [ ] Beat durations = measured VO (+finale hold only); shots 3–6 s (hook ≤3 s); cuts every 4–6 s; no hand-tuned totals
- [ ] Credits: previz ran on Omni Flash, finals on Omni, spend within the brief's budget (asked on overrun)
- [ ] BGM 16–20 dB under voice with fades; captions (if on) pass the sibling spec's word-timestamp gate
- [ ] Facts and clippings pass §10; delivery keeps the audio track; `ffprobe` frame count matches the SSOT total
