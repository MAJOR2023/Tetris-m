import { BOARD_HEIGHT, BOARD_WIDTH } from './constants';
import type { ActivePiece, Board } from './types';

export function canPlacePiece(board: Board, piece: ActivePiece): boolean {
  for (let row = 0; row < piece.shape.length; row += 1) {
    for (let col = 0; col < piece.shape[row].length; col += 1) {
      if (piece.shape[row][col] === 0) continue;

      const boardX = piece.position.x + col;
      const boardY = piece.position.y + row;

      if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
        return false;
      }

      if (boardY >= 0 && board[boardY][boardX] !== null) {
        return false;
      }
    }
  }

  return true;
}

export function isGameOver(board: Board, piece: ActivePiece): boolean {
  return !canPlacePiece(board, piece);
}
