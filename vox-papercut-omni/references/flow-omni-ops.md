# Flow / Omni Operations

How takes actually get made. The **manual flow pack is the baseline contract** — it always works, needs nothing installed, and defines the file interface. `gflow-cli` is an accelerator that automates the same contract.

## 1. The contract (both paths)

Per shot: **in** = cropped poster (`posters/s{beat}{shot}-crop.png`) + motion prompt + model tier + aspect + shortest available clip length ≥ the shot's SSOT duration. **out** = one mp4 at `takes/s{beat}{shot}-t{n}.mp4` (`t{n}` = attempt number). The SSOT records which take was accepted. Assembly (SKILL.md §9) reads only `takes/` + the SSOT — it never knows which path produced the files.

Model tiers: previz on the account's cheapest tier, finals on its best — but **the lineup is account-dependent; run `gflow models` (or check the Flow UI) at session start and write the actual tier names into the SSOT**. Verified example lineup in §6: there was no plain "Omni" at all — `omni-flash` was both the cheap tier and the only 10 s-capable model, with `veo-quality` as the 8 s quality tier. Takes are trimmed from in-point 0 at assembly, so extra tail is fine and extra head is not.

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
1. **Discover, never guess.** Read its SKILL.md / `--help` output at runtime for the actual subcommands and flags (auth/session, model selection, frames-to-video, download). The CLI drives the Flow web app, so expect a login/session step on first use — surface it to the user rather than automating credentials (`gflow auth login` is one-time interactive; after that, profile cookies run headless).
2. **Map the §1 contract** onto whatever the surface is: start frame, prompt, tier, aspect, length in; download out; rename the download to the take contract yourself if the CLI names differently.
3. **Generate in rounds, not all at once**: style-proof (1 clip) → previz batch → finals batch, QC between rounds. On any CLI failure mid-batch, fall back to emitting the pack for the remaining shots instead of retrying blind.

## 4. Credits discipline

- Every generation costs Flow credits; Flash costs a fraction of Omni finals. The three-checkpoint structure in SKILL.md §7.4 exists to make the cheap tier absorb all iteration.
- Before the finals batch, estimate `shots × 1.3 × credits-per-Omni-clip` (0.3 = expected re-roll rate) and compare against the brief's budget; on overrun, stop and ask.
- Log actual takes generated per tier in the SSOT — the number is the ground truth for "did we stay in budget", and the next project's estimate.

## 5. Refusals and other stops

- **Real people / brand logos**: Omni refuses them. This is resolved at brief time (SKILL.md §7.5) — a refusal during generation means that gate was missed; go back and redesign the beat or move the project to vox-director's Kling path.
- **Persistent queue stalls / errors in Flow**: switch that shot to the manual pack and keep moving; never leave a shot with no accepted take silently — every shot ends the session either accepted in the SSOT or listed as blocked with its reason.

## 6. Verified surface (gflow-cli v0.43.0, checked 2026-07-24)

Empirical snapshot from a real generation — re-verify with `gflow --help` / `gflow models`, since both the CLI and the account's model lineup move:

- Generation: `gflow video t2v|i2v|r2v "<prompt>"` with `--model <alias>`, `--duration 4|6|8|10` (10 only on `omni-flash`), `--aspect 9:16|16:9`, `--count 1-4`, `--out-dir <dir>`, `--json` (machine-readable result with `local_path`, `generation_status`); `gflow video chain` renders an I2V chain from a manifest. `--project <id>` reuses one Flow project instead of scratch projects.
- **Video aspects are 9:16 and 16:9 only** — a 1:1 deliverable must be generated 9:16 and cropped at assembly.
- Model lineup seen: `omni_flash` (alias `omni-flash`, ref cap 7, max 10 s) + `veo_3_1_lite|fast|quality|lite-lp` (max 8 s; `veo-quality` ref cap 0 = no reference images).
- Auth: named profiles (`gflow auth status|login|use`); drives Chrome via Playwright headlessly with saved cookies. An info-level `cookie_decryption_failed_falling_back_to_playwright` line is normal, not an error.
- Observed timing: one 10 s omni-flash T2V ≈ 60–90 s wall clock, submit → poll → mp4 downloaded to `--out-dir` under the media id; rename to the take contract afterwards.
- Long continuous pieces: `gflow video chain manifest.jsonl` (JSONL, one `{"prompt": …}` per link) — link 0 t2v, links 1+ i2v seeded from the previous clip's last frame. **Veo 3.1 tiers only** (omni-flash silently drops the seed frame and is rejected), so 8 s/link; 1 credit/link; always `--dry-run` first; `--seed-offset 250` guards against fade-dark seed frames. Before the first paid run, verify the chain extras are importable (`python -c "import PIL, av"` in the CLI's venv) — the uv tool install ships without them, Pillow's absence kills even dry-run, and PyAV's absence kills the run AFTER link 0 is paid with no resumable state.
