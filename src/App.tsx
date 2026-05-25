import { Board } from './components/Board';
import { ControlsHelp } from './components/ControlsHelp';
import { GameControls } from './components/GameControls';
import { GameOverOverlay } from './components/GameOverOverlay';
import { PauseOverlay } from './components/PauseOverlay';
import { NextPiece } from './components/NextPiece';
import { StatsPanel } from './components/StatsPanel';
import { useGame } from './hooks/useGame';
import { useKeyboard } from './hooks/useKeyboard';
import './App.css';

export default function App() {
  const game = useGame();
  const { state } = game;
  const keyboardEnabled = state.status === 'playing' || state.status === 'paused';

  useKeyboard(
    {
      onLeft: game.moveLeft,
      onRight: game.moveRight,
      onDown: game.softDrop,
      onUp: game.rotate,
      onHardDrop: game.hardDrop,
      onPause: () => {
        if (state.status === 'playing') game.pause();
        else if (state.status === 'paused') game.resume();
      },
      onRestart: game.restart,
    },
    keyboardEnabled,
  );

  return (
    <div className="app">
      <header className="app__header">
        <h1>Tetris-m</h1>
        <p className="app__subtitle">Classic block puzzle</p>
      </header>

      <div className="app__layout">
        <aside className="app__sidebar">
          <StatsPanel score={state.score} level={state.level} lines={state.lines} />
          <NextPiece type={state.next} />
          <GameControls
            status={state.status}
            onStart={game.start}
            onPause={game.pause}
            onResume={game.resume}
            onRestart={game.restart}
          />
          <ControlsHelp />
        </aside>

        <section className="app__stage">
          <div className="board-wrap">
            <Board board={state.board} active={state.active} />
            <GameOverOverlay visible={state.status === 'gameover'} />
            <PauseOverlay visible={state.status === 'paused'} />
          </div>
        </section>
      </div>
    </div>
  );
}
