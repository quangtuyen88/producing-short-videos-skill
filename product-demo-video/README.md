# product-demo-video

House-style template for high-craft kinetic product demo/promo videos. Self-contained SKILL.md: brief interview → real-product design audit (codebase + live site) → storyboard → Remotion implementation → still QA → render → delivery.

Distinct from the sibling `product-launch-video` (HyperFrames pipeline with runtime sibling-skill dependencies): Mode A (kinetic demo, §1–§11) is a single-file creative-direction template with no runtime dependencies — the reference stack is Remotion, but the principles port to other tools.

Mode B (§12, long-form VOICEVOX dialogue explainer / ずんだもん解説) depends on the sibling `product-launch-video` skill: `references/dialogue-explainer.md` (style contract) and `scripts/voicevox-tts.mjs` (local-engine TTS client), plus a local VOICEVOX engine on `127.0.0.1:50021` (Docker `voicevox/voicevox_engine:cpu-latest` or the desktop app).

## Smoke-run ledger

No live end-to-end run yet. Record the first production run here (date + evidence path) before recommending this skill for production use.

| Date | Product | Evidence |
|---|---|---|
| 2026-07-14 | Mode B (§12) style-parity test, JA + EN, VOICEVOX + Kokoro audio, Remotion render | `reports/dialogue-explainer-test-2026-07-14.md` + `reports/assets/dialogue-explainer-2026-07-14/` |

Mode A (kinetic demo) has no live production run yet.
