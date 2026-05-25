import { PIECE_COLORS } from '../game/colors';
import { getPreviewShape } from '../game/display';
import type { TetrominoType } from '../game/types';

type Props = {
  type: TetrominoType;
};

export function NextPiece({ type }: Props) {
  const shape = getPreviewShape(type);
  const color = PIECE_COLORS[type];

  return (
    <div className="next-piece">
      <h3 className="panel-title">Next</h3>
      <div
        className="next-piece__grid"
        style={{
          gridTemplateColumns: `repeat(${shape[0].length}, 1fr)`,
        }}
      >
        {shape.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`next-piece__cell${cell ? ' next-piece__cell--filled' : ''}`}
              style={cell ? { backgroundColor: color, boxShadow: `0 0 6px ${color}55` } : undefined}
            />
          )),
        )}
      </div>
    </div>
  );
}
