// Preflight checks for the local machine invariants this video pipeline depends on.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const TIMEOUT = 60000;
let pass = 0, fail = 0, skip = 0;

function ok(label) {
  pass++;
  console.log(`[PASS] ${label}`);
}
function bad(label, fix) {
  fail++;
  console.log(`[FAIL] ${label} — fix: ${fix}`);
}
function skipped(label, reason) {
  skip++;
  console.log(`[SKIP] ${label} — ${reason}`);
}
function run(cmd, args) {
  return spawnSync(cmd, args, { timeout: TIMEOUT, encoding: "utf8" });
}
function guard(fn) {
  try {
    fn();
  } catch (err) {
    fail++;
    console.log(`[FAIL] check crashed — fix: investigate exception: ${err.message}`);
  }
}

const home = homedir();
const repoRoot = resolve(new URL(".", import.meta.url).pathname);

guard(() => {
  const label = "gflow CLI present";
  let r = run("gflow", ["--version"]);
  if (r.status !== 0) r = run(join(home, ".local/bin/gflow"), ["--version"]);
  if (r.status === 0 && r.stdout && r.stdout.trim()) ok(label);
  else bad(label, "install gflow-cli (uv tool), expected at ~/.local/bin/gflow");
});

guard(() => {
  const label = "gflow auth";
  const r = run("gflow", ["auth", "status"]);
  if (r.status === 0) ok(label);
  else bad(label, "gflow auth login (cookies expired or missing)");
});

guard(() => {
  const label = "gflow chain extras (PIL, av)";
  const py = join(home, ".local/share/uv/tools/gflow-cli/bin/python");
  if (!existsSync(py)) {
    bad(label, "gflow uv tool env not found at ~/.local/share/uv/tools/gflow-cli");
    return;
  }
  const r = run(py, ["-c", "import PIL, av"]);
  if (r.status === 0) ok(label);
  else
    bad(
      label,
      `uv pip install --python ~/.local/share/uv/tools/gflow-cli/bin/python pillow av — missing PyAV crashes a paid chain AFTER link 0; missing Pillow crashes even --dry-run`
    );
});

guard(() => {
  const label = "OPENAI_API_KEY set";
  if (process.env.OPENAI_API_KEY) ok(label);
  else
    bad(
      label,
      "export OPENAI_API_KEY — gpt-image-1 direct REST is the only working image provider on this machine; rate limit 5 img/min, batch with concurrency <=3 and retry on 429"
    );
});

guard(() => {
  const label = "ffmpeg on PATH";
  const r = run("ffmpeg", ["-version"]);
  if (r.status === 0) ok(label);
  else bad(label, "brew install ffmpeg");
});

guard(() => {
  const label = "ffprobe on PATH";
  const r = run("ffprobe", ["-version"]);
  if (r.status === 0) ok(label);
  else bad(label, "brew install ffmpeg");
});

const marunageDir = join(repoRoot, "marunage-short");
const marunageLink = join(home, ".claude/skills/marunage-short");
guard(() => {
  const label = "marunage-short symlink";
  if (!existsSync(marunageDir)) {
    skipped(label, "marunage-short not present in repo");
    return;
  }
  if (!existsSync(marunageLink)) {
    bad(label, `ln -sfn ${marunageDir} ~/.claude/skills/marunage-short`);
    return;
  }
  if (realpathSync(marunageLink) === realpathSync(marunageDir)) ok(label);
  else bad(label, `ln -sfn ${marunageDir} ~/.claude/skills/marunage-short`);
});

guard(() => {
  const label = "marunage ffprobe patch";
  const target = join(marunageDir, "engine/smart-caption/scripts/retime_telop.py");
  if (!existsSync(target)) {
    skipped(label, "retime_telop.py not present");
    return;
  }
  const content = readFileSync(target, "utf8");
  if (content.includes('which("ffprobe")')) ok(label);
  else if (content.includes("/opt/homebrew/bin/ffprobe"))
    bad(
      label,
      "patch -p1 < patches/marunage-retime-telop-ffprobe.patch (run from repo root; needed after every re-extract of the skill zip)"
    );
  else bad(label, "unexpected retime_telop.py content — inspect manually");
});

guard(() => {
  const label = "faster-whisper";
  let r = run("python3.12", ["-c", "import faster_whisper"]);
  if (r.error) r = run("python3", ["-c", "import faster_whisper"]);
  if (r.status === 0) ok(label);
  else
    bad(
      label,
      "python3.12 -m pip install faster-whisper (mlx-whisper is impossible here: python3.12 is x86_64, mlx is arm64-only)"
    );
});

guard(() => {
  const label = "hyperframes";
  const pkgPath = join(process.cwd(), "package.json");
  if (!existsSync(pkgPath)) {
    skipped(
      label,
      "not in a hyperframes project (reminder: never npx hyperframes; local install with --ignore-scripts, run node node_modules/hyperframes/dist/cli.js)"
    );
    return;
  }
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (!deps.hyperframes) {
    skipped(
      label,
      "not in a hyperframes project (reminder: never npx hyperframes; local install with --ignore-scripts, run node node_modules/hyperframes/dist/cli.js)"
    );
    return;
  }
  const cli = join(process.cwd(), "node_modules/hyperframes/dist/cli.js");
  if (!existsSync(cli)) {
    bad(
      label,
      "npm i -D hyperframes@0.7.44 --ignore-scripts — npx hyperframes is broken under fnm node v24 — always run node node_modules/hyperframes/dist/cli.js"
    );
    return;
  }
  const r = run("node", ["-e", "require('sharp')"]);
  if (r.status === 0) ok(label);
  else
    bad(
      label,
      "reinstall with --ignore-scripts; prebuilt @img/sharp-darwin-arm64 works, sharp's install script does not"
    );
});

console.log(`${pass} pass, ${fail} fail, ${skip} skip`);
process.exit(fail > 0 ? 1 : 0);
