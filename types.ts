export type PracticeType = 'vocab' | 'listening' | 'speaking' | 'grammar' | 'pronunciation';

export interface StudentProfile {
  name: string;
  classId: string;
  studentId: string;
}

export interface VocabWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  image: string;
}

export interface ListeningExercise {
  id: string;
  title: string;
  transcript: string; // The text to be read by TTS
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface SpeakingChallenge {
  id: string;
  sentence: string;
  context: string;
}

export interface GrammarExercise {
  id: string;
  topic: string;
  rule: string; // Markdown or simple text explanation
  questions: {
    question: string; // "The boy ___ is sitting here."
    options: string[]; // ["who", "which", "whose"]
    correctAnswer: number;
  }[];
}

export interface PronunciationWord {
  word: string;
  stressIndex: number; // Index of the syllable that is stressed (0-based) - mostly for visual help if needed
  syllables: string[]; // ["e", "du", "ca", "tion"]
}

export interface PronunciationExercise {
  id: string;
  topic: string; // "Stress on words ending in -ion and -ity"
  rule: string;
  words: PronunciationWord[];
}

export interface Unit {
  id: number;
  title: string;
  topic: string;
  description: string;
  color: string;
  image: string;
  vocab: VocabWord[];
  listening: ListeningExercise;
  speaking: SpeakingChallenge[];
  grammar?: GrammarExercise;
  pronunciation?: PronunciationExercise;
}

export interface UserProgress {
  profile: StudentProfile;
  xp: number;
  level: number;
  streak: number;
  completedUnits: number[];
  badges: string[];
}

export interface FeedbackResponse {
  score: 'Excellent' | 'Good' | 'Try Again';
  feedback: string;
  correctedPronunciation?: string;
}