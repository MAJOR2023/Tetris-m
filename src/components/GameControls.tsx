type Props = {
  status: 'idle' | 'playing' | 'paused' | 'gameover';
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
};

export function GameControls({ status, onStart, onPause, onResume, onRestart }: Props) {
  return (
    <div className="game-controls">
      {status === 'idle' && (
        <button type="button" className="btn btn--primary" onClick={onStart}>
          Start
        </button>
      )}
      {status === 'playing' && (
        <button type="button" className="btn" onClick={onPause}>
          Pause
        </button>
      )}
      {status === 'paused' && (
        <button type="button" className="btn btn--primary" onClick={onResume}>
          Resume
        </button>
      )}
      {(status === 'playing' || status === 'paused' || status === 'gameover') && (
        <button type="button" className="btn" onClick={onRestart}>
          New game
        </button>
      )}
    </div>
  );
}
