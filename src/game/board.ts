import { BOARD_HEIGHT, BOARD_WIDTH } from './constants';
import type { Board } from './types';

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );
}
