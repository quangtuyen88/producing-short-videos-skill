---
name: poem-explainer-video
description: "House-style template for producing cinematic poem/verse explainer videos in a vintage archival-scrapbook style: aged-parchment canvas, AI-generated period artwork pinned like physical artifacts, one scene per couplet with original-text + translation cards, line-by-line narration (ElevenLabs-class TTS), and word-by-word karaoke captions. Use when asked to turn a poem, haiku, verse, proverb, or short classical text into a video — e.g. 'make a poem video', 'turn 山居秋暝 into a cinematic explainer'. Generic across source languages (Chinese, Japanese, Vietnamese, English). On activation, always start by interviewing the user for the minimum brief. Not for product promos (product-demo-video / product-launch-video), topic explainers without the archival-artifact look (faceless-explainer), or converting slide decks (remotion-slide-video)."
---

# Poem Explainer Video — House-Style Template

> Creative direction for reproducibly producing "archival cinema" poem explainers: a classical poem presented as a living museum artifact — parchment, ink-wash paintings, seal-red accents, a narrator reading the translation line by line, and karaoke captions tracking every spoken word.
> **The technique (craft) is universal; the poem is swappable.** Fill in the brief in #1, run the source-text audit in §4, and the same quality, structure, and motion language reproduce for any poem or short classical text.
> **This file is self-contained** for creative direction and implementation. It uses **one runtime sibling skill** — `../media-use/` — for TTS with word timestamps, BGM, and artwork generation (gate in §6).

> ⚙️ **First behavior at runtime (important)**: when this skill activates, do not start building immediately. **First interview the user for the items in "#1 Brief"**. Skip items already known from the conversation context, and do not proceed to the storyboard until the ★ items are filled. Bundle the questions into one concise message.

---

## 1. Brief (interview the user and fill this in first)

`★` = the minimum set that must always be asked first. Fill the rest from the §4 audit plus drafts, confirming only key points.

```
★ Poem / text (pasted verbatim, or title + poet to verify in §4):
★ Source language and narration language (default: narrate in English):
★ Target duration / aspect (default ~35–50 s / 16:9; 9:16 for Shorts-type targets):
★ Distribution target (X / YouTube / Shorts — affects aspect, duration, compression):

  Translation to use (user-supplied / published-with-rights / drafted here — see §4.3):
  Art tradition override (default matches the poem's culture — see §6):
  BGM mood (default: sparse solo instrument matched to the culture):
  Output path / project directory:
```

---

## 2. How to Use

1. **Interview for #1** (★ items first).
2. **§4**: audit the source text — verify the canonical original, segment it into scenes, settle the translation, extract the imagery.
3. **§5 design tokens** and **§3 production philosophy** are the immutable constitution; **§10 motion numbers** are used as-is.
4. **§6**: generate the artwork set (style-locked prompts, frozen in the media ledger).
5. **§7**: generate narration + word timestamps + BGM; derive every scene duration from the measured audio.
6. Assign the beat skeleton in **§9**, implement with **§11**, pass the **§13 gates**, deliver.

---

## 3. Production Philosophy (immutable principles)

**Target texture**: "a museum artifact come alive" — an aged-parchment ground; paintings staged as physical objects (white plate borders, pins, soft shadows, slight rotations); slow Ken Burns drift; one couplet per scene; a breathing pace (each narrated line followed by ~2 s of rest); the karaoke caption chip as the only kinetic text on screen. This genre is **slow**: dissolves and match cuts, never whips or hard-cut montage.

**Never do (anti-patterns)**:
- Full-screen text walls or paragraph subtitles (the cards carry the text; captions carry only the spoken words)
- Modern UI chrome, synthetic CSS gradients, or flat-color grounds (texture comes from generated imagery)
- Fast cuts, whip pans, or kinetic-typography slams (that is the product-demo language, not this one)
- Photorealistic or stock-photo imagery (artwork must read as period art)
- Emoji, hype copy, or modern slang in narration or on-screen text
- Presenting a drafted translation as a canonical/published one (label it — §12)
- Music louder than the voice, or captions that split mid-word

---

## 4. Source-Text Audit [do first]

1. **Canonical text.** Verify the original character-for-character against an authoritative source: user-supplied text wins; otherwise an established anthology or reference edition found via search. Never reconstruct a poem from memory. For Chinese classics, confirm simplified vs traditional with the user (or match the audience).
2. **Segmentation.** Split into scene units: one couplet (2 lines) per scene for regulated verse (律詩, lục bát pairs, haiku as a single unit); 1–2 lines per scene otherwise. **3–6 scene units** is the sweet spot; longer poems get an excerpt pass confirmed with the user.
3. **Translation precedence.** (a) user-supplied → use verbatim; (b) published translation with confirmed rights → use with attribution; (c) draft a faithful literal translation here → label it as this production's own (§12). For modern, in-copyright poems or song lyrics, **stop and get the user's rights confirmation before proceeding**.
4. **Imagery extraction.** Per scene unit, list the concrete images in the lines (e.g. empty mountain · new rain · autumn dusk / bright moon · pines · spring over stones / bamboo · washerwomen · lotus · boat). These drive the §6 art prompts and the §5 label chips.
5. **Metadata.** Title in source language + narration language, poet, era — used on the title card and the finale seals.

The audit output goes into the **storyboard SSOT** (§11.1) before any asset is generated.

---

## 5. Design System (tokens)

| Variable | Purpose | Format hint |
|---|---|---|
| `{{PARCHMENT}}` | Full-bleed ground | Generated aged-paper image: warm cream, visible fiber, darkened/burnt edges, faint ruled manuscript ghosting. Never a CSS gradient. |
| `{{INK}}` | Text, borders | Warm near-black (aged ink), plus a mid sepia-gray for secondary text |
| `{{SEAL}}` | The one accent | Vermilion / cinnabar red — label chips, karaoke highlight box, seal stamps |
| `{{NIGHT}}` | Night-scene support | Deep indigo-navy — night paintings' band overlays and dark cards |
| `{{SCRIPT_FONT}}` | Source-language type | A serif with full glyph coverage for the poem (e.g. a Noto Serif variant for CJK; a diacritic-complete serif for Vietnamese). Must be bundled — §11.3 |
| `{{LATIN_FONT}}` | Narration-language type + captions | Old-style serif; labels set as letterspaced small caps |

**Components** (all cast shadows on the parchment; rotations within ±2°):
- **Hero plate** — the scene's main painting on a white 8–12 px plate border, soft drop shadow, slight rotation
- **Companion polaroid** — a smaller secondary artwork with a pin dot or tape corner
- **Label chip** — `{{SEAL}}` chip, white letterspaced small caps, pinned top-left of the scene (e.g. "OPENING COUPLET", "LIFE IN THE SCENE")
- **Couplet card** — cream card: small `{{SEAL}}` small-caps imagery header, source-language lines large in `{{SCRIPT_FONT}}`, translation in italic `{{LATIN_FONT}}` beneath; night scenes swap to a `{{NIGHT}}` band overlaid on the painting's lower edge
- **Seal chips** — one title character per red square chip, used in the finale
- **Caption chip** — §8

**Immutable rules**: artwork visible from the first frame of its scene; palette limited to parchment + ink + seal + night; texture from generated images, not CSS noise filters.

---

## 6. Artwork Generation (media-use)

**Sibling-skill dependency gate.** This skill uses one sibling skill at runtime: `../media-use/`. It is not bundled here — `npx hyperframes init` (or `npx hyperframes skills update media-use`) installs and updates it next to this skill. The wrapper scripts this skill ships under `scripts/` locate it automatically (first beside this skill, then in the global skills directory) and exit with that install hint when it is absent; on that failure, run the install command, and if it still fails, stop and report it instead of improvising.

**Style lock.** Write one style descriptor string and reuse it verbatim in **every** prompt, varying only the scene imagery. Template for a Chinese classic:

```
Traditional Chinese ink-wash painting (shui-mo), muted gray and sepia washes with
vermilion accents, [SCENE IMAGERY], misty atmosphere, classical shan-shui
composition, aged paper texture, no text, no watermark, no signature
```

Match the tradition to the poem's culture (ukiyo-e / sumi-e for Japanese, Đông Hồ folk woodcut for Vietnamese ca dao, illuminated-manuscript or Romantic watercolor for European verse) unless the brief overrides it. Follow the poem's own time-of-day arc (the sample poem moves day → night → day; the palette moves with it, night scenes leaning `{{NIGHT}}`).

**Set per scene**: 1 hero painting (landscape orientation for 16:9) + 0–2 companions (a single tight subject: one pine, a moon disc, a boat). Plus one `{{PARCHMENT}}` ground image for the whole video, and optional micro-assets (seal stamp, tape).

**Resolve and freeze**: generate through media-use so every asset lands in the project ledger. This skill ships a wrapper that forwards to the sibling's resolver:

```
node <SKILL_DIR>/scripts/resolve.mjs --type image --intent "<style-locked prompt>" --project .
```

User-supplied artwork is ingested with `--from <file>`. Record every final prompt in the storyboard SSOT; the ledger freezes files under `.media/images/`, so a re-render reproduces the same set.

**Artwork QA**: reject any piece with embedded text, watermarks, photorealism, or a palette outside the lock; re-roll with the same style string. All pieces must sit together as one artist's portfolio.

---

## 7. Narration & Audio (media-use audio engine)

**Script norms.** The voiceover is: an optional one-line hook ("A poem that …"), then **the translation, line by line**, then an optional one-line close. No commentary padding unless the user asked for interpretation beats. Keep each line short enough to breathe.

**One scene unit = one `lines[]` entry.** Build `audio_request.json` with one entry per hook/couplet/close, `id` matching the storyboard scene id, and a culture-matched sparse BGM query:

```json
{
  "lang": "en",
  "lines": [
    { "id": "s0-hook", "text": "A poem that empties the mind the way rain empties a mountain." },
    { "id": "s2-couplet1", "text": "Empty mountains after new rain. Evening brings true autumn air." }
  ],
  "bgm": { "mode": "retrieve", "query": "sparse solo guqin, meditative, ancient" }
}
```

Run the shared engine through this skill's wrapper (it forwards to the audio engine in `../media-use/`):

```
node <SKILL_DIR>/scripts/audio.mjs --request ./audio_request.json --out ./audio_meta.json
```

The engine owns provider selection and auth, auto-degrading HeyGen → ElevenLabs / Kokoro; provider and voice details are in `tts.md` in `../media-use/` (its audio reference docs). Pick a calm, low-tempo narrator voice.

**Timing model (load-bearing).** Pauses are **composed on the timeline, never baked into the audio**: each scene's duration = its line's measured `duration_s` from `audio_meta.json` + a rest `GAP` (default 2.0 s; finale 2.5 s). Total duration = the sum; tune `GAP` ±0.5 s to hit the target length. Compute all scene start frames in one timing module that both the scenes and the captions consume — never hand-tune a scene length.

**Gate before captions**: every `voices[]` entry has a non-empty `words[]` array (word timestamps). If a provider returned none, re-run TTS on a timestamp-capable provider — karaoke captions are this genre's signature and cannot be skipped.

**BGM**: one bed under everything at low level (voice always clearly on top; duck or set the bed 16–20 dB under the voice), 1 s fade-in, fading out over the finale hold.

---

## 8. Karaoke Caption Spec (the signature)

- **Grouping**: split each line's `words[]` into caption groups of **2–4 words** at phrase boundaries (punctuation, or an inter-word gap > 0.6 s starts a new group). Only one group is visible at a time.
- **Chip**: bottom-center; `{{LATIN_FONT}}` serif at ~48–56 px on a 1080p frame; `{{INK}}` text on a white chip with padding and a subtle shadow; ≥ 40 px clear of the bottom edge; nothing else enters the caption band.
- **Highlight**: the current word renders white on a `{{SEAL}}` rounded box — the only red text treatment on screen. The highlight advances word by word.
- **Verbatim rule**: render `words[].text` exactly as the engine returned it — never re-split or re-punctuate the script string, or highlight indexes desync on tokenization.
- **Offset arithmetic**: word timestamps are relative to **each line's own voice file**. A word is highlighted while `voiceStartFrame + word.start × fps ≤ frame < voiceStartFrame + word.end × fps`; **hold the previous word's highlight through inter-word gaps**; hide the chip entirely during scene rest gaps.
- Captions are narration-language only — the source text lives on the couplet cards, never in the caption chip.

---

## 9. Video Structure (beat skeleton)

**Rhythm**: 1 scene = 1 couplet = measured voice + ~2 s rest ≈ 6–8 s. 30–60 s total, 30 fps. Transitions: 12–18-frame crossfades, or a match cut that scales a companion painting up into the next scene's hero. Never whip.

| # | Role | Content |
|---|---|---|
| S0 | hook (optional, 3–5 s) | Parchment ground; artifacts drift/settle into a collage; VO hook line; caption chip active from the first spoken word |
| S1 | title (4–5 s) | Hero painting + title card (source-language title large in `{{SCRIPT_FONT}}`, narration-language subtitle + poet · era in small caps); companion piece opposite |
| S2…S(n) | couplet scenes | Label chip top-left; hero painting under Ken Burns; couplet card revealing progressively (header → source lines as the VO starts → italic translation as its words are spoken); companion polaroid drops in mid-scene. Alternate hero left/right per scene; palette follows the poem's time-of-day |
| S(last) | finale (6–8 s) | Full-bleed painting (no plate border); centered column: final couplet large, all-lines recap in small type, the title as `{{SEAL}}` seal chips, one italic closing line; caption ends on the last word; hold ~1.5 s after the VO while the BGM fades |

**Progressive reveal rule**: every element appears when its content is spoken — no front-loading a complete layout and freezing, and no element that is never referenced.

---

## 10. Motion Design (universal numbers — use as-is)

- **Ken Burns (hero)**: scale 1.04 → 1.12 across the scene, or a pan of 4–6 % of frame width; direction alternates each scene; companions stay static after entry
- **Polaroid drop-in**: translateY(−24 → 0 px) + rotate(−4° → resting ±1.5°) + opacity, spring `{ damping: 18, stiffness: 140 }`, ~18 frames
- **Card block reveal**: fade + 8 px rise per block, 12 frames, staggered to the VO per §9
- **Crossfade**: 12–18 frames; finale match cut = companion scales from polaroid size to full-bleed across ~20 frames
- **Ambient depth**: at most 1–2 slow drift layers (mist, distant birds, dust) at opacity ≤ 0.25
- **Determinism (mandatory)**: `Math.random` / `Date.now` / argument-less `new Date` are forbidden; fake jitter by index

---

## 11. Implementation, QA, Finishing (Remotion reference stack)

The reference implementation is Remotion (React/TS); the principles port to other tools. For a fully pipeline-automated build instead, `/faceless-explainer` (a runtime-installed HyperFrames workflow) can produce a narrated explainer — but it has no parchment/archival frame preset and invents visuals downstream rather than staging pre-generated artwork, so expect to carry §5–§10 of this file as the creative spec and hand-adjust its design step. The default is the Remotion route below.

1. **Audit → storyboard SSOT** (§4): one sheet holding the scene table (id, couplet, imagery, label, art prompts, transition) + the copy SSOT (all card text, labels, VO lines). Every later number (durations, start frames) is written back here.
2. **Artwork** (§6): generate + freeze the full set; copy the frozen files into the project's `public/` for `staticFile()` use, keeping ledger ids noted in the SSOT.
3. **Fonts**: bundle `{{SCRIPT_FONT}}` and `{{LATIN_FONT}}` files and load them via Remotion's font-loading API from `staticFile()` — system-font fallback is forbidden. **Tofu gate**: render one title-card still and inspect it before building any scene; every glyph of the poem must render.
4. **Audio** (§7): produce `audio_meta.json`; derive `sceneStart[]`/`sceneDuration[]` in one timing module consumed by both the `<Sequence>` layout and the caption layer.
5. **Build**: one `<Sequence>` per scene; a video-wide caption component implementing §8 from `audio_meta.json`; the BGM track with §7 fades; `{{PARCHMENT}}` as the root ground layer.
6. **Still QA**: for each scene render start/mid/end stills (`npx remotion still --frame=N`), **downscale before viewing** (`sips -Z 800`); check tofu, overlaps, caption clearance, palette lock, plate shadows.
7. **Full render → director review**: contact sheet via `ffmpeg -i out.mp4 -vf "fps=1,scale=480:-1,tile=4x4" sheet%02d.jpg`; then verify caption sync by extracting 2–3 one-second clips at word boundaries and confirming the highlighted word matches the audible word.
8. **Ground truth & delivery**: duration via `ffprobe -select_streams v:0 -count_frames -show_entries stream=nb_read_frames`; deliver with `ffmpeg -i in.mp4 -c:v libx264 -crf 21 -movflags +faststart -pix_fmt yuv420p -c:a aac -b:a 128k out.mp4` (**keep the audio track**).

---

## 12. Copy Norms

- Poem text **character-for-character** from the §4-verified source; never "improve" the original.
- Attribution on screen: poet + era on the title card. Translation attribution in the delivery notes (translator name, or "translation drafted for this production").
- Label chips: 2–4 word letterspaced small-caps English describing the couplet's role or imagery ("OPENING COUPLET", "THE QUIET COUPLET"), not bare numbers.
- Narration reads the translation lines; no hype, no emoji, no modern slang.
- **Rights**: classical / public-domain texts proceed freely; modern poems or song lyrics require the user's explicit rights confirmation (§4.3) before any asset is generated.

---

## 13. Quality Gates (all must pass before shipping)

- [ ] Source text verified against a canonical source; zero character diffs
- [ ] No tofu: title-card still inspected; every poem glyph renders from the bundled fonts
- [ ] Every `voices[]` line has non-empty `words[]` before caption build
- [ ] Captions render `words[].text` verbatim; highlight advances monotonically; sync spot-checked at 2–3 word boundaries against the audio
- [ ] Caption groups ≤ 4 words; chip ≥ 40 px from the bottom edge; nothing else in the caption band
- [ ] One couplet per scene; every scene duration = measured voice + GAP (no hand-tuned drift)
- [ ] Artwork style-locked (one tradition, one palette across all pieces); zero embedded text/watermarks; frozen in the media ledger with prompts recorded in the SSOT
- [ ] Palette limited to parchment / ink / seal / night; no modern UI artifacts, no CSS-gradient grounds
- [ ] Dissolve/match-cut transitions only; Ken Burns direction alternates; progressive reveal paced to the VO
- [ ] Determinism (no `Math.random` / `Date.now`)
- [ ] BGM 16–20 dB under the voice, 1 s fades, outro hold present
- [ ] Rights confirmed for any non-public-domain text; translation labeled per §12
- [ ] Delivery keeps the audio track; `ffprobe` frame count matches the storyboard total
