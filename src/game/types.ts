export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type Cell = TetrominoType | null;

export type Board = Cell[][];

export type Position = { x: number; y: number };

export type ActivePiece = {
  type: TetrominoType;
  shape: number[][];
  position: Position;
};

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover';

export type GameState = {
  board: Board;
  active: ActivePiece | null;
  next: TetrominoType;
  status: GameStatus;
  score: number;
  level: number;
  lines: number;
};
