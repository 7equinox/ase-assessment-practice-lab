import React from 'react';
import { UserProgress } from '../types';
import { clearUserProgress } from '../services/storageService';
import { Trash2, CheckCircle, BarChart, ArrowLeft } from 'lucide-react';

interface Props {
  progress: UserProgress;
  onBack: () => void;
  onReset: () => void;
}

export const ProgressView: React.FC<Props> = ({ progress, onBack, onReset }) => {
  const parts = [
    { id: 'cognitive', name: 'Cognitive & Logical' },
    { id: 'cpp', name: 'C++ Programming' },
    { id: 'behavioral', name: 'Behavioral & Learning Agility' },
    { id: 'english', name: 'English Proficiency' }
  ] as const;

  const totalAttempted = Object.values(progress.stats).reduce((a, b) => a + b.attempted, 0);
  const totalCorrect = Object.values(progress.stats).reduce((a, b) => a + b.correct, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const handleClear = () => {
    if (window.confirm('Are you sure you want to reset all your progress data? This action cannot be undone.')) {
      clearUserProgress();
      onReset();
    }
  };

  return (
    <div className="progress-container">
      <div className="practice-header">
        <button type="button" onClick={onBack} className="btn-back">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <button type="button" onClick={handleClear} className="btn-danger">
          <Trash2 size={16} /> Reset Progress
        </button>
      </div>

      <div className="stats-hero">
        <div className="stat-box">
          <div className="stat-val">{totalAttempted}</div>
          <div className="stat-label">Total Questions Solved</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{totalCorrect}</div>
          <div className="stat-label">Total Correct</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{overallAccuracy}%</div>
          <div className="stat-label">Overall Accuracy</div>
        </div>
      </div>

      <h3>Competency Breakdown by Assessment Part</h3>
      <div className="progress-parts-grid">
        {parts.map(p => {
          const stat = progress.stats[p.id];
          const acc = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
          return (
            <div key={p.id} className="progress-part-card">
              <h4>{p.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Attempted: {stat.attempted}</span>
                <span>Accuracy: {acc}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${acc}%` }} />
              </div>

              {Object.keys(stat.byTopic).length > 0 && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
                  <strong>Topic Mastery:</strong>
                  {Object.entries(stat.byTopic).map(([topic, tStat]) => (
                    <div key={topic} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.2rem 0' }}>
                      <span>{topic}</span>
                      <span>{tStat.correct}/{tStat.attempted}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};