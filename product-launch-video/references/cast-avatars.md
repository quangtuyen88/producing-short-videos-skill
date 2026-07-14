# Cast avatars — Pip & Bolt (small dock)

> Load in **Step 0** (lock cast mode), **Step 3** (dialogue VO), **Step 4** (Video direction + layout), and **Step 5** (frame-worker chrome).
> Companion assets: `assets/mascots/` + `assets/mascots/CAST.md`.
> Goal: dual-host **small circular avatars** on dense dark-tech dual-column chrome — Japanese 解説 / EN feature deep-dive style — without covering content.

This is the **primary** host mode for product/feature explainers. Full-body large mascot (legacy) remains a secondary option in `density-and-chrome.md`.

---

## Cast modes

Lock once in Step 0 as `cast: dual | single | none`.

| Mode | Default for | On-screen |
| --- | --- | --- |
| **dual** | JP 解説, match/event recap, feature deep-dive, dark-tech dual-column explainer | Pip + Bolt small circular avatars |
| **single** | Simple EN promo, one narrator | Pip only (or `mascot.svg` alias) |
| **none** | Enterprise paper, pure UI demo, no-host brief | No cast dock |

Record the choice in the brief / `## Video direction` (e.g. `cast: dual`).

---

## Characters

| Id | Name EN | Name JP | Look | VO personality |
| --- | --- | --- | --- | --- |
| `pip` | Pip | ピップ | Cyan fox, headset | Hooks, reactions, energy, openers / CTAs |
| `bolt` | Bolt | ボルト | Coral cat, notebook + pen | Facts, numbers, structure, recaps |

Original cast only in these dock modes — never swap third-party character likenesses into Pip/Bolt slots. When the brief wants VOICEVOX characters (ずんだもん解説 style), that is a different cast mode: `cast: voicevox-duo` per `dialogue-explainer.md` (voices + names with mandatory credit; avatar art user-supplied or original, never bundled).

---

## Small avatar dock layout

### Size & chrome

- Circle diameter: **88–112px** (landscape 1920×1080 default **96px**)
- **Accent ring**: 3–4px; Pip ring `#00E5C8`, Bolt ring `#FF7A4D` (or brand accent if remapped)
- Soft drop shadow under each circle (`0 6px 18px rgba(0,0,0,0.45)`)
- **Nameplate** under (or beside) each circle:
  - EN: `Pip` / `Bolt`
  - JA: `ピップ` / `ボルト`
  - Style: 11–13px muted ink on translucent dark pill; optional accent left border

### Placement (pick one per video; keep consistent)

**A. Bottom-left stacked (preferred for dual-column + bottom summary)**

- Dock sits in the **left gutter** above the bottom summary box
- Pip above, Bolt below (or reverse if Bolt opens the series)
- Stack gap ~12–16px; left inset ~20–28px
- Bottom of lower avatar clears bottom summary by ≥12px

**B. Bottom corners**

- Pip bottom-left, Bolt bottom-right
- Each clears bottom summary and side cards
- Use when both columns are equally dense and left stack would collide with left title stack

**Single mode:** one circle in bottom-left gutter (or bottom-right only if left is full of title stack — still never over text).

### Speaking state

- Active host: ring **pulse / glow** (subtle scale 1→1.06 or box-shadow accent bloom, 0.6–1.0s loop, long-tail ease)
- Inactive host: ring at rest opacity ~0.55–0.7; avatar opacity ~0.85
- CSS hook: `.cast-avatar.is-speaking` on the active host for the Scene window matching their turn
- Do **not** bounce the whole body over content — ring/glow only

---

## Dual dialogue VO

When `cast: dual`:

1. Write VO as **short alternating turns**, not monologue walls.
2. Tag every spoken frame in `SCRIPT.md` / storyboard with:

   ```md
   - speaker: pip
   ```

   or

   ```md
   - speaker: bolt
   ```

3. Personality split:
   - **Pip** — hooks, reactions, “wow”, openers, CTA energy
   - **Bolt** — facts, numbers, timelines, constraints, takeaways
4. JP: short clauses; EN: same cue-segmentation rule as `story-design.md`.
5. Optional: alternate speaker every frame, or multiple short turns inside one frame if the shot sequence shows both speaking states.

Frame worker maps `speaker:` → `.is-speaking` on that host for the matching Scene windows (or whole frame if one speaker).

---

## No-cover rules (hard)

Same spirit as the large-mascot rule, stricter for dual docks:

1. **Never** place avatars over titles, body copy, stats, cards, pills, or the bottom summary box.
2. **Reserve gutter** for the dock:
   - Stacked left: add left-stage / title-stack `padding-left` or keep title stack inset so circles sit in empty margin.
   - Corner mode: pad both outer gutters; never sit on the right card grid.
3. **The dock column is an exclusion zone for content.** Stacked-left on 1920×1080: the strip from the left edge to x≈180px, from y≈560 down to the bottom summary, belongs to the dock alone. No card, stat, pill, or text block may be absolutely positioned into it — including elements that only *reveal late* in the frame (a stat card sliding in at 60–80% of the duration is the classic collision, because it never appears in a midpoint snapshot). Content columns start at or right of the title-stack inset (≥200px), never at `left: 0–180px` of the stage.
4. **Geometric self-check (frame worker, mandatory):** before finishing, compute the dock's bounding box (circles + nameplates) and the *final-state* bounding box of every text/card/stat element — including elements whose clip window starts mid-frame. Any intersection = fail; re-position the content element (never the dock) and re-check.
5. Dock **z-index** below critical text if any risk of overlap; prefer **zero overlap**.
6. Contact-sheet QA (orchestrator): snapshot each dock-bearing frame at a **late timestamp (~85% of its duration), not only the midpoint** — late reveals are exactly what midpoints miss. If any readable character intersects an avatar circle or nameplate, **fail** and re-layout.
7. Skip cast on pure logo stings when the frame is intentionally empty chrome (open/close exceptions only).

---

## Staging assets

When `cast != none`, stage skill assets into the project:

```bash
mkdir -p assets/images
cp <SKILL_DIR>/assets/mascots/pip-avatar.png assets/images/ 2>/dev/null || true
cp <SKILL_DIR>/assets/mascots/bolt-avatar.png assets/images/ 2>/dev/null || true
cp <SKILL_DIR>/assets/mascots/pip-avatar.svg assets/images/
cp <SKILL_DIR>/assets/mascots/bolt-avatar.svg assets/images/
cp <SKILL_DIR>/assets/mascots/mascot.svg assets/images/   # single-host alias
```

Prefer PNG when present. Reference as `assets/images/pip-avatar.png` etc. in compositions (root-relative).

List staged files in `capture/extracted/asset-descriptions.md` only if story needs them as `asset_candidates`; otherwise treat as **chrome** (always available after staging), not per-beat capture assets.

---

## HTML/CSS sketch (frame worker)

Illustrative only — adapt tokens from `frame.md`:

```html
<div class="cast-dock cast-dock--stacked-left" data-cast="dual">
  <div class="cast-avatar cast-avatar--pip is-speaking" data-host="pip">
    <div class="cast-ring"></div>
    <img class="cast-face" src="assets/images/pip-avatar.png" alt="" />
    <span class="cast-name">Pip</span><!-- or ピップ -->
  </div>
  <div class="cast-avatar cast-avatar--bolt" data-host="bolt">
    <div class="cast-ring"></div>
    <img class="cast-face" src="assets/images/bolt-avatar.png" alt="" />
    <span class="cast-name">Bolt</span><!-- or ボルト -->
  </div>
</div>
```

```css
.cast-dock--stacked-left {
  position: absolute;
  left: 24px;
  bottom: 140px; /* clears bottom summary */
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 4;
  pointer-events: none;
}
.cast-avatar {
  position: relative;
  width: 96px;
  text-align: center;
  opacity: 0.88;
}
.cast-face {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  background: #0a2430;
}
.cast-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 3px solid rgba(0, 229, 200, 0.55);
  box-shadow: 0 0 0 0 rgba(0, 229, 200, 0);
}
.cast-avatar--bolt .cast-ring {
  border-color: rgba(255, 122, 77, 0.55);
}
.cast-avatar.is-speaking {
  opacity: 1;
}
.cast-avatar.is-speaking .cast-ring {
  border-color: #00e5c8;
  box-shadow: 0 0 16px 2px rgba(0, 229, 200, 0.45);
  /* GSAP: subtle pulse on ring scale/opacity for the speaking Scene */
}
.cast-avatar--bolt.is-speaking .cast-ring {
  border-color: #ff7a4d;
  box-shadow: 0 0 16px 2px rgba(255, 122, 77, 0.45);
}
.cast-name {
  display: inline-block;
  margin-top: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #e8f7f7;
  background: rgba(4, 16, 24, 0.72);
}
```

Animate only ring glow / opacity for speaking; keep dock positions fixed across content frames for series consistency.

---

## Language

- **Default language: `en`** (nameplates `Pip` / `Bolt`).
- **`ja`** when the brief asks — nameplates `ピップ` / `ボルト`; VO short clauses; ship CJK fonts per `density-and-chrome.md`.
- Cast mode is independent of language, but **dual is the default pairing** for JP 解説 and dark-tech explainers.

---

## Video direction lines (Step 4)

When cast is enabled, include in `## Video direction`:

```
cast: dual
cast dock: stacked-left small avatars (96px), Pip above Bolt
speaking: ring pulse on active speaker from SCRIPT speaker tags
nameplates: en|ja
negative: avatars over titles/stats/cards/bottom summary
```

Layout vocabulary: `cast dock dual` · `cast dock single` (see `density-and-chrome.md`).
