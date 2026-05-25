export function rotateShape(shape: number[][]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0),
  );

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      rotated[col][rows - 1 - row] = shape[row][col];
    }
  }

  return rotated;
}

import type { TetrominoType } from './types';

export function getNextRotationIndex(
  type: TetrominoType,
  currentIndex: number,
  direction: 1 | -1,
): number {
  const rotations = type === 'O' ? 1 : type === 'I' ? 2 : 4;
  return (currentIndex + direction + rotations) % rotations;
}
