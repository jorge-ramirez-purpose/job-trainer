import { useState, useEffect, useCallback } from 'react'
import { TQuestion, TQuizState } from '../types/Question'

const STORAGE_KEY = 'quiz-progress'

type TPersistedProgress = {
  answers: Record<string, number>
  markedForReview: string[]
}

const loadProgress = (): TPersistedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { answers: {}, markedForReview: [] }
    return JSON.parse(raw)
  } catch {
    return { answers: {}, markedForReview: [] }
  }
}

const saveProgress = (progress: TPersistedProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export const useQuiz = () => {
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const persisted = loadProgress()
  const [quizState, setQuizState] = useState<TQuizState>({
    currentQuestion: 0,
    answers: persisted.answers,
    markedForReview: persisted.markedForReview,
    showExplanation: false,
    selectedAnswer: null,
    showXRay: false
  })

  useEffect(() => {
    saveProgress({
      answers: quizState.answers,
      markedForReview: quizState.markedForReview
    })
  }, [quizState.answers, quizState.markedForReview])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const url = category
      ? `/api/questions?category=${encodeURIComponent(category)}`
      : '/api/questions'

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setQuestions(data)
        setQuizState(prev => ({
          ...prev,
          currentQuestion: 0,
          showExplanation: false,
          selectedAnswer: null,
          showXRay: false
        }))
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [category])

  const currentQuestion = questions[quizState.currentQuestion]

  const selectAnswer = (answerIndex: number) => {
    const alreadyAnswered = quizState.showExplanation
    if (alreadyAnswered) return

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
    const hasMoreQuestions = quizState.currentQuestion < questions.length - 1
    if (hasMoreQuestions) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false,
        selectedAnswer: null,
        showXRay: false
      }))
    }
  }

  const toggleMarkForReview = () => {
    if (!currentQuestion) return
    setQuizState(prev => {
      const isMarked = prev.markedForReview.includes(currentQuestion.id)
      const markedForReview = isMarked
        ? prev.markedForReview.filter(id => id !== currentQuestion.id)
        : [...prev.markedForReview, currentQuestion.id]
      return { ...prev, markedForReview }
    })
  }

  const toggleXRay = () => {
    setQuizState(prev => ({
      ...prev,
      showXRay: !prev.showXRay
    }))
  }

  const selectCategory = useCallback((cat: string | null) => {
    setCategory(cat)
  }, [])

  const getStats = () => {
    const correct = Object.entries(quizState.answers).filter(
      ([questionId, answer]) => {
        const question = questions.find(q => q.id === questionId)
        return question && answer === question.correctAnswer
      }
    ).length

    const wrong = Object.keys(quizState.answers).length - correct
    const hasAnswered = correct + wrong > 0
    const score = hasAnswered ? Math.round((correct / (correct + wrong)) * 100) : 0

    return { correct, wrong, score }
  }

  return {
    quizState,
    currentQuestion,
    selectAnswer,
    nextQuestion,
    toggleMarkForReview,
    toggleXRay,
    getStats,
    totalQuestions: questions.length,
    loading,
    error,
    category,
    selectCategory
  }
}
