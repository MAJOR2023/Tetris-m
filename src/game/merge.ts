import type { ActivePiece, Board } from './types';

export function lockPieceOnBoard(board: Board, piece: ActivePiece): Board {
  const nextBoard = board.map((row) => [...row]);

  for (let row = 0; row < piece.shape.length; row += 1) {
    for (let col = 0; col < piece.shape[row].length; col += 1) {
      if (piece.shape[row][col] === 0) continue;

      const boardY = piece.position.y + row;
      const boardX = piece.position.x + col;

      if (boardY >= 0) {
        nextBoard[boardY][boardX] = piece.type;
      }
    }
  }

  return nextBoard;
}
