import React from 'react';
import { AssessmentPart } from '../types';
import { Moon, Sun, BarChart2, Home, ShieldAlert } from 'lucide-react';

interface Props {
  activePart: AssessmentPart | null;
  onSelectPart: (part: AssessmentPart | null) => void;
  showProgress: boolean;
  setShowProgress: (show: boolean) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  activePart,
  onSelectPart,
  showProgress,
  setShowProgress,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div
          className="brand"
          onClick={() => {
            onSelectPart(null);
            setShowProgress(false);
          }}
          role="button"
          tabIndex={0}
        >
          <div className="brand-logo">ASE</div>
          <div>
            <div className="brand-title">Assessment Practice Lab</div>
            <div className="brand-subtitle">Accenture Philippines ASE Preparation</div>
          </div>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className={`nav-btn ${!activePart && !showProgress ? 'active' : ''}`}
            onClick={() => {
              onSelectPart(null);
              setShowProgress(false);
            }}
          >
            <Home size={16} /> <span className="hide-mobile">Home</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${showProgress ? 'active' : ''}`}
            onClick={() => setShowProgress(true)}
          >
            <BarChart2 size={16} /> <span className="hide-mobile">My Progress</span>
          </button>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle light and dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};