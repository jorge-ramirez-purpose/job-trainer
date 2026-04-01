import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { CheckCircle, XCircle, Circle } from '@phosphor-icons/react'
import { TQuestion } from '../types/Question'
import { slugToCategory, PHASES, PHASE_TITLES } from '../constants/phases'
import { loadProgress } from '../hooks/useProgress'

export const QuestionListPage = () => {
  const { phaseSlug = 'all' } = useParams()
  const navigate = useNavigate()

  const category = slugToCategory(phaseSlug)
  const isValidSlug = phaseSlug === 'all' || category !== null

  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (!isValidSlug) {
    return <Navigate to="/questions/all" replace />
  }

  const title = category ? PHASE_TITLES[category] ?? category : 'All questions'
  const progress = loadProgress()

  const getAnswerStatus = (q: TQuestion): 'correct' | 'wrong' | 'unanswered' => {
    const answer = progress.answers[q.id]
    if (answer === undefined) return 'unanswered'
    return answer === q.correctAnswer ? 'correct' : 'wrong'
  }

  const getCategoryColor = (cat: string) => {
    return PHASES.find(p => p.category === cat)?.color ?? 'bg-gray-400'
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No questions available.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-between">
        <div className="font-medium text-gray-900 dark:text-gray-100">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{questions.length} questions</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-[900px] mx-auto flex flex-col gap-1">
          {questions.map((q, i) => {
            const status = getAnswerStatus(q)

            return (
              <div
                key={q.id}
                onClick={() => {
                  navigate(`/quiz/${phaseSlug}/${i + 1}`, { state: { fromList: `/questions/${phaseSlug}` } })
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <span className="text-xs text-gray-400 dark:text-gray-500 w-7 text-right shrink-0">
                  {i + 1}
                </span>

                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getCategoryColor(q.category)}`} />

                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 w-16 truncate">
                  {q.tag}
                </span>

                <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                  {q.type === 'predict-output' ? 'predict' : 'choice'}
                </span>

                <span className="text-xs text-gray-800 dark:text-gray-200 truncate flex-1">
                  {q.question}
                </span>

                <span className="shrink-0">
                  {status === 'correct' && <CheckCircle size={16} weight="fill" className="text-emerald-500" />}
                  {status === 'wrong' && <XCircle size={16} weight="fill" className="text-red-500" />}
                  {status === 'unanswered' && <Circle size={16} className="text-gray-300 dark:text-gray-600" />}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
