# poem-explainer-video

House-style template for cinematic poem/verse explainer videos in a vintage archival-scrapbook style: aged-parchment ground, AI-generated period artwork staged as pinned artifacts, one scene per couplet with original-text + translation cards, line-by-line TTS narration, and word-by-word karaoke captions. Style target: the 2026 viral "classical poem as cinematic explainer" format (HyperFrames / Remotion / ElevenLabs stack).

Self-contained creative-direction SKILL.md: brief interview → source-text audit → design tokens → artwork generation → narration with word timestamps → karaoke caption spec → beat skeleton → Remotion implementation → QA gates.

Distinct from the siblings:

- `product-demo-video` — kinetic product demos (fast cuts, whip pans, real-UI crops); this skill is the slow archival opposite.
- `product-launch-video` / `faceless-explainer` — HyperFrames pipeline workflows with step gates; this skill is a single-file house style whose reference stack is Remotion.
- One runtime sibling dependency: `../media-use/` (installed by `npx hyperframes init`) for TTS word timestamps, BGM, and artwork generation — gated in SKILL.md §6. The `scripts/resolve.mjs` and `scripts/audio.mjs` files here are thin wrappers that locate that sibling (beside this skill, then `~/.agents/skills/`) and forward to its real scripts, exiting with the install hint when it is missing.

## Smoke-run ledger

Record production runs here (date + evidence path).

| Date | Poem | Evidence |
|---|---|---|
| 2026-07-14 | "A Poem for Grok 4.5" (original verse, EN) | `reports/grok45-poem-video/` — storyboard.md, video/out/grok45-poem.mp4 (1005 f / 33.5 s), QA stills + contact sheet in video/qa/. Deviations logged in storyboard.md: media-use image providers unavailable → gpt-image-1.5 fallback; audio engine `--model parakeet` stale vs hyperframes CLI 0.7.56 → whisper transcribe patch; BGM via Wikimedia CC BY-SA ingest. |
