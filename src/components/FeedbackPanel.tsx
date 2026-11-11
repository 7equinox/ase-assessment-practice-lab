import React from 'react';
import { Question } from '../types';
import { SourcesList } from './SourcesList';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Props {
  question: Question;
  selectedChoiceId: string;
  onNext: () => void;
  onRetry: () => void;
}

export const FeedbackPanel: React.FC<Props> = ({ question, selectedChoiceId, onNext, onRetry }) => {
  const isCorrect = selectedChoiceId === question.correctAnswerId;
  const selectedChoice = question.choices.find(c => c.id === selectedChoiceId);
  const correctChoice = question.choices.find(c => c.id === question.correctAnswerId);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        borderRadius: '8px',
        border: `1.5px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
        background: isCorrect ? 'var(--feedback-correct-bg)' : 'var(--feedback-wrong-bg)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {isCorrect ? (
          <>
            <CheckCircle2 color="#22c55e" size={24} />
            <h3 style={{ margin: 0, color: '#16a34a', fontSize: '1.1rem' }}>Correct Answer</h3>
          </>
        ) : (
          <>
            <XCircle color="#ef4444" size={24} />
            <h3 style={{ margin: 0, color: '#dc2626', fontSize: '1.1rem' }}>
              {question.part === 'behavioral' ? 'Alternative Response Preferred' : 'Incorrect Choice'}
            </h3>
          </>
        )}
      </div>

      <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
        <strong>Your Selection:</strong> {selectedChoice ? selectedChoice.text : 'None'}
      </div>

      {!isCorrect && correctChoice && (
        <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text)' }}>
          <strong>
            {question.part === 'behavioral' ? 'Most Constructive Response:' : 'Correct Answer:'}
          </strong>{' '}
          {correctChoice.text}
        </div>
      )}

      <div style={{ margin: '1rem 0', whiteSpace: 'pre-line', fontSize: '0.875rem', lineHeight: '1.5' }}>
        <strong>Detailed Rationale:</strong>
        <p style={{ margin: '0.25rem 0' }}>{question.explanation}</p>
      </div>

      {question.distractorExplanations && question.distractorExplanations.length > 0 && (
        <div style={{ margin: '0.75rem 0', fontSize: '0.85rem' }}>
          <strong>Distractor Analysis:</strong>
          <ul style={{ paddingLeft: '1.25rem', margin: '0.25rem 0' }}>
            {question.distractorExplanations.map(d => (
              <li key={d.choiceId}>{d.explanation}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <strong>Key Concept:</strong> {question.keyConcept}
      </div>

      <SourcesList sourceIds={question.sourceIds} />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onNext}
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          Next Question <ArrowRight size={16} />
        </button>
        {!isCorrect && (
          <button
            type="button"
            onClick={onRetry}
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RotateCcw size={16} /> Try Again
          </button>
        )}
      </div>
    </div>
  );
};