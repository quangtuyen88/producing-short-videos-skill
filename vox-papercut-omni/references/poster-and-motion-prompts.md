# Poster & Motion Prompt Grammar

The two prompts that decide everything: the **poster prompt** (gpt-image-1 — the look is born here) and the **motion prompt** (Flow Omni — makes it move like collage, not like a pan). Prompt structures adapted from the `vox-director` skill's prompt guide (MIT), re-tuned for gpt-image-1 stills and Flow Omni image-to-video.

---

## 1. Poster prompt (gpt-image-1)

Five parts, in order. Part 1 is the SKILL.md §5 style lock, **byte-identical on every shot**.

```
[1 STYLE LOCK]  <the §5 block, verbatim>

[2 SCENE — separate cut-out pieces]
  SCENE as layered paper cut-outs: {main subject}, {a prop}, {a text strip or map
  fragment}, {a decorative scrap}; each piece has clear cut edges, its own drop
  shadow, and sits on its own layer.

[3 BACKGROUND]
  on a bold flat {BG color} paper background.

[4 HEADLINE — wide shots only]
  A torn-paper banner with a big bold headline "{HEADLINE}" in bold condensed
  grotesque type, plus a small red seal. (Detail shots: omit this part entirely.)

[5 TECH + SAFE ZONE]
  All elements and the headline composed well inside the central area; outer
  margins are plain background. High detail, print-quality.
```

Techniques (each fixes a specific failure):
- **Distinct pieces with edges + shadows** — this is what lets Omni parallax layers later; a blended scene can only pan as one flat plane. If a poster comes back blended, re-roll the poster; no motion prompt can fix it.
- **Headline baked in, short, in "quotes"** — image models render crisp text, video models smear it. 2–3 words.
- **One bold flat background color per beat** — busy backgrounds muddy the silhouettes and kill the Vox punch.
- **Texture constant, color travels** — same edge roughness and halftone density across all beats; only the palette moves with the story.

### gpt-image-1 specifics

- Sizes: **1024×1024 / 1536×1024 / 1024×1536 only** — compose for the SKILL.md §6.2 center-crop; the safe-zone sentence in part 5 is mandatory for 9:16 and 16:9 targets.
- Rate limit ~5 img/min → concurrency ≤3, retry on 429.
- Request through media-use `resolve.mjs` so results freeze into the ledger.

### Worked example — Bạch Đằng 1288, hook beat, wide (9:16)

```
Mixed-media hand-cut PAPER COLLAGE, editorial Vox-explainer zine style. Torn and
scissor-cut paper edges, tape corners, halftone print dots, newspaper clippings,
paper-stencil shapes, real paper drop shadows. Figures are PRINTED-texture
cut-outs of real imagery (photo / woodblock / engraving), NOT CGI, NOT a 3D
render — keep print grain and paper imperfections. High-contrast, flat even
scanned-document light. SCENE as layered paper cut-outs: a woodblock-print war
junk tilting into halftone waves, a row of sharpened wooden stakes cut from
kraft paper rising from the water, a torn map fragment of a river delta, three
red arrow scraps pointing downriver; each piece has clear cut edges, its own
drop shadow, and sits on its own layer. On a bold flat deep-indigo paper
background. A torn-paper banner with a big bold headline "SÔNG NUỐT HẠM ĐỘI" in
bold condensed grotesque type, plus a small red seal. All elements and the
headline composed well inside the central area; outer margins are plain
background. High detail, print-quality.
```

### Theme flavor — compact axis banks

Default is the editorial Vox zine above. To flavor a topic, swap one term per axis; the paper DNA in the style lock never changes.

| Axis | Bank (pick one) |
|---|---|
| Era/movement | Swiss Typographic · Constructivist · WPA poster · punk zine · 1950s pulp · atomic-age · woodblock/ink (East Asian topics) |
| Palette | limited 2–3 color · duotone + red accent · riso pink+blue · '70s mustard/rust · cream/kraft base · neon-on-black |
| Type style | bold condensed grotesque (default) · wood-type slab · stencil · ransom-note cut-out letters · brush + red seal |
| Finish | halftone (default) · riso misregistration · photocopy · letterpress deboss · newsprint · aged/foxed paper |

Example combos: Vietnamese history → woodblock/ink + cream/kraft + brush-and-seal + aged paper. Tech explainer → Swiss + duotone-red + grotesque + clean halftone. Music/counterculture → punk zine + B&W+spot color + ransom-note + photocopy.

---

## 2. Motion prompt (Flow Omni, image-to-video)

Five axes plus constraints. **Positive phrasing only** — Omni treats "no/don't X" as a suggestion of X; every constraint below is worded as the target state.

```
[GOAL]      Animate this still into a flat 2D mixed-media paper-collage MOTION
            GRAPHIC; everything stays cut paper.

[CAMERA]    one smooth continuous {slow push-in | lateral parallax pan | slow
            rise | locked-off} for the whole shot, camera parallel to the poster.

[MOVEMENT]  layered paper cut-outs drift at different depths with visible
            drop-shadow parallax; {2–3 named elements} {bob | sway | slide |
            flutter | pulse} gently; halftone dots shimmer subtly. Very subtle
            amplitude near the headline.

[FEEL+COLOR] {this beat's feel — e.g. ominous, building} ; {this beat's palette},
            high contrast, print grade held throughout.

[CONSTRAINTS] the printed headline, seal, and layout stay sharp, legible, and
            perfectly still; every piece present in the still remains exactly
            itself; single continuous shot, one camera move, steady pacing
            start to finish.
```

Rules that keep Omni honest:
1. **Describe motion, not the picture** — the still already carries subject/text/style; restating them makes the model re-synthesize (and warp) them.
2. **One camera move + a few named element motions.** Multiple simultaneous camera moves = instability.
3. **Amplitude small**: `very subtle` / `gentle` / "~5% movement" near any text region.
4. **MOVEMENT is the parallax lever** — name "layered cut-outs at different depths with drop-shadow parallax" explicitly or Omni slides the whole frame.
5. **Trim-aware endings**: motion continuous and steady so any out-point cuts clean. Only payoff/finale shots (which play to their natural end) get "…then every piece settles into place."
6. **Detail shots (no headline) may go bolder** — bigger drift, a hero element sliding across — but still one smooth move, still flat 2D.

### Worked example — animating the Bạch Đằng hook poster

```
Animate this still into a flat 2D mixed-media paper-collage MOTION GRAPHIC;
everything stays cut paper. One smooth continuous slow push-in toward the
sinking junk for the whole shot, camera parallel to the poster. Layered paper
cut-outs drift at different depths with visible drop-shadow parallax; the
halftone waves slide slowly leftward, the war junk tilts a few degrees deeper,
the three red arrows pulse once in sequence; halftone dots shimmer subtly. Very
subtle amplitude near the headline. Ominous and building; deep indigo with
kraft and vermilion accents, high contrast, print grade held throughout. The
printed headline, seal, and layout stay sharp, legible, and perfectly still;
every piece present in the still remains exactly itself; single continuous
shot, one camera move, steady pacing start to finish.
```

---

## 3. Symptom → fix table (use during §7.6 take QC)

| Symptom in the take | Fix (targeted, one axis) |
|---|---|
| Headline wobbles, smears, or redraws | Amplitude down to "very subtle"; strengthen the stability sentence; move named element motion away from the headline region |
| A flash / jump-cut inside the shot | A snap/whip/quick word slipped in — replace with "one smooth continuous move, steady pacing start to finish" |
| Goes 3D — perspective bends, pieces gain volume | Add the dimensional lock: "flat 2D, camera parallel to the poster, pieces slide as rigid flat paper" |
| Clip loops or ping-pongs | State one direction + steady pacing; for finale shots add the settle endpoint |
| Whole frame pans as one plane — no parallax | The **poster** is too blended: regenerate it with more distinct pieces/edges/shadows (§1). Motion prompt can't create layers that aren't there |
| New objects appear / pieces morph | "every piece present in the still remains exactly itself" — and cut the element-motion list to fewer, calmer verbs |
| Style drifts glossy / CGI mid-clip | Name the textures to hold: "torn edges, tape, halftone, print grain preserved exactly; print grade held throughout" |
| Refusal (real person / logo detected) | Not a prompt problem — resolve per SKILL.md §7.5 (redesign the beat, or route the project to vox-director's Kling path) |

Re-roll ≤2 per shot with one targeted fix each; a third failure means the shot design (usually the poster) is the problem.
