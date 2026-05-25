import { PIECE_COLORS } from '../game/colors';
import type { Cell as CellValue } from '../game/types';

type Props = {
  value: CellValue;
};

export function Cell({ value }: Props) {
  const filled = value !== null;
  const color = filled ? PIECE_COLORS[value] : 'transparent';

  return (
    <div
      className={`cell${filled ? ' cell--filled' : ''}`}
      style={filled ? { backgroundColor: color, boxShadow: `0 0 8px ${color}55` } : undefined}
    />
  );
}
