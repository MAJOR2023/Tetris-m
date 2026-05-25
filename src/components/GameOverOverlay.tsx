type Props = {
  visible: boolean;
};

export function GameOverOverlay({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="game-over">
      <span>Game Over</span>
    </div>
  );
}
