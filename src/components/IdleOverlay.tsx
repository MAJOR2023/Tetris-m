type Props = {
  visible: boolean;
};

export function IdleOverlay({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="idle-overlay">
      <span>Press Start</span>
    </div>
  );
}
