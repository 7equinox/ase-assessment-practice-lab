import { UserProgress, AssessmentPart, UserAnswerRecord } from '../types';

const STORAGE_KEY = 'ase_practice_lab_v1';

const defaultProgress: UserProgress = {
  stats: {
    cognitive: { attempted: 0, correct: 0, byTopic: {} },
    cpp: { attempted: 0, correct: 0, byTopic: {} },
    behavioral: { attempted: 0, correct: 0, byTopic: {} },
    english: { attempted: 0, correct: 0, byTopic: {} },
  },
  history: [],
  bookmarkedQuestionIds: []
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse localStorage, resetting to defaults', e);
    return defaultProgress;
  }
}

export function saveUserAnswer(record: UserAnswerRecord): UserProgress {
  const progress = loadUserProgress();
  progress.history.unshift(record);

  const partStats = progress.stats[record.part];
  partStats.attempted += 1;
  if (record.isCorrect) {
    partStats.correct += 1;
  }

  if (!partStats.byTopic[record.topic]) {
    partStats.byTopic[record.topic] = { attempted: 0, correct: 0 };
  }
  partStats.byTopic[record.topic].attempted += 1;
  if (record.isCorrect) {
    partStats.byTopic[record.topic].correct += 1;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export function toggleBookmark(questionId: string): boolean {
  const progress = loadUserProgress();
  const index = progress.bookmarkedQuestionIds.indexOf(questionId);
  let isBookmarked = false;
  if (index > -1) {
    progress.bookmarkedQuestionIds.splice(index, 1);
    isBookmarked = false;
  } else {
    progress.bookmarkedQuestionIds.push(questionId);
    isBookmarked = true;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return isBookmarked;
}

export function isQuestionBookmarked(questionId: string): boolean {
  const progress = loadUserProgress();
  return progress.bookmarkedQuestionIds.includes(questionId);
}

export function clearUserProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}