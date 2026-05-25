import { BOARD_WIDTH } from '../game/constants';
import { getDisplayBoard } from '../game/display';
import type { ActivePiece, Board as BoardType } from '../game/types';
import { Cell } from './Cell';

type Props = {
  board: BoardType;
  active: ActivePiece | null;
};

export function Board({ board, active }: Props) {
  const display = getDisplayBoard(board, active);

  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)` }}>
      {display.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} value={cell} />
        )),
      )}
    </div>
  );
}
