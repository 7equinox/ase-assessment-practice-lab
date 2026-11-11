export type AssessmentPart = 'cognitive' | 'cpp' | 'behavioral' | 'english';

export type Difficulty = 'easy' | 'intermediate' | 'advanced';

export interface SourceReference {
  id: string;
  title: string;
  publisher: string;
  url: string;
  concept: string;
  notes: string;
}

export interface Choice {
  id: string;
  text: string;
}

export interface DistractorExplanation {
  choiceId: string;
  explanation: string;
}

export interface BaseQuestion {
  id: string;
  part: AssessmentPart;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  choices: Choice[];
  correctAnswerId: string;
  explanation: string;
  distractorExplanations?: DistractorExplanation[];
  keyConcept: string;
  sourceIds: string[];
  isGenerated: boolean;
}

export interface InteractiveData {
  kind: 'visual-pattern' | 'route-map' | 'experiment-puzzle' | 'code-trace';
  data: any;
}

export interface Question extends BaseQuestion {
  codeSnippet?: string;
  interactive?: InteractiveData;
  passage?: string; // For reading comprehension
  behavioralRubric?: {
    competency: string;
    whyStrongest: string;
    contextualCaveat: string;
  };
}

export interface UserAnswerRecord {
  questionId: string;
  part: AssessmentPart;
  topic: string;
  difficulty: Difficulty;
  selectedChoiceId: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface PartStatistics {
  attempted: number;
  correct: number;
  byTopic: Record<string, { attempted: number; correct: number }>;
}

export interface UserProgress {
  stats: Record<AssessmentPart, PartStatistics>;
  history: UserAnswerRecord[];
  bookmarkedQuestionIds: string[];
}