---
name: product-launch-video
description: "turn a product or marketing URL, pasted script, or brief into a product launch video — SaaS promos, feature reveals/解説, app launches, company promos, launch recaps, dual-host small-avatar tech explainers, and VOICEVOX character-duo dialogue explainers (ずんだもん解説-style; EN or JA). Default visual bar: high-density dual-column explainer chrome (references/density-and-chrome.md) with optional Pip & Bolt cast avatars — never sparse single-line slides. Use when marketing, launching, promoting, recapping, or explaining a product/feature. Do not use for general non-launch website tours, pure non-product topic explainers (→ faceless-explainer), GitHub PRs, captioning existing footage, short unnarrated motion graphics, or converting an existing Marp/slide deck to video (→ remotion-slide-video). If intent is unclear, route through /hyperframes first. Shot-sequence architecture: every visual frame is a time-coded shot from golden blueprints, so frames develop over their full duration instead of freezing after entrance."
---

> **media-use**: Before sourcing audio/images, call `/media-use` to resolve BGM/SFX/images from the HeyGen catalog. Run `--adopt` first to register existing assets. See `/media-use` skill.

# Product Launch to HyperFrames

Use this skill to capture a product, understand its brand, plan a launch video, and build it frame by frame in HyperFrames.

> **Confirm the route before Step 0.** You are the orchestrator. Run each step, verify its gate, and only then continue to the next step. This skill is for a **product being marketed, launched, promoted, revealed, or recapped**, including product/feature 解説 and marketed product launch recaps (EN or JA dual-host small-avatar style). Requests such as "promo for our site" stay here when the purpose is promotional. Route other intents elsewhere: a general non-launch website tour -> `/website-to-video`; a **pure non-product** topic explainer -> `/faceless-explainer`; a GitHub PR -> `/pr-to-video`; captions on existing footage -> `/embedded-captions`; a short unnarrated motion graphic -> `/motion-graphics`. If the user says only "make a video" or the route is uncertain, read `/hyperframes` first.

You are the orchestrator. Work in `videos/<project>/`. Run steps in order and pass each gate before continuing. User-gated steps are Step 0, Step 3, and Step 6. Do every step yourself except Step 5, where you dispatch one sub-agent per frame. Do not put design or motion rules here; those live in the frame-worker sub-agent, this skill's local `../hyperframes-animation/rules/` + `../hyperframes-animation/blueprints/`, and `hyperframes-creative`.

Workflow: Step 0 setup -> `hyperframes.json`; Step 1 capture -> `capture/`; Step 2 design system -> `frame.md`; Step 3 storyboard/script -> `STORYBOARD.md` and `SCRIPT.md`; Step 3.1 audio -> `audio_meta.json`; Step 4 visual design -> enriched `STORYBOARD.md`; Step 5 frames -> `compositions/frames/NN-*.html` and `index.html`; Step 6 final render -> `renders/video.mp4`.

---

## Step 0: Setup and Brief

Goal: Lock the core video brief and create the HyperFrames project if needed.

Initialize only if `hyperframes.json` is missing. Name `<project>` from the brand or domain in kebab-case, such as `acme-promo`; never use workspace name or timestamp.

`npx hyperframes init "videos/<project>" --non-interactive --example=blank` — `init` checks the installed skills against the latest on GitHub and updates the global set if any are out of date.

**Sibling-skill dependency gate.** This skill reads four sibling skills at runtime: `../hyperframes-core/`, `../hyperframes-creative/`, `../hyperframes-animation/`, and `../media-use/`. They are not bundled here — `npx hyperframes init` (above) installs and updates them next to this skill. After init, verify all four directories exist beside this skill's directory; if any is missing, stop and report which one instead of improvising.

**Show sign-in status before the brief** — run `npx hyperframes auth status` and **relay its output verbatim (don't paraphrase or rewrite it).** It reports whether voice/BGM will use HeyGen or local engines and, when not signed in, how to sign in. **If not signed in, STOP and wait for the user to choose — sign in, or say "go"/"offline" to continue with local engines — before asking the brief or anything else.** Treat it as a real decision point, not a passing note; don't fold the choice into the brief question, and don't write keys into a per-repo `.env`. (In autonomous mode, note the status and continue offline.) See `../media-use/` → Preflight for the canonical guidance.

**Language defaults to English.** Lock `language: en` unless the user's brief explicitly asks for another language (e.g. `ja`) — never infer a different language from the captured site alone. Supported product-launch languages for this skill's cast/chrome path: **`en` | `ja`**.

**Cast lock.** Lock `cast: dual | single | none | voicevox-duo` in the same brief pass:
- **dual** — default for JP 解説, dark-tech dual-column explainers, match/event/feature recaps (Pip + Bolt small avatars; see `references/cast-avatars.md`)
- **single** — default for simple EN promos (Pip / `mascot.svg` only)
- **none** — enterprise paper, pure UI demo, or no-host brief
- **voicevox-duo** — when the brief says ずんだもん解説 / ゆっくり系 / character-duo commentary, names VOICEVOX characters, or shows a reference with a bottom speaker band. Uses the dialogue-explainer chrome and VOICEVOX voices per `references/dialogue-explainer.md` (local engine required — run `node <SKILL_DIR>/scripts/voicevox-tts.mjs check` during this step and surface its hint if the engine is down).

**Gate:** `hyperframes.json` exists, and angle, length, aspect ratio, language (`en`|`ja`), and cast (`dual`|`single`|`none`|`voicevox-duo`) are locked; sign-in status was shown (signed in, or continuing offline).

---

## Step 1: Capture assets

Goal: Collect the source material, brand signals, and usable assets for the video.

Classify the input and choose the path. Explicit URL -> capture it and use the site for narration and assets. Pasted script/brief -> save verbatim as `user_script.txt`, ask once "use it verbatim or restructure?", store answer as `VO_MODE`, then resolve capture target: URL in text -> use it; brand name only -> `WebSearch`, confirm URL in one line, then crawl; no URL/site -> no-capture path.

Run capture with: `npx hyperframes capture "<URL>" -o ./capture`

If `GEMINI_API_KEY`, `GOOGLE_API_KEY`, or an OpenRouter key exists, capture auto-captions assets into `capture/extracted/asset-descriptions.md`. This is not a review gate. Without a vision key, use DOM context and continue.

No-capture path: create `capture/extracted/tokens.json`, `capture/extracted/visible-text.txt`, `capture/extracted/asset-descriptions.md`, and `capture/assets/` by hand. `tokens.json` should be `{ "title": "", "description": "", "colors": [], "fonts": [] }`; fill title/description from the brief when possible. `visible-text.txt` contains the full brief or script. `asset-descriptions.md` should say no assets were captured unless the user gave asset notes.

**Gate:** `capture/extracted/tokens.json`, `capture/extracted/visible-text.txt`, `capture/extracted/asset-descriptions.md`, and `capture/assets/` exist; you can state the brand in one clear sentence. Treat `asset-descriptions.md` as the main asset inventory. If it is missing after real capture, stop and report capture incomplete. If `capture/BLOCKED.md` exists, follow it.

---

## Step 2: Design System

Goal: Choose one shipped frame preset; a script turns it into this video's `frame.md` + caption skin.

You make the one judgment call — **which preset**. Read `design-spec.md` in `../hyperframes-creative/` (its reference docs) and pick the preset whose look best fits the brand and brief. Then run:

```bash
node <SKILL_DIR>/scripts/build-frame.mjs --preset <name> --hyperframes .
```

The script does the rest deterministically: copies the preset's `FRAME.md` → `frame.md` and **remixes** it onto the brand tokens in `capture/extracted/tokens.json` (brand colors mapped onto the preset's color keys by role — ink, canvas, accents — keeping keys/structure/components; the preset's display + body fonts swapped for the brand's), copies the preset's caption skin to `.hyperframes/caption-skin.html`, and self-validates (exits 1 on a broken mapping). Proceed to the next step as soon as it exits 0 — no hand-editing of the spec.

`tokens.json` with no brand colors/fonts (e.g. no capture) → the script keeps the preset's own palette, a complete shippable design. If the brief names brand colors/fonts the capture missed, add them to `capture/extracted/tokens.json` before running (or use the user's `design.md` to populate it); only adjust `frame.md` by hand afterward if a mapping truly needs it.


**Quality default for product / feature videos:** Prefer high-density layouts over sparse title cards. For AI, models, APIs, coding agents, or Japanese 解説 / high-readability briefs, use the **dark tech explainer** system in `references/density-and-chrome.md` (dark canvas, cyan accents, dual-column cards, top bar + bottom summary). Light presets are fine for warm enterprise brands, but still enforce dual-column density — never ship empty white frames with one centered line.

**Gate:** `build-frame.mjs` exited 0 — `frame.md` exists from a named preset, and (when the preset ships one) `.hyperframes/caption-skin.html` exists as the caption skin source.

**Cast staging (when `cast != none`):** copy skill mascots into the project so Step 4–5 can reference them as chrome:

```bash
mkdir -p assets/images
cp <SKILL_DIR>/assets/mascots/pip-avatar.png assets/images/ 2>/dev/null || true
cp <SKILL_DIR>/assets/mascots/bolt-avatar.png assets/images/ 2>/dev/null || true
cp <SKILL_DIR>/assets/mascots/pip-avatar.svg assets/images/
cp <SKILL_DIR>/assets/mascots/bolt-avatar.svg assets/images/
cp <SKILL_DIR>/assets/mascots/mascot.svg assets/images/
# single-host convenience alias
cp <SKILL_DIR>/assets/mascots/pip-avatar.png assets/images/mascot.png 2>/dev/null || true
```

See `assets/mascots/CAST.md` and `references/cast-avatars.md`.

---

## Step 3: Storyboard and Script

Goal: Turn the brief and captured material into an approved frame-by-frame story plan.

Read `references/story-design.md`, `references/cast-avatars.md` (when cast ≠ none), `../hyperframes-animation/blueprints-index.md`, and — in `../hyperframes-core/` reference docs — `storyboard-format.md` and `script-format.md`. Use them to write `STORYBOARD.md` and, when narration is needed, `SCRIPT.md`.

Use `story-design.md` for story blueprint, hook, persuasion logic, beats, `VO_MODE`, asset choices, the **Recap / 解説 Cascade** arc, and dual-cast dialogue (Pip & Bolt `speaker:` tags). When `cast: voicevox-duo`, also read `references/dialogue-explainer.md`: write `SCRIPT.md` as short alternating turns tagged `speaker: zundamon` / `speaker: metan` (or the locked host tags), several turns per frame, and let each frame persist across its turns with staged reveals. Prefer Recap / 解説 Cascade for event/match/launch recaps and long feature 解説. As a **soft guide**, consult the role→blueprint menu in `../hyperframes-animation/blueprints-index.md`: for each beat, note a candidate blueprint id when one fits. Story truth still decides which beats exist — never force a beat to fit a blueprint, and never invent a beat just because a proven shape is available. Choose each visual frame's `asset_candidates` from `capture/extracted/asset-descriptions.md` (the canonical inventory) — don't browse raw `capture/assets/`. Do not ask the user to pick assets unless that inventory is missing or unusable. Use the exact required fields from the storyboard and script references.

After drafting, show a frame-by-frame summary. In that same message ask the user two things: (a) to approve or request changes, and (b) whether they want a live preview of the storyboard scaffold (npx hyperframes preview) — open it only on a yes. Iterate until approved, and carry the preview choice to Step 6.

**Gate:** `STORYBOARD.md` exists, every visual frame has `asset_candidates`, `SCRIPT.md` exists when narration is needed, and the user approved the frame-by-frame plan.

---

## Step 3.1: Audio

Goal: Generate narration, word timings, music, and audio metadata from the approved script.

Start audio after Step 3 approval. **Preflight in the foreground first** — a backgrounded job that dies is invisible until Step 5:

`node <SKILL_DIR>/scripts/audio.mjs check`

If `check` fails (shared engine missing), stop and report it; do not background the generate. When it passes, run generate in the background and continue to Step 4. TTS defaults to English; pass `--language <code>` only when the locked brief chose another language.

`node <SKILL_DIR>/scripts/audio.mjs --script ./SCRIPT.md --storyboard ./STORYBOARD.md --hyperframes . --out ./audio_meta.json &`

The audio script handles narration, word timings, BGM lookup from HeyGen's music library, and timing metadata. BGM mood comes from the storyboard's `music:` field. This uses the HeyGen Audio API for retrieval, not generation, and uses the same `~/.heygen` credential as TTS. For provider details, read `tts.md` in `../media-use/` (its audio reference docs).

If there is no narration and no `SCRIPT.md`, skip voice generation. BGM may still run if the storyboard has a music mood.

**VOICEVOX route (`cast: voicevox-duo`).** Skip the shared engine and use this skill's client against the local VOICEVOX engine instead:

`node <SKILL_DIR>/scripts/voicevox-tts.mjs check`

`node <SKILL_DIR>/scripts/voicevox-tts.mjs generate --script ./SCRIPT.md --outdir ./audio --out ./audio_meta.json`

Its `audio_meta.json` is line-keyed (`lines[]` with `speaker`, `start`, `duration`, mora-derived `words[]`); sum each frame's line durations (+gaps) to set frame durations in `STORYBOARD.md` — `audio.mjs sync-durations` expects the shared-engine shape and does not apply here. Speaker map and engine setup: `references/dialogue-explainer.md`. For an EN variant of the same video, use the standard chain above with two distinct EN voices instead.

**Gate:** `check` passed and the audio job has started, or the project is marked silent.

---

## Step 4: Frame Visual Design

Goal: Add the visual direction, layout intent, and motion choices to each storyboard frame.

Edit `STORYBOARD.md` in place. Do not create another storyboard. Use `frame.md` as source of truth for color, type, layout feel, and style.

Read `references/visual-design.md`, `../hyperframes-animation/blueprints-index.md`, `references/motion-language.md`, and `../hyperframes-animation/rules-index.md`. Use `visual-design.md` for the method (the time-coded shot sequence, the inline Layout vocabulary, and the required `## Video direction` block). Use `../hyperframes-animation/blueprints-index.md` to pick each frame's shot shape. Use `motion-language.md` (the motion vocabulary + the motion doctrine) and `../hyperframes-animation/rules-index.md` (valid rule names) for motion — do not invent motion names.

For every visual frame, write a **time-coded shot sequence** into `STORYBOARD.md` per `visual-design.md`'s method: pick the frame's blueprint (or compose), instantiate it with THIS product's content, and pace each Scene's reveal to the voiceover so the frame develops across its full duration instead of front-loading then freezing. State layout and motion **inline** per Scene (vocabularies in `visual-design.md` and `motion-language.md`). Add one video-wide `## Video direction` block.

When `cast ≠ none`, the `## Video direction` block **must** state `cast: dual|single`, dock placement (`stacked-left` or `corners`), and that frame workers implement the cast dock per `references/cast-avatars.md` (layout vocab: `cast dock dual` / `cast dock single`). When `cast: voicevox-duo`, state `cast: voicevox-duo` instead and direct frame workers to the chrome in `references/dialogue-explainer.md`: bottom dialogue band (speaker avatar + name pill + line text, swapping on turn boundaries) replaces both the cast dock and karaoke captions; content slides carry the accent-bar header + breadcrumb; the first frame carries the VOICEVOX credit.

Do not change story, script, asset choices, `asset_candidates`, `transition_in`, or captured source material. Do not write HTML in this step.

Stage named assets after visual design is locked:

`node <SKILL_DIR>/scripts/stage-assets.mjs --storyboard ./STORYBOARD.md --hyperframes .`


**Density gate:** After writing Scene lines, re-read `references/density-and-chrome.md`. Reject any frame that is only large type on empty canvas. Product/feature videos must pass the contact-sheet density check before Step 5.

**Gate:** every visual frame has a time-coded shot sequence whose reveals are paced to the voiceover (no front-loading); `## Video direction` exists; density bar in `references/density-and-chrome.md` is met; `assets/` contains the named assets.

---

## Step 5: Build Frames

Goal: Build every storyboard frame as an HTML composition and assemble the playable video.

Wait for Step 3.1 audio to finish if audio was started. Then sync durations and fetch SFX; skip both if silent.

`node <SKILL_DIR>/scripts/audio.mjs sync-durations --audio-meta ./audio_meta.json --storyboard ./STORYBOARD.md`

`node <SKILL_DIR>/scripts/audio.mjs fetch-sfx --storyboard ./STORYBOARD.md --hyperframes .`

Duration sync is mechanical: real voice duration wins, and each synced frame's Scene windows are rescaled to it in the same pass; silent frames keep estimates; never hand-edit synced durations or rescaled windows.

Before dispatch, read `sub-agents/frame-worker.md` and `subagent-dispatch.md` in `../hyperframes-core/` (its reference docs). Dispatch one sub-agent per frame, in parallel if possible; otherwise run workers in waves. Each worker gets exactly one frame.

Each worker context must include `PROJECT_DIR`, `frame_id`, canvas size, caption status and keep-out band if captions are enabled, `RULES_DIR` as the absolute path to this skill's `../hyperframes-animation/rules/`, and — for voiced frames — the frame's `words[]` array from `audio_meta.json` (each word's `text`/`start`/`end`, frame-relative) so reveals land on the real spoken timestamps rather than the Scene windows' estimates. Each worker reads `frame.md`, its own `## Frame N` block from `STORYBOARD.md`, the local rule recipe (`../hyperframes-animation/rules/<id>.md`) for each cited motion, and the frame's blueprint template (`../hyperframes-animation/blueprints/<id>.md`). Each worker writes only `compositions/frames/NN-*.html`. Workers must never edit `STORYBOARD.md`.

**Full-bleed backgrounds ride on a `class="clip"` layer, never the `#root`.** A frame's ground (color field / gradient / grid) is its own full-duration background clip — a `background` set on the `#root` / `data-composition-id` element is clip-gated to the frame's window and is not a dependable ground, so dark content can land on the black host `body` and render invisible. The video's base ground is painted by the assembler from `frame.md`'s `canvas` color onto the index `#root`. (Full rule + self-check: `sub-agents/frame-worker.md`.)

As each worker returns, the orchestrator marks that frame as `animated` in `STORYBOARD.md`.

After audio timings exist, build captions in the background and assemble the index:

`node <SKILL_DIR>/scripts/captions.mjs build --storyboard ./STORYBOARD.md --audio-meta ./audio_meta.json --hyperframes . --out ./caption_groups.json &`

`node <SKILL_DIR>/scripts/assemble-index.mjs --storyboard ./STORYBOARD.md --hyperframes .`

`captions.mjs` uses the project's `.hyperframes/caption-skin.html` (copied in Step 2) as the caption look, injecting brand tokens from `frame.md`; with no skin present it renders the built-in default pill. `captions: skipped (<reason>)` is valid. Continue without captions when explicitly skipped. With `cast: voicevox-duo`, always skip captions (`captions: skipped (dialogue band)`) — the dialogue band built into each frame is the caption system.

**Gate:** every frame is marked `animated`, `index.html` exists, and captions are built or explicitly skipped.

---

## Step 6: Finalize

Goal: Verify the assembled video, get user approval, and render the final MP4.

Inject transitions, run checks, pause for review, then render.

`node <SKILL_DIR>/scripts/transitions.mjs inject --storyboard ./STORYBOARD.md --hyperframes .`

`node <SKILL_DIR>/scripts/transitions.mjs verify --storyboard ./STORYBOARD.md --index ./index.html`

`npx hyperframes lint`

`npx hyperframes validate`

`npx hyperframes inspect`

`npx hyperframes snapshot --at <frame-midpoints-and-late-points>`

Snapshot each frame at its midpoint **and at ~85% of its duration** — reveals are VO-paced into the back half by design, so a midpoint-only sheet misses late-arriving cards (and any cast-dock collision they cause; see the no-cover QA in `references/cast-avatars.md`).

`snapshot` stitches the captured frames into one contact sheet (`snapshots/contact-sheet.jpg`). Glance at it; if nothing is obviously broken, move on — don't linger here.

If a command fails, surface stderr and stop — don't pile on recovery commands. Fix it yourself: the cheapest safe edit to `compositions/frames/NN-*.html`, then rerun the failed check.

After checks pass, pause for user review. The video is assembled, viewable, and editable in Studio. Manage preview only once across Step 3 and Step 6: open it if the user asked earlier, offer it if they declined earlier, and do not ask again if they are already reviewing in Studio.

Preview: `npx hyperframes preview`

Render only after user approval:

`npx hyperframes render --skill=product-launch-video --quality high --output renders/video.mp4`

Do not rerun `lint`, `validate`, `inspect`, or `snapshot` after rendering unless the user asks.

**Gate:** `lint`, `validate`, and `inspect` passed before render; user approved at the review pause; `renders/video.mp4` exists. Final reply states MP4 path and final duration.

---

## Quick Reference

**Formats:** landscape `1920x1080` by default; portrait `1080x1920`; square `1080x1080`. Set the format once in the storyboard frontmatter.

**Background scripts:** the workflow ships only these scripts under `scripts/`: `build-frame` for adopting + brand-remixing a frame preset into `frame.md` (+ caption skin); `audio` for TTS, transcription, BGM, SFX, and duration syncing; `voicevox-tts` for the local VOICEVOX engine when `cast: voicevox-duo`; `captions`; `transitions` for inject and verify; `stage-assets` for copying frame-named assets into `assets/`; and `assemble-index`. Everything else is handled by the `hyperframes` CLI.

The reusable, product-agnostic shot shapes live in `../hyperframes-animation/blueprints/` (indexed by `../hyperframes-animation/blueprints-index.md`).

| Read                                                                                                                                                        | When                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `[../hyperframes-creative/frame-presets/](../hyperframes-creative/frame-presets/)`                                                                          | Step 2: choose and adopt a frame preset.                       |
| `design-spec.md` in `../hyperframes-creative/` (reference docs)                                                                                             | Step 2: apply brand tokens correctly.                          |
| `[references/story-design.md](references/story-design.md)`                                                                                                  | Step 3: plan the product-launch story.                         |
| `[../hyperframes-animation/blueprints-index.md](../hyperframes-animation/blueprints-index.md)`                                                              | Step 3: role→blueprint menu. Step 4: pick the shot shape.      |
| `storyboard-format.md` in `../hyperframes-core/` (reference docs)                                                                                           | Step 3: write `STORYBOARD.md`.                                 |
| `script-format.md` in `../hyperframes-core/` (reference docs)                                                                                               | Step 3: write `SCRIPT.md`.                                     |
| `tts.md` in `../media-use/` (audio reference docs)                                                                                                          | Step 3.1: choose or understand TTS providers and voices.       |
| `[references/density-and-chrome.md](references/density-and-chrome.md)`                                                                                        | Step 2–5: product/feature density + dark tech explainer chrome. |
| `[references/cast-avatars.md](references/cast-avatars.md)` + `[assets/mascots/CAST.md](assets/mascots/CAST.md)`                                              | Step 0/3–5: cast modes, Pip & Bolt dock, dual dialogue.         |
| `[references/dialogue-explainer.md](references/dialogue-explainer.md)`                                                                                       | Step 0/3–5 when `cast: voicevox-duo`: chrome, palette, VOICEVOX audio, parity checklist. |
| `[references/visual-design.md](references/visual-design.md)`                                                                                                | Step 4: write the frame's shot sequence (+ Layout vocabulary). |
| `[references/motion-language.md](references/motion-language.md)`                                                                                            | Step 4: the motion vocabulary + the motion doctrine.           |
| `[references/cut-catalog.md](references/cut-catalog.md)`                                                                                                    | Step 4-5: the cut catalog (worker builds within-frame seams).  |
| `[../hyperframes-animation/rules-index.md](../hyperframes-animation/rules-index.md)` + `[../hyperframes-animation/rules/](../hyperframes-animation/rules/)` | Step 5: local rule recipe bodies for the cited motions.        |
| `[sub-agents/frame-worker.md](sub-agents/frame-worker.md)`                                                                                                  | Step 5: dispatch per-frame workers.                            |
| `subagent-dispatch.md` in `../hyperframes-core/` (reference docs)                                                                                           | Step 5: dispatch sub-agents safely.                            |
