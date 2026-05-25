type Props = {
  score: number;
  level: number;
  lines: number;
};

export function StatsPanel({ score, level, lines }: Props) {
  return (
    <div className="stats-panel">
      <h3 className="panel-title">Stats</h3>
      <dl className="stats-panel__list">
        <div className="stats-panel__row">
          <dt>Score</dt>
          <dd>{score}</dd>
        </div>
        <div className="stats-panel__row">
          <dt>Level</dt>
          <dd>{level}</dd>
        </div>
        <div className="stats-panel__row">
          <dt>Lines</dt>
          <dd>{lines}</dd>
        </div>
      </dl>
    </div>
  );
}
