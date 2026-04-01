import { useMemo, useCallback } from 'react'
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useQuiz } from '../hooks/useQuiz'
import { ArrowLeft } from '@phosphor-icons/react'
import { slugToCategory, PHASE_TITLES } from '../constants/phases'
import { TopBar } from '../components/quiz/TopBar'
import { StatsRow } from '../components/quiz/StatsRow'
import { QuestionCard } from '../components/quiz/QuestionCard'

export const QuizPage = () => {
  const { phaseSlug = 'all', index } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const fromList = (location.state as { fromList?: string } | null)?.fromList

  const category = slugToCategory(phaseSlug)
  const isValidSlug = phaseSlug === 'all' || category !== null
  const questionIndex = Math.max(0, (parseInt(index ?? '1', 10) || 1) - 1)

  const onQuestionChange = (newIndex: number) => {
    navigate(`/quiz/${phaseSlug}/${newIndex + 1}`, { replace: true })
  }

  const { quizState, questions, currentQuestion, selectAnswer, prevQuestion, nextQuestion, toggleMarkForReview, toggleXRay, stats, totalQuestions, loading, error } = useQuiz(category, questionIndex, onQuestionChange)

  const tags = useMemo(() => [...new Set(questions.map(q => q.tag))], [questions])

  const firstIndexByTag = useMemo(() => {
    const map: Record<string, number> = {}
    questions.forEach((q, i) => { if (!(q.tag in map)) map[q.tag] = i })
    return map
  }, [questions])

  const handleTagSelect = useCallback((tag: string) => {
    const idx = firstIndexByTag[tag]
    if (idx !== undefined) onQuestionChange(idx)
  }, [firstIndexByTag, onQuestionChange])

  if (!isValidSlug) {
    return <Navigate to="/quiz/all/1" replace />
  }

  const title = category ? PHASE_TITLES[category] ?? category : 'All phases'

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

  if (!currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No questions available.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {fromList && (
        <button
          onClick={() => navigate(fromList)}
          className="flex items-center gap-1 px-4 pt-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors self-start"
        >
          <ArrowLeft size={12} />
          Back to list
        </button>
      )}
      <TopBar
        title={title}
        tag={currentQuestion.tag}
        currentQuestion={quizState.currentQuestion}
        totalQuestions={totalQuestions}
        tags={tags}
        onTagSelect={handleTagSelect}
      />

      <div className="flex-1 p-4 overflow-y-auto w-full max-w-[900px] mx-auto">
        <StatsRow
          correct={stats.correct}
          wrong={stats.wrong}
          score={stats.score}
        />

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          showExplanation={quizState.showExplanation}
          showXRay={quizState.showXRay}
          isMarkedForReview={quizState.markedForReview.includes(currentQuestion.id)}
          onAnswerSelect={selectAnswer}
          onPrev={prevQuestion}
          onNext={nextQuestion}
          onToggleXRay={toggleXRay}
          onToggleMarkForReview={toggleMarkForReview}
        />
      </div>
    </div>
  )
}
