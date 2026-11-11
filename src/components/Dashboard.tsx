import React from 'react';
import { AssessmentPart, UserProgress } from '../types';
import { Cpu, Brain, HeartHandshake, BookOpen, ArrowRight } from 'lucide-react';

interface Props {
  onStartPart: (part: AssessmentPart) => void;
  progress: UserProgress;
}

export const Dashboard: React.FC<Props> = ({ onStartPart, progress }) => {
  const parts = [
    {
      id: 'cognitive' as AssessmentPart,
      title: 'Cognitive & Logical Reasoning',
      icon: <Brain size={28} color="#4f46e5" />,
      desc: 'Shape matrix sequences, numerical reasoning, deductive syllogisms, map navigation, and rule discovery sandbox.',
      topics: 'Patterns • Directions • Math Logic'
    },
    {
      id: 'cpp' as AssessmentPart,
      title: 'C++ Programming Fundamentals',
      icon: <Cpu size={28} color="#06b6d4" />,
      desc: 'C++17 code output prediction, pointers (* &), references, OOP virtual methods, and loop tracing.',
      topics: 'Pointers • Memory • OOP • Loops'
    },
    {
      id: 'behavioral' as AssessmentPart,
      title: 'Behavioral & Learning Agility',
      icon: <HeartHandshake size={28} color="#ec4899" />,
      desc: 'Realistic workplace situational judgment scenarios: accountability, teamwork, feedback receptivity, and agility.',
      topics: 'Ownership • Feedback • Teamwork'
    },
    {
      id: 'english' as AssessmentPart,
      title: 'English Proficiency',
      icon: <BookOpen size={28} color="#eab308" />,
      desc: 'Subject-verb agreement, tense consistency, technical context vocabulary, and reading comprehension.',
      topics: 'Grammar • Vocabulary • Reading'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="hero-banner">
        <h2>Practice. Understand. Improve.</h2>
        <p>
          Master the foundational competencies evaluated in software engineering recruitment assessments.
          No timer pressure, continuous question variations, verified educational references, and in-depth rationales.
        </p>
        <div className="disclaimer-chip">
          <strong>Independent Learning Tool:</strong> Not affiliated with, endorsed by, or officially provided by Accenture.
          Practice questions are original pedagogical exercises based on publicly available learning materials.
        </div>
      </div>

      <div className="parts-grid">
        {parts.map(p => {
          const stats = progress.stats[p.id];
          const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

          return (
            <div key={p.id} className="part-card">
              <div className="part-card-header">
                <div className="part-icon">{p.icon}</div>
                <div className="part-badge">{p.topics}</div>
              </div>
              <h3 className="part-card-title">{p.title}</h3>
              <p className="part-card-desc">{p.desc}</p>

              <div className="part-stats-summary">
                <span>Attempted: <strong>{stats.attempted}</strong></span>
                <span>Accuracy: <strong>{accuracy}%</strong></span>
              </div>

              <button
                type="button"
                className="btn-start"
                onClick={() => onStartPart(p.id)}
              >
                Start Practicing <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};