# producing-short-videos-skill

Agent skills for producing short-form videos — house-style templates that take a brief, URL, or source text to a finished narrated MP4. Maintained by [@quangtuyen88](https://github.com/quangtuyen88), distributed via [APM](https://github.com/microsoft/apm) (Agent Package Manager).

Each `<skill-name>/` directory at the repo root is a standalone skill following the [agentskills.io](https://agentskills.io/specification) open standard; the directory name always equals the skill's frontmatter `name`, so the APM-deployed directory keeps the canonical skill name.

Compatible with **Claude Code**, **Codex CLI**, **Kiro CLI**, and **Copilot CLI** (all four read the same `SKILL.md` format).

## Skills

| Skill | What it produces |
|---|---|
| [`product-launch-video`](product-launch-video/) | Product launch / promo videos from a product URL, pasted script, or brief — SaaS promos, feature reveals, app and company launches (HyperFrames pipeline). Includes the VOICEVOX dialogue-explainer (Zundamon-style) mode. |
| [`product-demo-video`](product-demo-video/) | Kinetic product demos — fast cuts, whip pans, real-UI crops. Mode B (dialogue) reuses the sibling's dialogue-explainer contract. |
| [`poem-explainer-video`](poem-explainer-video/) | Cinematic poem/verse explainers in a vintage archival-scrapbook style — period artwork, line-by-line TTS narration, word-by-word karaoke captions (Remotion stack). |

## Install

Install an individual skill (global / user scope):

```sh
apm install -g quangtuyen88/producing-short-videos-skill/<skill-name>
# e.g.
apm install -g quangtuyen88/producing-short-videos-skill/product-launch-video
```

Or add to a project's `apm.yml`:

```yaml
dependencies:
  apm:
    - quangtuyen88/producing-short-videos-skill/product-launch-video
```

Pin to a tag:

```sh
apm install -g quangtuyen88/producing-short-videos-skill/product-launch-video#v1.0.0
```

Without APM, any Agent Skills–compatible agent can use these directly — the [`skills`](https://github.com/vercel-labs/skills) CLI installs into every detected agent:

```sh
npx skills add quangtuyen88/producing-short-videos-skill --skill <skill-name>
```

Or clone and symlink a skill directory into `<agent-home>/skills/<skill-name>/` yourself.

## Dependencies

- **Sibling skills at install time:** `product-demo-video` Mode B reads `../product-launch-video/` (dialogue-explainer reference + `voicevox-tts.mjs`) — install both when using dialogue mode. The skills otherwise stand alone.
- **Runtime siblings (not shipped here):** the `hyperframes-*` / `media-use` skill family is installed by `npx hyperframes init`; each SKILL.md gates on its presence (beside the skill, then `~/.agents/skills/`) and prints the install hint when missing.
- **History:** these skills previously lived in [`quangtuyen88/dev-skill`](https://github.com/quangtuyen88/dev-skill) under `slide/`; the deck-authoring pipeline (`marp-slide-author`, `slide-layout-fix`, `slide-style-rector`, `remotion-slide-video`) remains there.
