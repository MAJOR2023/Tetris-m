type Props = {
  visible: boolean;
};

export function PauseOverlay({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="pause-overlay">
      <span>Paused</span>
    </div>
  );
}
