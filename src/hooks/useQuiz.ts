import { useState, useEffect, useCallback, useMemo } from 'react'
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

export const useQuiz = (
  category: string | null,
  questionIndex: number,
  onQuestionChange: (newIndex: number) => void
) => {
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const persisted = loadProgress()
  const [quizState, setQuizState] = useState<TQuizState>({
    currentQuestion: questionIndex,
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

  // Sync question index from URL
  useEffect(() => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: questionIndex,
      showExplanation: false,
      selectedAnswer: null
    }))
  }, [questionIndex])

  // Fetch questions when category changes
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

  const selectAnswer = useCallback((answerIndex: number) => {
    setQuizState(prev => {
      if (prev.showExplanation) return prev
      const current = questions[prev.currentQuestion]
      if (!current) return prev
      return {
        ...prev,
        selectedAnswer: answerIndex,
        showExplanation: true,
        answers: { ...prev.answers, [current.id]: answerIndex }
      }
    })
  }, [questions])

  const nextQuestion = useCallback(() => {
    const nextIndex = quizState.currentQuestion + 1
    const hasMore = nextIndex < questions.length
    if (hasMore) onQuestionChange(nextIndex)
  }, [quizState.currentQuestion, questions.length, onQuestionChange])

  const toggleMarkForReview = useCallback(() => {
    setQuizState(prev => {
      const current = questions[prev.currentQuestion]
      if (!current) return prev
      const isMarked = prev.markedForReview.includes(current.id)
      const markedForReview = isMarked
        ? prev.markedForReview.filter(id => id !== current.id)
        : [...prev.markedForReview, current.id]
      return { ...prev, markedForReview }
    })
  }, [questions])

  const toggleXRay = useCallback(() => {
    setQuizState(prev => ({ ...prev, showXRay: !prev.showXRay }))
  }, [])

  const stats = useMemo(() => {
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
  }, [quizState.answers, questions])

  return {
    quizState,
    currentQuestion,
    selectAnswer,
    nextQuestion,
    toggleMarkForReview,
    toggleXRay,
    stats,
    totalQuestions: questions.length,
    loading,
    error
  }
}
