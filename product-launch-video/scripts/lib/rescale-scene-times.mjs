// rescale-scene-times.mjs — proportionally rescales the time windows of a
// frame's `Scene N (A–Bs):` lines when sync-durations replaces the estimated
// frame duration with the real voice duration. Without this, Scene windows
// written in Step 4 (before audio exists) keep their estimated positions and
// in-frame reveals drift against the spoken cue.

const SCENE_LINE_RE = /^\s*Scene\s+\d+/i;
const WINDOW_RE = /\((\d+(?:\.\d+)?)\s*s?\s*([–—-])\s*(?:(\d+(?:\.\d+)?)\s*s?|end)\)/i;

const r2 = (x) => String(Math.round(x * 100) / 100);

export function isSceneLine(line) {
  return SCENE_LINE_RE.test(line);
}

// Returns the rescaled line, or the line unchanged when it is not a Scene
// line, carries no parseable window, or the ratio is effectively 1.
export function rescaleSceneLine(line, ratio) {
  if (!Number.isFinite(ratio) || ratio <= 0 || Math.abs(ratio - 1) < 0.001) return line;
  if (!isSceneLine(line)) return line;
  return line.replace(WINDOW_RE, (_m, start, dash, end) => {
    const right = end === undefined ? "end" : `${r2(Number(end) * ratio)}s`;
    return `(${r2(Number(start) * ratio)}${dash}${right})`;
  });
}
