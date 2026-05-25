import { TETROMINO_SHAPES } from './tetrominoes';
import type { ActivePiece, Board, Cell, TetrominoType } from './types';

export function getDisplayBoard(board: Board, active: ActivePiece | null): Cell[][] {
  const display = board.map((row) => [...row]);

  if (!active) return display;

  for (let row = 0; row < active.shape.length; row += 1) {
    for (let col = 0; col < active.shape[row].length; col += 1) {
      if (active.shape[row][col] === 0) continue;
      const y = active.position.y + row;
      const x = active.position.x + col;
      if (y >= 0 && y < display.length && x >= 0 && x < display[0].length) {
        display[y][x] = active.type;
      }
    }
  }

  return display;
}

export function getPreviewShape(type: TetrominoType): number[][] {
  return TETROMINO_SHAPES[type][0];
}
