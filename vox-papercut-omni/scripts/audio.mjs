import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const skillDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const candidates = [
  path.resolve(skillDir, "..", "media-use"),
  path.join(os.homedir(), ".agents", "skills", "media-use"),
];
const mediaUse = candidates.find((dir) => existsSync(dir));
if (!mediaUse) {
  console.error(
    "media-use sibling skill not found (looked beside this skill and in ~/.agents/skills).\n" +
      "Install it with: npx hyperframes init  (or: npx hyperframes skills update media-use)",
  );
  process.exit(1);
}

const target = path.join(mediaUse, "audio", "scripts", "audio.mjs");
if (!existsSync(target)) {
  console.error(`media-use found at ${mediaUse} but its audio engine is missing: ${target}`);
  process.exit(1);
}

const result = spawnSync(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
