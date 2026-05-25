import { SPAWN_POSITION, TETROMINO_SHAPES } from './tetrominoes';
import type { ActivePiece, TetrominoType } from './types';

export function createActivePiece(type: TetrominoType): ActivePiece {
  const spawn = SPAWN_POSITION[type];
  return {
    type,
    shape: TETROMINO_SHAPES[type][0].map((row) => [...row]),
    position: { x: spawn.x, y: spawn.y },
  };
}
