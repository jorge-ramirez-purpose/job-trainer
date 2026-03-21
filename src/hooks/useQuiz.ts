import { useState } from 'react'
import { QuizState } from '../types/Question'
import { questions } from '../data/questions'

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    showExplanation: false,
    selectedAnswer: null
  })

  const currentQuestion = questions[quizState.currentQuestion]

  const selectAnswer = (answerIndex: number) => {
    if (quizState.showExplanation) return
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showExplanation: true,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answerIndex
      }
    }))
  }

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false,
        selectedAnswer: null
      }))
    }
  }

  const getStats = () => {
    const correct = Object.entries(quizState.answers).filter(
      ([questionId, answer]) => {
        const question = questions.find(q => q.id === questionId)
        return question && answer === question.correctAnswer
      }
    ).length

    const wrong = Object.keys(quizState.answers).length - correct
    const score = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0

    return { correct, wrong, score }
  }

  return {
    quizState,
    currentQuestion,
    selectAnswer,
    nextQuestion,
    getStats,
    totalQuestions: questions.length
  }
}