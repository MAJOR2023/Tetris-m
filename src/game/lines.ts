import { BOARD_WIDTH } from './constants';
import type { Board } from './types';

export function clearCompletedLines(board: Board): {
  board: Board;
  cleared: number;
} {
  const remaining = board.filter(
    (row) => row.some((cell) => cell === null),
  );
  const cleared = board.length - remaining.length;
  const emptyRows = Array.from({ length: cleared }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );

  return {
    board: [...emptyRows, ...remaining],
    cleared,
  };
}
