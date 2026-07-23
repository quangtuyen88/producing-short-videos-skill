# vox-papercut-omni

House-style agent skill: Vox-style paper-cutout collage explainers with **Google Flow (Omni)** as the motion engine. Each beat is a generated paper-collage poster (torn edges, tape, halftone, headline baked in) brought alive as a "living poster" by Omni image-to-video; narration-measured timing; plain ffmpeg assembly — no Remotion.

## How it runs

Interview → beat map (user-approved) → style-locked posters (gpt-image-1 via media-use) → style-proof gate (1 poster + 1 Omni Flash previz) → previz all shots on Flash → finals on Omni → ffmpeg assembly with VO, BGM, optional karaoke captions.

Google Flow is reached two ways: the pinned **gflow-cli** bridge (`ffroliva/gflow-cli/skills/gflow-cli#v0.42.0`) when installed, or a paste-ready **manual flow pack** the user drives through the Flow UI — same file contract, same assembly.

## Requirements

- `../media-use/` sibling skill (`npx hyperframes init`) — posters, TTS, BGM
- `OPENAI_API_KEY` — gpt-image-1 poster generation
- Google Flow access (AI Pro/Ultra credits); optionally the pinned gflow-cli
- `ffmpeg` / `ffprobe`

## Boundaries

Same look family, different engines: `vox-director` (Atlas Cloud API pipeline), `paper-cutout-video` (Remotion layer-parallax diorama), `paper-collage-ad` (torn-paper ads). This skill is the Google-Flow-credits route. See `SKILL.md` for the full template; prompt grammar in `references/poster-and-motion-prompts.md`, Flow operations in `references/flow-omni-ops.md`.
