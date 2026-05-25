import { useCallback, useEffect, useState } from 'react';
import { canPlacePiece, isGameOver } from '../game/collision';
import {
  LINES_PER_LEVEL,
  createInitialGameState,
  createPlayingState,
  drawNextPiece,
} from '../game/gameState';
import { getDropIntervalMs, getLevelFromLines } from '../game/levels';
import { clearCompletedLines } from '../game/lines';
import { lockPieceOnBoard } from '../game/merge';
import { createActivePiece } from '../game/piece';
import { getNextRotationIndex } from '../game/rotate';
import { SOFT_DROP_SCORE, scoreForLines } from '../game/scoring';
import { TETROMINO_SHAPES } from '../game/tetrominoes';
import type { ActivePiece, GameState, Position } from '../game/types';

function withMovedPiece(piece: ActivePiece, offset: Position): ActivePiece {
  return {
    ...piece,
    position: {
      x: piece.position.x + offset.x,
      y: piece.position.y + offset.y,
    },
  };
}

function withRotation(piece: ActivePiece, direction: 1 | -1): ActivePiece {
  const rotationIndex = getNextRotationIndex(
    piece.type,
    piece.rotationIndex,
    direction,
  );
  return {
    ...piece,
    rotationIndex,
    shape: TETROMINO_SHAPES[piece.type][rotationIndex].map((row) => [...row]),
  };
}

function settlePiece(prev: GameState): GameState {
  if (!prev.active) return prev;

  const lockedBoard = lockPieceOnBoard(prev.board, prev.active);
  const { board: clearedBoard, cleared } = clearCompletedLines(lockedBoard);
  const lines = prev.lines + cleared;
  const level = getLevelFromLines(lines, LINES_PER_LEVEL);
  const score = prev.score + scoreForLines(cleared, prev.level);
  const nextType = drawNextPiece();
  const active = createActivePiece(prev.next);

  if (isGameOver(clearedBoard, active)) {
    return {
      ...prev,
      board: clearedBoard,
      active: null,
      next: nextType,
      status: 'gameover',
      lines,
      level,
      score,
    };
  }

  return {
    ...prev,
    board: clearedBoard,
    active,
    next: nextType,
    lines,
    level,
    score,
  };
}

export function useGame() {
  const [state, setState] = useState<GameState>(createInitialGameState);

  const tryMove = useCallback((offset: Position) => {
    setState((prev) => {
      if (prev.status !== 'playing' || !prev.active) return prev;
      const moved = withMovedPiece(prev.active, offset);
      if (!canPlacePiece(prev.board, moved)) return prev;
      return { ...prev, active: moved };
    });
  }, []);

  const tryRotate = useCallback((direction: 1 | -1 = 1) => {
    setState((prev) => {
      if (prev.status !== 'playing' || !prev.active) return prev;
      const rotated = withRotation(prev.active, direction);
      if (!canPlacePiece(prev.board, rotated)) return prev;
      return { ...prev, active: rotated };
    });
  }, []);

  const softDrop = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing' || !prev.active) return prev;
      const moved = withMovedPiece(prev.active, { x: 0, y: 1 });
      if (canPlacePiece(prev.board, moved)) {
        return { ...prev, active: moved, score: prev.score + SOFT_DROP_SCORE };
      }
      return settlePiece(prev);
    });
  }, []);

  const hardDrop = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing' || !prev.active) return prev;
      let piece = prev.active;
      while (canPlacePiece(prev.board, withMovedPiece(piece, { x: 0, y: 1 }))) {
        piece = withMovedPiece(piece, { x: 0, y: 1 });
      }
      return settlePiece({ ...prev, active: piece });
    });
  }, []);

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing' || !prev.active) return prev;
      const moved = withMovedPiece(prev.active, { x: 0, y: 1 });
      if (canPlacePiece(prev.board, moved)) {
        return { ...prev, active: moved };
      }
      return settlePiece(prev);
    });
  }, []);

  const start = useCallback(() => {
    setState(createPlayingState());
  }, []);

  const pause = useCallback(() => {
    setState((prev) =>
      prev.status === 'playing' ? { ...prev, status: 'paused' } : prev,
    );
  }, []);

  const resume = useCallback(() => {
    setState((prev) =>
      prev.status === 'paused' ? { ...prev, status: 'playing' } : prev,
    );
  }, []);

  const restart = useCallback(() => {
    setState(createPlayingState());
  }, []);

  useEffect(() => {
    if (state.status !== 'playing') return;
    const interval = window.setInterval(tick, getDropIntervalMs(state.level));
    return () => window.clearInterval(interval);
  }, [state.status, state.level, tick]);

  return {
    state,
    moveLeft: () => tryMove({ x: -1, y: 0 }),
    moveRight: () => tryMove({ x: 1, y: 0 }),
    softDrop,
    hardDrop,
    rotate: () => tryRotate(1),
    start,
    pause,
    resume,
    restart,
  };
}
