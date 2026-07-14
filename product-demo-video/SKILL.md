---
name: product-demo-video
description: "House-style template for producing high-craft kinetic product demo/promo videos with high reproducibility, importing the real product's design 1:1 from its codebase and/or live public site. Use when asked to create a product intro/demo/promo video, design its motion, structure the video, localize it (e.g., an English version), render it, or QA it. Also covers the long-form VOICEVOX dialogue-explainer style (ずんだもん解説: two character hosts, bottom speaker band, dark slides — §12) when the brief or a reference video asks for it. Generic across any service or product. On activation, always start by interviewing the user for the minimum brief."
---

# Product Demo Video — House-Style Template (Generic)

> **Two house styles.** §1–§11 define **Mode A: kinetic demo** (25–45 s, light palette, type-driven). **§12 defines Mode B: long-form dialogue explainer** (VOICEVOX character duo, dark slides, bottom speaker band, 2–15 min). Pick the mode from the brief/reference video during the #1 interview; Mode A's anti-patterns (§3) bind only Mode A.

> Creative direction for reproducibly mass-producing high-craft "kinetic product demo videos" for **any service or product**.
> **The technique (craft) is universal; the skin (brand) is swappable.** Fill in the brief in #1 and run the audit in §4 to import the real product's design, and the same quality, motion language, and structure can be reproduced for a different product.
> **Mode A is self-contained in this file**: interview → audit → storyboard → implementation → QA → rendering → delivery are all included. Mode B (§12) additionally depends on the sibling `product-launch-video` skill for its style contract and VOICEVOX client — §12 states the existence gates.

> ⚙️ **First behavior at runtime (important)**: when this skill activates, do not start building immediately. **First interview the user for the items in "#1 Brief"**. Skip items already known from the conversation context, and **do not proceed to storyboard or implementation until the missing ★ items (the minimum set) are filled**. Bundle questions concisely into 1–4 questions via `AskUserQuestion` or similar. Once the ★ items are complete, proceed to the audit in §4; fill the remaining items from the audit results and drafts, and confirm only the key points with the user.

---

## 1. Brief (interview the user and fill this in first)

`★` = the **minimum set that must always be asked first**, even with no context. Fill the rest via the §4 audit plus drafts, confirming key points.

```
★ Target product / repository location or public URL (used for the §4 audit; if both exist, both):
★ Features to show (the features to pitch and their order. 1 feature = 1 beat group):
★ Target duration / language(s) (e.g., 30 seconds / EN+JA):
★ Distribution target / purpose (LP embed / social, etc. — affects duration, aspect, compression):

  Brand tokens (§6; if unspecified, extract in §4 from the code + public site):
    INK= / ACCENT_GRADIENT= / PRIMARY= / PAPER= / DISPLAY_FONT= / LOGO= / BRAND_IMG=
  Core sentence (the real one-liner typed in B1; must match a real UI sample):
  Kinetic couplets (one accent word per line, used as interludes between feature beats):
    -
    -
  Tagline / URL (outro):
  (Optional) Reference video to emulate → decompose with the 6 lenses in §5 and map its techniques:
  Output ID / output path / distribution target (where locale branching is applied):
  Existing compositions protected by non-regression:
```

---

## 2. How to Use

1. **Interview for #1** (★ items first).
2. **§4**: audit the real product — extract the design system (colors, typography, logo, components, copy) from the **codebase** if available and from the **live site** if a public URL is available.
3. Fill **§6 brand tokens** and the remaining #1 items with the results.
4. **§3 production philosophy** and **§7 motion design** are the **immutable constitution**. Use the numbers, spring values, and transition conventions as-is.
5. Decompose an admired video with the **§5 reference-analysis method** and map any missing techniques (optional; for raising the flavor).
6. Assign the beat skeleton in **§8** to the features being shown, and implement through delivery with the steps in **§11**.

---

## 3. Production Philosophy (immutable principles)

**Target texture**: "one element per screen — huge — centered — kinetic typography states the *meaning* outright — whip transitions between beats — real UI shown as giant crops". Fast cuts, light texture, ~25–45 seconds.

**Never do (anti-patterns)**:
- Full-screen 1:1 screenshots (text too small, information overload, monotonous)
- Explaining the story with caption bars (the picture isn't doing the talking)
- Uniform fade/slide-only transitions (no energy)
- Padded duration
- Hand-drawn approximations of logos/illustrations, glow decorations behind logos, or other "embellishment"
- Hype, exaggeration, emoji-decorated copy
- Imitating the reference creator's signature, proprietary assets, or signature phrasing (borrow only the technique; make the expression your own)

---

## 4. Real-Product Audit → Make the Design "Fully Consistent" [most important — do first]

Before writing the storyboard, **extract the target product's real design system** and align the video's design to the level where it is **indistinguishable** from the real product (same tokens, same copy, same components, same logo). Skip this and you get "something that looks similar but is a different thing". There are two source families; **if both exist, use both and cross-check**.

### (A) Codebase audit (when a repository is available)
Dispatch a read-only subagent (Explore or similar) at **very thorough**, and collect **primary evidence with file:line references**.
1. **Design-token extraction**: harvest **color hex values, spacing, radii, shadows, typefaces, gradients** as real values from `tailwind.config.*` / theme / CSS variables / `docs/*design*`.
2. **Verbatim UI copy**: collect the labels/buttons/placeholders of the screens being shown from the `locale` branches, **per language, character-for-character, with file:line**. Never write from imagination.
3. **Component-appearance transcription**: copy the classes, proportions, and states (active/hover/disabled) of the UI components being shown (cards/pills/tabs/toggles/chat/loading, etc.) exactly. **Even when enlarged, proportions and tokens stay true to the real thing.**
4. **Identify real brand assets**: use the logos, hero illustrations, and background images under `public/` or equivalent.

### (B) Public-site audit (when a live product URL exists — colors and logo come from the real thing)
Use browser automation (e.g., Claude-in-Chrome `navigate`/`read_page`/`javascript_tool`/`computer`) or WebFetch to harvest from the **actually rendered appearance**. Post-build real values are what users truly see, so treat this as the source of truth.
1. **Colors (real)**: pull CSS custom properties (`--color-*` etc.) via `getComputedStyle(document.documentElement)`, plus **computed values** of `color`/`background`/`border`/gradients on key UI elements. Additionally take a screenshot and eyedrop the key colors at the pixel level to cross-verify. → `{{INK}}`/`{{ACCENT_GRADIENT}}`/`{{PRIMARY}}`/`{{PAPER}}`.
2. **Typography (real)**: confirm the effective `font-family`/`font-weight` as computed values (down to web-font name and weight). → `{{DISPLAY_FONT}}`.
3. **Logo (real)**: identify the header `<img>`/inline `<svg>` logo, `link[rel~=icon]`, and `meta[property=og:image]`, and **download the real files from their URLs** (both light/dark variants if both exist; SVG as-is, raster at high resolution). → `{{LOGO}}`. Hand-drawn approximation is forbidden; always use the real logo.
4. **Signature assets / backgrounds (real)**: obtain the real images/backgrounds of the hero and feature sections (gradient images/illustrations/video). → `{{BRAND_IMG}}`.
5. **UI copy (real)**: harvest the real labels/buttons/placeholders shown on screen while switching languages, and cross-check against the locale branches from (A).

### Integration, precedence, finishing
- If (A) and (B) disagree, **prefer (B) live rendered values** (the post-build reality), and supplement naming/structure from (A) code. If neither exists, harvest from brand guidelines / screenshots.
- Fill the results into the **§6 tokens** plus `{{LOGO}}`/`{{BRAND_IMG}}`, and consolidate into a **single design-spec SSOT** that serves as the single source of truth for the storyboard and every scene.
- **Consistency check**: place finished frames side by side with the real product (live screen or screenshot) and confirm zero discrepancies in color, copy, components, and logo (§10 quality gate).

> **Goal**: the state where someone says "that card in the video — that's literally a screenshot of the product, right?" Tokens, copy, components, and logo are 1:1 with the implementation / live site.

---

## 5. Reference-Analysis Method (admired video → your product's house style)

**Procedure**: pick one high-quality product video, decompose it with the 6 lenses below → map each technique onto the §6 brand tokens. **Borrow the craft, swap the skin** (do not carry over proprietary colors, logos, copy, or signatures).

| Lens | What to observe |
|---|---|
| Typography | Is the type the "protagonist" (not explanation)? Ultra-bold/huge? One accent word per line? Does repetition or rephrasing carry the value? |
| Transitions | Whips (fast pan + blur) or hard cuts? Are directions aligned so it reads as "one camera move"? |
| Camera/Layout | One element per screen? UI shown as giant crops? Does the camera pan across elements in sequence? |
| Color/Texture | Light design of one brand color + pale ground? Are backgrounds constrained to a few types? |
| Pacing | Seconds per beat? Alternating rhythm of feature beats and typographic interludes? |
| UI staging | Real UI shown huge as-is, operated by a cursor, with text streaming/typing inside the UI? |

**Technique catalog this template already includes** (universal devices extracted with the method above; source-independent):

1. **Kinetic typography speaks the value** — ultra-bold, huge single words/lines switching rapidly, **exactly one accent word per line**. Not explanatory sentences but short fragments (questions, imperatives, couplets). → §6 `ACCENT_GRADIENT` on one word.
2. **Strike through repetition and rephrasing** — hammer synonymous phrases in a matched format (multilingual repetition or couplets). → **kinetic couplets** (§8).
3. **Brand ribbon/blob background** — a large wave/bleed of brand color flowing diagonally, laid under the kinetic type (heavily blurred). → §6 background type (c).
4. **Whip pan + strong motion blur** — exit with ~8f horizontal slide + blur, enter the next from the opposite side. Adjacent beats share direction. → §7.
5. **UI as giant crop + minimal device chrome** — one real UI component at 60–90% of screen width. Browser/device chrome kept minimal (three traffic lights + URL bar at most). → §6 UI tokens.
6. **Streaming/typing text inside the UI** — type into an input with a caret, answers flow into a result card (mixing in accent-colored words). → §7.
7. **Show operation with a giant cursor** — an oversized cursor clicks a real button (with a ring). The cursor always fades out after clicking. → §7.
8. **Light bright palette + fast cuts** — white + one brand color, mix of hard cuts and whips, 1–3.5 seconds per beat. → §7/§8.
9. **The opening is an "empty doorway"** — slam a blank input/search bar on screen and build the world up from there. → §8 B1.
10. **What not to borrow** — never carry over the reference's signature outro, proprietary logo, or proprietary copy; build from your own product's assets and language.

---

## 6. Brand Tokens (variables filled from the §4 audit)

Replace `{{...}}` with the target product's real values. The right column gives **format hints** (formats, not fixed values).

| Variable | Purpose | Format hint |
|---|---|---|
| `{{PRODUCT_NAME}}` | Logo wordmark / outro | Product name |
| `{{INK}}` | Dark color for headings/body | near-black (define a mid gray too if needed) |
| `{{ACCENT_GRADIENT}}` | The kinetic accent word & emphasis (text-clip) | 3-stop gradient (light → mid → dark) |
| `{{PRIMARY}}` | Pill borders / spinners / toggle ON | Single primary brand color |
| `{{PAPER}}` | Pale ground | The primary color diluted to a pale tint |
| `{{DISPLAY_FONT}}` | Kinetic typeface | Ultra-bold (900) display face |
| `{{CARD}}` | UI card look | White rounded corners + soft shadow, thin border |
| `{{PILL}}` | CTA/pills | rounded-full; accent-outline pill = border & text `{{PRIMARY}}` + background `{{PAPER}}` |
| `{{BG_A/B/C}}` | The 3 backgrounds | (a) white (b) `{{PAPER}}` + faint accent grid paper (c) accent-family pastels blurred large into ribbons/blobs |
| `{{LOGO}}` | Real logo (light/dark) | The real logo obtained from the live site in §4(B) |
| `{{BRAND_IMG}}` | Real signature illustration etc. | Production real asset |
| `{{TAGLINE}}` / `{{URL}}` | Outro | One-line tagline / product URL |

**Immutable rules**: use real assets (hand-drawn approximation forbidden) / signature images are visible from frame one (no delayed fade-in) / backgrounds limited to the 3 types above / UI text ≥ 24px at 1080p equivalent (annotations ≥ 16px).

---

## 7. Motion Design (universal numbers — use as-is)

- **Springs**: entrance (slight bounce) `{ damping: 18, mass: 0.8, stiffness: 160 }` / settle `{ damping: 200 }`
- **Kinetic words**: scale `1.15→1.0` + y `+30→0` + opacity, **staggered 3–4f per word**. `{{ACCENT_GRADIENT}}` on one word only.
- **Whip pan** (self-contained within the scene): in the final ~8f, exit with `translateX(-120→-1600px equivalent)` + `blur(12→20px)` + slight scale, dropping opacity / enter the next scene's first ~8f from the opposite direction. **Adjacent beats share direction = one camera move.** Where you want a break, use a hard cut. Handle it yourself rather than relying on a library's TransitionSeries or similar.
- **Giant cursor**: OS-style pointer ~90px with drop-shadow, ring on click. **Always fade the cursor out after clicking** (a leftover cursor is a frequent bug). One cursor per beat.
- **Typewriter**: with caret, typed at a `cps` rate. On finish, sweep an `{{ACCENT}}` underline left → right. When localization changes character counts, inject a "cps that pins the type-completion frame" so downstream frame alignment holds.
- **UI wireframe draw-on**: an accent dot draws lines assembling the UI's skeleton via `stroke-dashoffset` → labels stamp in.
- **Loading is a brand moment too**: logo pill + progress label + scanning beam + checkmarks lighting up. Never a plain spinner.
- **Determinism (mandatory)**: `Math.random` / `Date.now` / argument-less `new Date` are forbidden. Fake randomness by index.

---

## 8. Video Structure (universal template)

**Rhythm**: 1 beat = 1 message = **2–3.5 seconds**, 30fps, 25–45 seconds total. Alternate "**feature beat → kinetic-couplet interlude**". Immediately after showing real UI as a giant crop, one ultra-bold kinetic line states the meaning outright.

**Kinetics come as couplets** (matching the form makes them land; `{{ACCENT}}` on one word only):
- Line them up in the pattern "⟨action X⟩, with ⟨means Y⟩." — imperatives, questions, or outcomes also work
- Localized versions follow each language's punctuation (English uses `, .` rather than `、。`, quotes as `" "`). Keep the couplet structure.

**Beat skeleton (swappable slots)**:

| # | Role | Content (assign per feature) | Transition |
|---|---|---|---|
| B1 | hook | Blank input/search bar shown huge → the `{{core sentence}}` typed rapidly with a caret → giant cursor submits | Whip |
| B2 | pain | Kinetic couplet posing the problem (one `{{ACCENT}}` word) | Hard cut |
| B3 | structuring | Loading as a brand moment (logo pill + progress + checkmarks lighting up) | Whip |
| B4 | promise | Typewriter for the one-line value statement (accent underline sweep on finish) | Hard cut |
| B5 | wireframe | Accent dot draws the main UI skeleton in lines → labels stamp in | Continuous |
| B6 | core-fill | Generation/data flows into the skeleton. **Camera pans 2–3 times** across the main elements as giant crops | Whip |
| Nx | feature | Real UI (tab/card/toggle etc.) shown huge → operated by cursor → one kinetic couplet line | Hard/Whip |
| … | (repeat Nx per feature) | Alternate feature beats ↔ kinetic interludes | |
| B(last-1) | share/outcome | Outcome or sharing in one action (toggle ON → link → "Copied", etc.) | Whip |
| Blast | outro | Real logo springs in + `{{TAGLINE}}` + `{{URL}}` pill, hold the final frame | — |

When trimming or extending duration, add/remove feature beats **in 1-beat = 1-message units** and never break mid-sequence frame alignment.

---

## 9. Copy Norms (universal)

- **Facts only.** No hype, exaggeration, or emoji decoration.
- **Faithful to the real UI**: tab names / button names / labels / placeholders are **transcribed character-for-character** from the strings harvested in §4 (per language for localized versions). Never write from imagination.
- Copy is never written directly into scenes; consolidate it in a **content SSOT file**.
- For immature features (beta/alpha etc.), follow the real UI's labeling unless instructed otherwise.

---

## 10. Quality Gates (the guardians of "flavor" — all must pass before shipping)

- [ ] **1:1 with the real product** (colors, tokens, copy, components, logo match the implementation / live site; zero discrepancies side-by-side with screenshots) ← the §4 check
- [ ] One element per screen, huge, centered (no clutter)
- [ ] Main elements ≥ 24px / annotations ≥ 16px; zero overflow, tofu glyphs, or overlaps
- [ ] Kinetics have one accent word per line and hold together as couplets
- [ ] Whip directions of adjacent beats match = one camera move
- [ ] Cursors fade out after clicking (none left behind)
- [ ] No glow behind logos / hand-drawn approximations / caption bars / emoji decoration
- [ ] Real assets used (logo obtained from the live site), signature images visible from frame one
- [ ] Clearance between kinetic type and UI ≥ 40px (even at the closest frame of entrance animations)
- [ ] Determinism (no Math.random / Date.now)
- [ ] No reference-source signatures / proprietary assets / proprietary copy carried over
- [ ] Non-regression on existing compositions (verify via still hashes if shared components were touched)

---

## 11. Implementation, QA, Finishing (complete with these steps)

The reference implementation stack assumes Remotion (React/TS). The principles port to other tools.

1. **Real-product audit** (§4) → produce the design-spec SSOT (code + public site).
2. **Storyboard = SSOT**: one sheet with the beat table (key / duration in frames / content / transition direction) + the copy SSOT. When numbers move during implementation, always update it.
3. **Implement in isolation**: isolate via git worktree or similar so the main working tree stays clean. Do not carelessly run dependency installs or build scripts on the isolated side (configurations that symlink-share node_modules can suffer purge accidents). Do not break existing compositions. If touching shared components, enumerate the blast radius first.
4. **Still QA**: output each beat's start/middle/end plus every beat boundary ±4f via `remotion still … --frame=N` → **always downscale before viewing** (`sips -Z 800` or similar; reading raw 1920px directly blows up requests). Check color/copy/component/logo consistency side-by-side with real UI screenshots. Loop: break → fix → re-check.
5. **Full render → director review**: review the whole via contact sheets (`ffmpeg -i out.mp4 -vf "fps=1,scale=480:-1,tile=4x4" sheet%02d.jpg`), and only suspicious spots as high-res singles (`ffmpeg -ss T -i out.mp4 -frames:v 1 -vf scale=960:-1 k.jpg`). Ground-truth duration via `ffprobe -select_streams v:0 -count_frames -show_entries stream=nb_read_frames` (container-reported duration has rounding error).
6. **Finish & deliver**: web compression `ffmpeg -i in.mp4 -c:v libx264 -crf 23 -movflags +faststart -pix_fmt yuv420p -an out.mp4` (1080p, ~4MB target) → place at the distribution target (`public/` etc.) → branch per locale for multilingual output → gate on the preview environment's successful build and real asset delivery before production.

---

## 12. Mode B — long-form dialogue explainer (VOICEVOX character duo)

The other house style: dark slide-based 解説 with two VOICEVOX hosts talking over dense
animated panels — the ずんだもん解説 format. Choose it when the brief says character
commentary / ずんだもん / ゆっくり系, or the reference video shows a bottom speaker band.
Canonical style contract (palette hexes, chrome geometry, layout patterns, parity
checklist): `../product-launch-video/references/dialogue-explainer.md` — read it before
building; the summary below is Remotion-specific wiring. Stack stays Remotion; §11's
implementation/QA loop applies unchanged.

**Format**: 1920×1080@30, 2–15 min, hard cuts between slides. JA first-class; the EN
variant reuses the same compositions with translated copy, EN nameplates, EN TTS.

**Visual system** (vs Mode A this is inverted — dark, panel-based, band-driven):

- Canvas `#0f162a`→`#171e30` gradient + faint diagonal hatch + vignette; panels `#050b16`
  with 1px `rgba(255,255,255,0.10)` border, radius 8–10px. Bold CJK gothic (bundle the
  font via `@remotion/google-fonts` or a local file — never system-only), monospace for
  scores/code. Accents: gold `#ffd24a`, cyan `#35d4e0`, green `#1bcc8c`, pink `#ff6da3`,
  red `#ff5c5c`, blue `#4a90e2`.
- **Bottom dialogue band on every spoken frame** (values at 1920×1080): full-width strip
  inset ~120px, height ~190px, near-black translucent, 2px light border; speaker avatar
  circle ~160px on the left edge with a name pill under it (host-A yellow-green, host-B
  pink); one bold 56–64px line, ≤2 rows, inline color emphasis on key numbers. Avatar +
  name + text swap exactly on audio turn boundaries. This band is Mode B chrome — it is
  not the §3-banned "caption bar storytelling".
- **Content slides**: top-left accent bar (12×52px, section color) + 56–60px bold title;
  top-right muted breadcrumb (~30px). **Hero/title slides**: no header; kicker → two-tone
  headline → gold subtitle; `VOICEVOX: <hosts>` credit top-right on the first frame
  (mandatory when VOICEVOX voices are used). **Outro**: summary panels + credits
  (sources, 音声, 立ち絵 author if third-party art, 制作).
- Layout patterns per slide: two-col diagram (animated payload) / chart panel /
  submission-code card / ranking table / dual timeline. A slide persists across 3–8
  dialogue turns with staged reveals; never one slide per sentence.

**Audio pipeline**:

1. Write the dialogue as `SCRIPT.md` in the launch-video shape (`## Line N — label
   (Frame M)`, `speaker: zundamon|metan`, indented spoken text).
2. Local VOICEVOX engine (Docker `voicevox/voicevox_engine:cpu-latest`, port 50021), then
   `node ../product-launch-video/scripts/voicevox-tts.mjs generate --script ./SCRIPT.md
   --outdir ./public/audio --out ./src/audio_meta.json` (gate on the script's `check`
   mode first; skill installs may place the sibling elsewhere — resolve the path before
   running). Default voices: ずんだもん=3, 四国めたん=2.
3. In Remotion, derive all timing from `audio_meta.json`: one `<Sequence>` +
   `<Audio src>` per turn at `start×fps`, slide durations = sum of their turns' spans,
   band content keyed by the active turn. Never hand-time against the audio.
4. EN variant: translate turns (numbers/IDs verbatim), synthesize with two distinct EN
   voices from the standard TTS chain (e.g. Kokoro `af_heart`/`am_michael` offline),
   regenerate the meta shape, re-render the same compositions; drop the VOICEVOX credit.

**Character licensing**: VOICEVOX character voices/names require the credit line;
likeness art (立ち絵) is third-party — user-supplied with artist credit, or original
avatar art. Never bundle third-party art.

**Mode B quality gates** (replace §10's Mode-A-specific items; §11 QA loop still applies):

- [ ] Every parity-checklist item in `dialogue-explainer.md` passes on the contact sheet
- [ ] Band swaps align with audio turn boundaries (spot-check 3 turns at ±2 frames)
- [ ] No tofu — CJK font bundled and loaded before render
- [ ] Slide durations derived from `audio_meta.json`, not hand-timed
- [ ] Credits frame lists 音声/制作 (and 立ち絵 when third-party art is used)
