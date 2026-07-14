# Density & chrome — product / feature video quality bar

> Load this in **Step 2 (design)**, **Step 3 (story)**, **Step 4 (visual design)**, and **Step 5 (frame-worker)**.
> Goal: every product-launch / feature video should read as a **high-density, high-readability explainer**, not a sparse PowerPoint.

This standard was codified from production work matching top-tier Japanese product-intro videos (dark tech UI, dual-column cards, persistent chrome). Apply it by default for:

- AI / model / API / developer-tool launches
- Japanese narration + 「解説」「紹介」「スライド風」「見やすい」
- Feature reveals, flagship model intros, SaaS product walkthroughs
- Any brief that asks for **high readability** or **slide-style structure**

Light / cream consulting packs (`blue-professional`, etc.) remain valid when the brand is explicitly warm/enterprise-paper — but **never** use them as an excuse for empty white frames with one centered line.

---

## Quality bar (hard)

A finished contact sheet must fail the "sparse slide" test:

| Fail (do not ship) | Pass (ship this) |
| --- | --- |
| White/empty field + one headline | Dual-column: title stack + info panel |
| No supporting cards / stats | ≥2 card/stat elements by mid-shot |
| No on-screen summary | Bottom summary chrome or equivalent |
| Content only in center 30% | Primary visual ≥40% of canvas; fill top ~83% |
| Front-load then freeze | VO-paced sequential reveals |

If a frame looks like a title card with nothing else, **it is incomplete**.

---

## Preferred visual system: dark tech explainer chrome

When the product is tech/AI/API/coding (or the user wants Japanese high-readability slides), prefer this system over sparse light presets.

### Palette roles (map into `frame.md` / hand-authored tokens)

| Role | Approx | Use |
| --- | --- | --- |
| canvas | `#041018` – `#0a2430` gradient | Full-bleed ground (on a `class="clip"` bg layer) |
| grid | cyan ~8% opacity | Optional subtle graph paper |
| accent | `#00E5C8` | Titles, borders, topbar marks |
| positive | `#3DFFB5` | Stats, wins, efficiency |
| warn | coral / pink border | Constraints (e.g. region limits) |
| memo | gold border `#E6BE28` | Callout / "KEY POINT" boxes |
| ink | `#E8F7F7` / muted `#a8c8c4` | Body text ladder |

### Persistent chrome (every frame)

1. **Top bar** (full width, ~56px)
   - Left: live dot + series title (product / series name)
   - Right: status label (`OFFICIAL`, `FLAGSHIP`, release tag)
   - 1px accent hairline under bar

2. **Main stage** (between top bar and bottom chrome)
   - **Left column (~50–55%)**: badge → large title → 1–2 lines body → optional source
   - **Right column (~45–50%)**: panel grid — roles, stats, pills, progress bars, warnings, CTA stack
   - Stagger right-column cards to VO cues (not all at t=0)

3. **Bottom summary box** (left/right inset ~40px, ~110px min height)
   - 1.5px accent border, dark translucent fill, soft accent glow
   - 1–2 lines of **summary copy** (not the full VO sentence dump)
   - This is **designed chrome for readability**, not the karaoke caption track
   - When bottom chrome is used, **skip karaoke captions** or keep them non-colliding (prefer skip)


### Cast avatars (primary) — small dock

**Primary host mode** for JP 解説 / dark-tech dual-column / feature deep-dives: **small circular cast avatars** (Pip & Bolt), not a large full-body figure.

Full rules → [`cast-avatars.md`](cast-avatars.md) + [`assets/mascots/CAST.md`](../assets/mascots/CAST.md).

- Modes: `cast: dual | single | none` (defaults in CAST.md / Step 0)
- Dock: **bottom-left stacked** or **bottom corners**; circle **88–112px**; accent ring; EN/JP nameplate
- Speaking: ring pulse/glow on active host (`speaker: pip|bolt`)
- Assets staged to `assets/images/pip-avatar.png` (+ bolt / mascot alias)

Layout vocabulary:

- `cast dock dual` — Pip + Bolt small circular avatars in the reserved gutter
- `cast dock single` — Pip (or mascot alias) only

### Optional full-body presenter mascot (secondary)

Secondary option when the brief wants a larger host silhouette instead of (or in addition to) the small dock — not the default for dense dual-column explainers:

- Place a **cute full-body / half-body avatar** bottom-right, above the bottom summary box
- Asset: transparent PNG in `assets/images/mascot.png` (Pip alias from skill assets, or generate + chroma-key)
- Size ≤ ~300px tall / max-width ~220px; `right: 8–16px`; `bottom` clears the summary strip (~160–180px); **never cover text**
- Fade/slide in ~0.25–0.5s after frame start; same character on every content frame for consistency
- Prefer **small cast dock** when both would compete for gutter space
- Skip on pure logo stings if the frame is intentionally empty


### Cast / mascot must not cover text (hard rule)

When a cast dock or presenter mascot/avatar is present:

1. **Never place avatars over titles, body copy, stats, cards, pills, or the bottom summary box.**
2. **Safe zone only:**
   - Small cast dock: left (or corner) *gutter* per `cast-avatars.md` — clears bottom summary by ≥12px
   - Full-body: bottom-right *gutter* — typically `right: 8–16px`, `bottom` above the summary chrome (~160–180px), height ≤ ~300px / max-width ~220px
3. **Reserve layout space:** pad the near content column (left inset for stacked dock; right `padding-right` ~180–220px for full-body) so cards and numbers never sit under the character.
4. **Stacking:** avatar z-index below critical text if any overlap is unavoidable; prefer **no overlap at all**.
5. **QA:** contact-sheet check — if any character of readable text intersects an avatar circle, nameplate, or silhouette, **fail** and re-layout.
6. Full-bleed brand stings without body text may allow a larger centered mascot; **content frames may not**.

Wrong: avatar overlapping KEY POINT / price / benchmark numbers.  
Right: dock/mascot in empty gutter while all text remains fully legible.


### Card language

- Role cards: small KEY label + accent title + muted desc
- Stat cards: muted label + large positive number
- Pills: rounded tags for dates, partners, surfaces
- Memo box: gold border for one takeaway
- Warn strip: coral border for caveats
- Progress / token bars: fill animates on VO cue

### Dynamic data-viz & flow (prefer over static cards)

Static cards that pop in and freeze read as slides. When a beat carries data, structure, or a process, prefer a **developing graphic** — something still visibly building or connecting in the back half of the frame:

- **Flow / pipeline diagram** — nodes reveal on their VO cue, then connector edges *draw themselves* between them (`svg-path-draw`); ideal for "input → model → output", release timelines, and architecture beats. The edge draw IS the motion — never show a pre-connected diagram at t=0.
- **Node graph / hub** — a center mark with satellites connecting in one-by-one (surfaces, integrations, model family). Connectors draw after both endpoints exist.
- **Animated comparison bars / ladders** — bars fill sequentially top-down with values ticking up (`stat-bars-and-fills`), never all at once.
- **Count-up hero metrics** — value-scaled counters landing on the spoken number (`counting-dynamic-scale`, scale transform — never `fontSize` tweens, which stutter under seek).
- **Progress flows** — a step strip where each stage lights up and the connecting rail extends as the VO advances.

Pacing rule: at least one graphic element should still be arriving or connecting after the frame's halfway point. A dataviz frame whose chart is fully assembled by ~30% has front-loaded — respread the fills/edges across the VO cues.

---

## Story / content density (Step 3)

For feature / model / API intros, prefer an **explainer cascade** over pure hype:

1. Hook / name the product  
2. Positioning (roles: coding · agentic · knowledge …)  
3. Proof (benchmarks, efficiency bars)  
4. Speed / value claim  
5. Where it works (surfaces: API, CLI, IDE, Office …)  
6. Pricing / limits  
7. CTA  

Each beat's `voiceover` should be **phrase-segmented** so Step 4 can reveal cards on cues. Prefer concrete numbers and surface names over slogans alone.

Japanese VO: short clauses, numbers spoken clearly; on-screen Japanese needs a **shipped CJK font file** in `assets/fonts/` (never system-only CJK families).

---

## Visual design (Step 4)

In `## Video direction`, when using this system, state:

- palette: dark tech explainer (canvas / accent / positive / memo / warn)
- chrome: topbar + dual-column stage + bottom summary box (persistent)
- cast: dual | single | none — when dual/single, `cast dock dual` / `cast dock single` per `cast-avatars.md`
- density: dual-column every content frame; no single-line center slides
- captions: karaoke skipped when bottom summary chrome is present
- negative: sparse white slides, purple AI bokeh, floating empty space, missing bottom summary, cast covering text

Per-frame Scene lines must name **which panel/card reveals on which VO cue**.

Layout vocabulary add-ons (use inline):

- `dual-column explainer` — left title stack / right card grid  
- `stat triad` — three equal metric cards  
- `surface grid 2×2` — API / product / IDE / suite  
- `efficiency bars` — comparison bar chart  
- `bottom summary chrome` — persistent recap strip  
- `cast dock dual` — Pip + Bolt small circular avatars in reserved gutter  
- `cast dock single` — Pip (mascot alias) small circular avatar  

---

## Frame worker (Step 5)

1. Paint ground on a **full-duration `class="clip"` background**, never `#root` background alone.
2. Build **topbar + main + bottomcap** as separate clips (or one stage with absolute chrome).
3. Ship `@font-face` for every family used; JP → `assets/fonts/*.otf|ttf|woff2` with **root-relative** paths (`assets/fonts/...`, never `../../assets/`).
4. Animate with long-tail `power3`; stagger right-column cards to VO; count-up stats when numbers are the payload.
5. Keep interactive content above the bottom chrome; do not hide key stats behind the summary box.
6. Do **not** treat topbar/bottomcap as "forbidden browser chrome" — they are intentional product-explainer UI.

---

## Preset guidance (Step 2)

| Situation | Prefer |
| --- | --- |
| AI model / API / coding agent / Japanese 解説 | Dark tech explainer system above (hand-map tokens into `frame.md` or closest dark/grid preset, then override canvas to dark) |
| Warm enterprise paper brand | `blue-professional` / `claude` — still enforce dual-column density |
| Loud consumer brand | `blockframe` / `coral` — still enforce ≥2 content layers per frame |

**Never** accept a finished product feature video that is only large type on empty canvas.

---

## Checklist before Step 6 render

- [ ] Every content frame has dual-column or multi-card density  
- [ ] Top bar + bottom summary present (or deliberate full-bleed brand sting exception on open/close only)  
- [ ] Numbers/stats animate or reveal on VO  
- [ ] Contact sheet does not look like empty white slides  
- [ ] CJK font files present when Japanese is on screen  
- [ ] lint clean for font paths and asset roots
- [ ] Cast dock present when Video direction says `cast: dual|single` (per `cast-avatars.md`)  
- [ ] Cast dock / mascot (if any) does not cover titles, stats, cards, or bottom summary — gutter only  
