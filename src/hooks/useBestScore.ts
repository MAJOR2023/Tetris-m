import { useEffect, useState } from 'react';

const STORAGE_KEY = 'tetris-m-best-score';

function readBest(): number {
  const value = localStorage.getItem(STORAGE_KEY);
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function useBestScore(score: number): number {
  const [best, setBest] = useState(readBest);

  useEffect(() => {
    if (score <= best) return;
    setBest(score);
    localStorage.setItem(STORAGE_KEY, String(score));
  }, [score, best]);

  return Math.max(best, score);
}
