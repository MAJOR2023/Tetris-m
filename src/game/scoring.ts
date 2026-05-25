const LINE_SCORES = [0, 100, 300, 500, 800];

export const SOFT_DROP_SCORE = 1;

export function scoreForLines(lines: number, level: number): number {
  return (LINE_SCORES[lines] ?? 0) * level;
}
