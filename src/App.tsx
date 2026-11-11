import React, { useState, useEffect } from 'react';
import { AssessmentPart, UserProgress } from './types';
import { loadUserProgress } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { PracticeView } from './components/PracticeView';
import { ProgressView } from './components/ProgressView';

export const App: React.FC = () => {
  const [activePart, setActivePart] = useState<AssessmentPart | null>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const reloadProgress = () => {
    setProgress(loadUserProgress());
  };

  return (
    <div className="app-shell">
      <Navbar
        activePart={activePart}
        onSelectPart={setActivePart}
        showProgress={showProgress}
        setShowProgress={setShowProgress}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="app-main">
        {showProgress ? (
          <ProgressView
            progress={progress}
            onBack={() => setShowProgress(false)}
            onReset={reloadProgress}
          />
        ) : activePart ? (
          <PracticeView
            part={activePart}
            onBack={() => setActivePart(null)}
            onAnswerRecorded={reloadProgress}
          />
        ) : (
          <Dashboard
            onStartPart={(part) => {
              setActivePart(part);
              setShowProgress(false);
            }}
            progress={progress}
          />
        )}
      </main>
    </div>
  );
};

export default App;