
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'monster';
export type ProgrammingLanguage = 'JavaScript' | 'Python' | 'Java' | 'TypeScript' | 'C++' | 'Functional' | 'General';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  difficultyLevel: DifficultyLevel;
  category: string;
  language: ProgrammingLanguage;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}
