import React, { useState, useEffect } from 'react';
import { AssessmentPart, Question, Difficulty } from '../types';
import { generateCognitiveQuestion } from '../generators/cognitiveGenerator';
import { generateCppQuestion } from '../generators/cppGenerator';
import { generateBehavioralQuestion } from '../generators/behavioralGenerator';
import { generateEnglishQuestion } from '../generators/englishGenerator';
import { saveUserAnswer, toggleBookmark, isQuestionBookmarked } from '../services/storageService';
import { InteractiveMap } from './InteractiveMap';
import { ExperimentPuzzle } from './ExperimentPuzzle';
import { FeedbackPanel } from './FeedbackPanel';
import { Bookmark, HelpCircle, Check, ArrowLeft } from 'lucide-react';

interface Props {
  part: AssessmentPart;
  onBack: () => void;
  onAnswerRecorded: () => void;
}

export const PracticeView: React.FC<Props> = ({ part, onBack, onAnswerRecorded }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>('intermediate');

  const fetchNextQuestion = () => {
    let q: Question;
    if (part === 'cognitive') {
      q = generateCognitiveQuestion(undefined, difficultyFilter);
    } else if (part === 'cpp') {
      q = generateCppQuestion(undefined, difficultyFilter);
    } else if (part === 'behavioral') {
      q = generateBehavioralQuestion();
    } else {
      q = generateEnglishQuestion(undefined, difficultyFilter);
    }

    setQuestion(q);
    setSelectedChoiceId('');
    setIsSubmitted(false);
    setShowHint(false);
    setBookmarked(isQuestionBookmarked(q.id));
  };

  useEffect(() => {
    fetchNextQuestion();
  }, [part, difficultyFilter]);

  if (!question) return <div>Loading assessment generator...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChoiceId || isSubmitted) return;

    const isCorrect = selectedChoiceId === question.correctAnswerId;
    saveUserAnswer({
      questionId: question.id,
      part: question.part,
      topic: question.topic,
      difficulty: question.difficulty,
      selectedChoiceId,
      isCorrect,
      timestamp: Date.now()
    });

    setIsSubmitted(true);
    onAnswerRecorded();
  };

  const handleBookmark = () => {
    const updated = toggleBookmark(question.id);
    setBookmarked(updated);
  };

  return (
    <div className="practice-view">
      <div className="practice-header">
        <button type="button" onClick={onBack} className="btn-back">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="practice-meta">
          <span className="badge-topic">{question.topic}</span>
          <span className={`badge-diff diff-${question.difficulty}`}>
            {question.difficulty.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={handleBookmark}
            className={`btn-icon ${bookmarked ? 'bookmarked' : ''}`}
            title="Bookmark Question"
          >
            <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="question-card">
        {question.passage && (
          <div className="passage-box">
            <strong>Reading Passage:</strong>
            <p>{question.passage}</p>
          </div>
        )}

        <h3 className="question-prompt">{question.prompt}</h3>

        {question.codeSnippet && (
          <pre className="code-block">
            <code>{question.codeSnippet}</code>
          </pre>
        )}

        {question.interactive?.kind === 'route-map' && (
          <InteractiveMap data={question.interactive.data} />
        )}

        {question.interactive?.kind === 'experiment-puzzle' && (
          <ExperimentPuzzle />
        )}

        <form onSubmit={handleSubmit}>
          <div className="choices-group">
            {question.choices.map(choice => {
              const isSelected = selectedChoiceId === choice.id;
              let choiceClass = 'choice-item';
              if (isSelected) choiceClass += ' selected';
              if (isSubmitted) {
                if (choice.id === question.correctAnswerId) choiceClass += ' correct-highlight';
                else if (isSelected) choiceClass += ' wrong-highlight';
              }

              return (
                <label key={choice.id} className={choiceClass}>
                  <input
                    type="radio"
                    name="choice"
                    value={choice.id}
                    checked={isSelected}
                    disabled={isSubmitted}
                    onChange={() => setSelectedChoiceId(choice.id)}
                  />
                  <span className="choice-text">{choice.text}</span>
                </label>
              );
            })}
          </div>

          {!isSubmitted && (
            <div className="actions-bar">
              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedChoiceId}
              >
                Submit Response
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowHint(!showHint)}
              >
                <HelpCircle size={16} /> {showHint ? 'Hide Concept' : 'Hint'}
              </button>
            </div>
          )}
        </form>

        {showHint && !isSubmitted && (
          <div className="hint-banner">
            <strong>Focus Area:</strong> {question.keyConcept}
          </div>
        )}

        {isSubmitted && (
          <FeedbackPanel
            question={question}
            selectedChoiceId={selectedChoiceId}
            onNext={fetchNextQuestion}
            onRetry={() => {
              setIsSubmitted(false);
              setSelectedChoiceId('');
            }}
          />
        )}
      </div>
    </div>
  );
};