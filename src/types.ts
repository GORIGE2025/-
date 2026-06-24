export type LevelType = 'match' | 'category' | 'spelling' | 'quiz' | 'home';

export interface ScoreState {
  stars: number;
  score: number;
  completedLevels: Record<string, boolean>;
  levelScores: Record<string, number>;
}

export interface LetterOttuPair {
  id: string;
  letter: string;   // e.g., "ప"
  ottu: string;     // e.g., "్ప"
  displayOttu: string; // e.g., "◌్ప"
  name: string;     // e.g., "ప ఒత్తు"
}

export interface TeluguWord {
  word: string;         // e.g., "తప్పు"
  meaning: string;      // English meaning: e.g., "Wrong / Mistake"
  ottuType: string;     // e.g., "ప"
  brokenWord: string;   // e.g., "తపు" (with missing ottu)
  correctSyllable: string; // e.g., "ప్పు"
  incorrectSyllable: string; // e.g., "పు"
}

export interface SentenceExercise {
  id: string;
  original: string;    // e.g., "అమ పపుచారు చేసింది."
  corrected: string;   // e.g., "అమ్మ పప్పుచారు చేసింది."
  translation: string; // "Mother made dal soup."
  blanks: {
    wordIdx: number;       // index of the target word in the split sentence
    incorrect: string;     // e.g., "అమ"
    correct: string;       // e.g., "అమ్మ"
    baseLetter: string;    // "మ"
    correctOttu: string;   // "్మ" (ma-ottu)
    options: string[];     // ["్మ", "్ప", "్వ"]
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;         // e.g., "కింది వాటిలో 'మ' ఒత్తు పదం ఏది?" (Which of the following is a 'ma' ottu word?)
  options: string[];        // list of choices
  correctAnswer: string;    // correct choice
  audioPrompt?: string;     // optional pronunciation cue
  explanation: string;      // educational explanation
}
