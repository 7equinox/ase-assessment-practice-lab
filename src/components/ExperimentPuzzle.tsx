import React, { useState } from 'react';

export const ExperimentPuzzle: React.FC = () => {
  const [inA, setInA] = useState<boolean>(false);
  const [inB, setInB] = useState<boolean>(false);

  // Hidden deterministic rule: XOR
  const output = inA !== inB;

  return (
    <div style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '8px', background: 'var(--card-subtle)', margin: '1rem 0' }}>
      <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        🔬 Experiment Area: Toggle Inputs to Deduce the Logic Transform
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
        Click the input switches below. Observe how the system reacts in real time to deduce the rule.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setInA(!inA)}
          style={{
            padding: '0.5rem 1rem',
            background: inA ? '#4f46e5' : 'var(--bg-canvas)',
            color: inA ? '#ffffff' : 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Signal Switch A: <strong>{inA ? '1 (HIGH)' : '0 (LOW)'}</strong>
        </button>

        <button
          type="button"
          onClick={() => setInB(!inB)}
          style={{
            padding: '0.5rem 1rem',
            background: inB ? '#4f46e5' : 'var(--bg-canvas)',
            color: inB ? '#ffffff' : 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Signal Switch B: <strong>{inB ? '1 (HIGH)' : '0 (LOW)'}</strong>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Resulting Output Z:</span>
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontWeight: 700,
              background: output ? '#dcfce7' : '#fee2e2',
              color: output ? '#15803d' : '#b91c1c'
            }}
          >
            {output ? 'ACTIVE (1)' : 'INACTIVE (0)'}
          </span>
        </div>
      </div>
    </div>
  );
};