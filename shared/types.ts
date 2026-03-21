export type TQuestion = {
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

export type TQuizState = {
  currentQuestion: number;
  answers: Record<string, number>;
  markedForReview: string[];
  showExplanation: boolean;
  selectedAnswer: number | null;
  showXRay: boolean;
}
