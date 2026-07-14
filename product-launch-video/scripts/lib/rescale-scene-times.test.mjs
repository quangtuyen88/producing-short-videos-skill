import { test } from "node:test";
import assert from "node:assert/strict";
import { rescaleSceneLine, isSceneLine } from "./rescale-scene-times.mjs";

// Regression: Scene windows are authored in Step 4 against an ESTIMATED frame
// duration (audio runs in parallel). sync-durations later rewrites the frame's
// total duration to the real voice length but left the Scene windows at their
// estimated positions, so in-frame reveals drifted against the spoken cue.
test("rescaleSceneLine scales both window bounds by the duration ratio", () => {
  const line = "Scene 2 (1.2–3.4s): the camera pushes THROUGH the ring";
  assert.equal(
    rescaleSceneLine(line, 1.5),
    "Scene 2 (1.8–5.1s): the camera pushes THROUGH the ring",
  );
});

test("rescaleSceneLine keeps an `end` bound literal", () => {
  const line = "Scene 3 (3.4–end): hold the read";
  assert.equal(rescaleSceneLine(line, 2), "Scene 3 (6.8–end): hold the read");
});

test("rescaleSceneLine accepts hyphen and em-dash separators", () => {
  assert.equal(rescaleSceneLine("Scene 1 (0.0-2.0s): open", 0.5), "Scene 1 (0-1s): open");
  assert.equal(rescaleSceneLine("Scene 1 (1.0—2.0s): open", 2), "Scene 1 (2—4s): open");
});

test("rescaleSceneLine leaves non-Scene lines and ~1.0 ratios untouched", () => {
  const meta = "- duration: 5.0s";
  assert.equal(rescaleSceneLine(meta, 1.5), meta);
  const scene = "Scene 1 (0.0–1.2s): opener";
  assert.equal(rescaleSceneLine(scene, 1.0004), scene);
  assert.equal(rescaleSceneLine(scene, NaN), scene);
  assert.equal(rescaleSceneLine(scene, 0), scene);
});

test("isSceneLine matches indented Scene lines only", () => {
  assert.ok(isSceneLine("  Scene 4 (0.0–1.0s): x"));
  assert.ok(!isSceneLine("- scene: a 20-minute timer"));
});
