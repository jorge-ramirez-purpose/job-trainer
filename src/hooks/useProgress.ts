import { useState, useEffect, useCallback, useMemo } from 'react'
import { TQuestion } from '../types/Question'

const STORAGE_KEY = 'quiz-progress'

export type TPersistedProgress = {
  answers: Record<string, number>
  markedForReview: string[]
}

export const loadProgress = (): TPersistedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { answers: {}, markedForReview: [] }
    return JSON.parse(raw)
  } catch {
    return { answers: {}, markedForReview: [] }
  }
}

export const saveProgress = (progress: TPersistedProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export const useFilteredQuiz = (
  filterFn: (q: TQuestion, progress: TPersistedProgress) => boolean,
  questionIndex: number,
  onQuestionChange: (newIndex: number) => void
) => {
  const [allQuestions, setAllQuestions] = useState<TQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<TPersistedProgress>(loadProgress)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetch('/api/questions', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setAllQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  // Re-read progress from storage to stay in sync with quiz answers
  useEffect(() => {
    const onStorage = () => setProgress(loadProgress())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const questions = useMemo(
    () => allQuestions.filter(q => filterFn(q, progress)),
    [allQuestions, progress, filterFn]
  )

  const clampedIndex = Math.min(questionIndex, Math.max(0, questions.length - 1))
  const currentQuestion = questions[clampedIndex]

  const prevQuestion = useCallback(() => {
    const prevIndex = clampedIndex - 1
    if (prevIndex >= 0) onQuestionChange(prevIndex)
  }, [clampedIndex, onQuestionChange])

  const nextQuestion = useCallback(() => {
    const nextIndex = clampedIndex + 1
    if (nextIndex < questions.length) onQuestionChange(nextIndex)
  }, [clampedIndex, questions.length, onQuestionChange])

  const toggleMarkForReview = useCallback(() => {
    if (!currentQuestion) return
    setProgress(prev => {
      const isMarked = prev.markedForReview.includes(currentQuestion.id)
      const markedForReview = isMarked
        ? prev.markedForReview.filter(id => id !== currentQuestion.id)
        : [...prev.markedForReview, currentQuestion.id]
      const next = { ...prev, markedForReview }
      saveProgress(next)
      return next
    })
  }, [currentQuestion])

  return {
    questions,
    currentQuestion,
    currentIndex: clampedIndex,
    prevQuestion,
    nextQuestion,
    toggleMarkForReview,
    totalQuestions: questions.length,
    loading,
    error,
    progress
  }
}
