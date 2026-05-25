import { createShuffledBag } from './bag';
import { createEmptyBoard } from './board';
import { INITIAL_LEVEL, LINES_PER_LEVEL } from './constants';
import { createActivePiece } from './piece';
import type { GameState, TetrominoType } from './types';

let bagQueue: TetrominoType[] = [];

export function resetBagQueue(): void {
  bagQueue = [];
}

function takeFromBag(): TetrominoType {
  if (bagQueue.length === 0) {
    bagQueue = createShuffledBag();
  }
  return bagQueue.shift()!;
}

export function drawNextPiece(): TetrominoType {
  return takeFromBag();
}

export function createInitialGameState(): GameState {
  resetBagQueue();

  return {
    board: createEmptyBoard(),
    active: null,
    next: drawNextPiece(),
    status: 'idle',
    score: 0,
    level: INITIAL_LEVEL,
    lines: 0,
  };
}

export function createPlayingState(): GameState {
  resetBagQueue();
  const first = drawNextPiece();
  const second = drawNextPiece();

  return {
    board: createEmptyBoard(),
    active: createActivePiece(first),
    next: second,
    status: 'playing',
    score: 0,
    level: INITIAL_LEVEL,
    lines: 0,
  };
}

export { LINES_PER_LEVEL };
