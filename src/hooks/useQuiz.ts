import { useState, useEffect } from 'react'
import { TQuestion, TQuizState } from '../types/Question'

export const useQuiz = () => {
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizState, setQuizState] = useState<TQuizState>({
    currentQuestion: 0,
    answers: {},
    showExplanation: false,
    selectedAnswer: null,
    showXRay: false
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/questions', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

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
        selectedAnswer: null,
        showXRay: false
      }))
    }
  }

  const toggleXRay = () => {
    setQuizState(prev => ({
      ...prev,
      showXRay: !prev.showXRay
    }))
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
    toggleXRay,
    getStats,
    totalQuestions: questions.length,
    loading,
    error
  }
}
