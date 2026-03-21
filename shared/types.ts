export interface Question {
  id: string;
  category: string;
  tag: string;
  type: 'predict-output' | 'multiple-choice';
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<string, number>;
  showExplanation: boolean;
  selectedAnswer: number | null;
  showXRay: boolean;
}
