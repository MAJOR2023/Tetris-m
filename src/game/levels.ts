export function getDropIntervalMs(level: number): number {
  const clamped = Math.max(1, Math.min(level, 15));
  return Math.max(100, 1000 - (clamped - 1) * 60);
}

export function getLevelFromLines(totalLines: number, linesPerLevel: number): number {
  return Math.floor(totalLines / linesPerLevel) + 1;
}
