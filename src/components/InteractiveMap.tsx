import React from 'react';

interface Props {
  data: {
    steps: { move: string; dx: number; dy: number }[];
    targetX: number;
    targetY: number;
  };
}

export const InteractiveMap: React.FC<Props> = ({ data }) => {
  return (
    <div className="interactive-map-container" style={{ margin: '1rem 0', background: 'var(--card-subtle)', padding: '1rem', borderRadius: '8px' }}>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Visual Radar Grid [Origin (0,0)]</div>
      <svg width="100%" height="220" viewBox="-6 -2 14 8" style={{ border: '1px solid var(--border)', background: 'var(--bg-canvas)', borderRadius: '6px' }}>
        {/* Coordinate Grid lines */}
        {[-4, -2, 0, 2, 4, 6].map(x => (
          <line key={`x-${x}`} x1={x} y1={-2} x2={x} y2={6} stroke="var(--border)" strokeWidth="0.05" />
        ))}
        {[-2, 0, 2, 4].map(y => (
          <line key={`y-${y}`} x1={-6} y1={y} x2={8} y2={y} stroke="var(--border)" strokeWidth="0.05" />
        ))}

        {/* Origin pin */}
        <circle cx={0} cy={0} r="0.3" fill="#6366f1" />
        <text x={0.4} y={-0.2} fontSize="0.45" fill="var(--text-muted)">Origin [0,0]</text>

        {/* Vector path */}
        <polyline
          points="0,0 0,3 4,3 4,2"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="0.15"
          strokeDasharray="0.3,0.1"
        />

        {/* Target Destination pin */}
        <circle cx={data.targetX} cy={data.targetY} r="0.35" fill="#10b981" />
        <text x={data.targetX + 0.4} y={data.targetY + 0.2} fontSize="0.45" fill="#10b981" fontWeight="bold">Destination [?]</text>
      </svg>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span>🔵 Origin</span>
        <span>🟢 Target Location</span>
        <span>--- Trajectory Path</span>
      </div>
    </div>
  );
};