# Cast — Pip & Bolt

Original dual mascots for `product-launch-video`. **Do not** substitute VOICEVOX or other third-party character likenesses.

| Host | Id | Species | Palette | Role |
| --- | --- | --- | --- | --- |
| **Pip** | `pip` | Cyan fox | `#00D4C8` / `#7EF0E8` / white | Host A — hooks, reactions, energy, openers/CTAs |
| **Bolt** | `bolt` | Coral-orange cat | `#FF7A4D` / `#FFB199` / cream | Host B — facts, numbers, structure, recap clarity |

Assets in this folder:

| File | Use |
| --- | --- |
| `pip-avatar.svg` / `pip-avatar.png` | Pip bust (headset) — primary dual-cast host A |
| `bolt-avatar.svg` / `bolt-avatar.png` | Bolt bust (notebook + pen) — dual-cast host B |
| `mascot.svg` | Alias of Pip for **single-host** mode |

Prefer **PNG** in compositions when present (pre-keyed, circular-crop friendly). SVG is the source of truth for flat-vector recolor / fallback.

## Cast modes

Lock in Step 0 as `cast: dual | single | none`.

| Mode | When | On-screen |
| --- | --- | --- |
| **dual** | JP 解説, match/event recap, feature deep-dive, dark-tech dual-column explainer | Both small circular avatars (see `references/cast-avatars.md`) |
| **single** | Simple EN promo, one narrator, light brand film | Pip only (or `mascot.svg` alias), small dock or optional full-body secondary |
| **none** | Enterprise paper, pure product UI demo, no host brief | No cast assets staged |

Defaults:

- JP 解説 / dark tech explainer / recap cascade → **dual**
- Simple EN product promo → **single**
- Enterprise paper / no-host brand film → **none**

## Staging into a project

When `cast != none`, copy skill assets into the HyperFrames project after design (Step 2) and before/during visual design:

```bash
mkdir -p assets/images
# dual
cp <SKILL_DIR>/assets/mascots/pip-avatar.png assets/images/pip-avatar.png
cp <SKILL_DIR>/assets/mascots/bolt-avatar.png assets/images/bolt-avatar.png
# also stage SVG fallbacks
cp <SKILL_DIR>/assets/mascots/pip-avatar.svg assets/images/pip-avatar.svg
cp <SKILL_DIR>/assets/mascots/bolt-avatar.svg assets/images/bolt-avatar.svg
# single (Pip alias)
cp <SKILL_DIR>/assets/mascots/mascot.svg assets/images/mascot.svg
cp <SKILL_DIR>/assets/mascots/pip-avatar.png assets/images/mascot.png  # if PNG preferred
```

If only SVG exists, stage SVG paths and render with circular crop CSS.

Full layout, speaking states, dialogue tagging, and no-cover rules → `references/cast-avatars.md`.
