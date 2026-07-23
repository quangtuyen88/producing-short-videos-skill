# Flow / Omni Operations

How takes actually get made. The **manual flow pack is the baseline contract** — it always works, needs nothing installed, and defines the file interface. `gflow-cli` is an accelerator that automates the same contract.

## 1. The contract (both paths)

Per shot: **in** = cropped poster (`posters/s{beat}{shot}-crop.png`) + motion prompt + model tier + aspect + shortest available clip length ≥ the shot's SSOT duration. **out** = one mp4 at `takes/s{beat}{shot}-t{n}.mp4` (`t{n}` = attempt number). The SSOT records which take was accepted. Assembly (SKILL.md §9) reads only `takes/` + the SSOT — it never knows which path produced the files.

Model tiers: `omni-flash` for the style-proof gate and all previz; `omni` for finals only. Typical clip length is ~8 s (confirm the tier's actual options at runtime); takes are trimmed from in-point 0 at assembly, so extra tail is fine and extra head is not.

## 2. Baseline: the manual flow pack

Write `flow-pack.md` in the project dir and hand it to the user:

```markdown
# Flow pack — <project> · <date>
Model: Omni Flash (previz round) | Omni (finals round)
Aspect: 9:16 · Clip length: shortest ≥ the duration listed per shot
For each shot: in Google Flow, start a frames-to-video generation with the
start frame, paste the motion prompt verbatim, generate, download, and save
the file EXACTLY as named below (the pipeline keys on these names).

## s1a — start frame: posters/s1a-crop.png — needs ≥ 3.0 s — save as: takes/s1a-t1.mp4
<motion prompt, verbatim>

## s2a — start frame: posters/s2a-crop.png — needs ≥ 4.6 s — save as: takes/s2a-t1.mp4
<motion prompt, verbatim>
...
```

Re-rolls increment the suffix (`-t2`, `-t3`). After the user drops files into `takes/`, run §7.6 take QC and continue — the pack is re-emitted with only the failed shots for the next round.

## 3. Accelerator: gflow-cli

Pinned: **`ffroliva/gflow-cli/skills/gflow-cli#v0.42.0`** (the skill-finder decision of 2026-07-23; runner-up bridges are logged in skill-finder's rejection log). Adoption is gated by a waxa eval — **if it is not installed, do not install it ad hoc**: use the baseline pack and tell the user the pin + that the waxa gate is pending.

When installed:
1. **Discover, never guess.** Read its SKILL.md / `--help` output at runtime for the actual subcommands and flags (auth/session, model selection, frames-to-video, download). The CLI drives the Flow web app, so expect a login/session step on first use — surface it to the user rather than automating credentials.
2. **Map the §1 contract** onto whatever the surface is: start frame, prompt, tier, aspect, length in; download out; rename the download to the take contract yourself if the CLI names differently.
3. **Generate in rounds, not all at once**: style-proof (1 clip) → previz batch → finals batch, QC between rounds. On any CLI failure mid-batch, fall back to emitting the pack for the remaining shots instead of retrying blind.

## 4. Credits discipline

- Every generation costs Flow credits; Flash costs a fraction of Omni finals. The three-checkpoint structure in SKILL.md §7.4 exists to make the cheap tier absorb all iteration.
- Before the finals batch, estimate `shots × 1.3 × credits-per-Omni-clip` (0.3 = expected re-roll rate) and compare against the brief's budget; on overrun, stop and ask.
- Log actual takes generated per tier in the SSOT — the number is the ground truth for "did we stay in budget", and the next project's estimate.

## 5. Refusals and other stops

- **Real people / brand logos**: Omni refuses them. This is resolved at brief time (SKILL.md §7.5) — a refusal during generation means that gate was missed; go back and redesign the beat or move the project to vox-director's Kling path.
- **Persistent queue stalls / errors in Flow**: switch that shot to the manual pack and keep moving; never leave a shot with no accepted take silently — every shot ends the session either accepted in the SSOT or listed as blocked with its reason.
