import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFilteredQuiz, TPersistedProgress } from '../hooks/useProgress'
import { TQuestion } from '../types/Question'
import { TopBar } from '../components/quiz/TopBar'
import { QuestionCard } from '../components/quiz/QuestionCard'

const isMarkedForReview = (q: TQuestion, progress: TPersistedProgress) => {
  return progress.markedForReview.includes(q.id)
}

export const MarkedPage = () => {
  const { index } = useParams()
  const navigate = useNavigate()
  const questionIndex = Math.max(0, (parseInt(index ?? '1', 10) || 1) - 1)

  const onQuestionChange = useCallback((newIndex: number) => {
    navigate(`/marked/${newIndex + 1}`, { replace: true })
  }, [navigate])

  const { currentQuestion, currentIndex, nextQuestion, toggleMarkForReview, totalQuestions, loading, error, progress } = useFilteredQuiz(isMarkedForReview, questionIndex, onQuestionChange)

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
        <p className="text-gray-500 dark:text-gray-400">No marked questions.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <TopBar
        title="Marked for review"
        tag={currentQuestion.tag}
        currentQuestion={currentIndex}
        totalQuestions={totalQuestions}
      />

      <div className="flex-1 p-4 overflow-y-auto w-full max-w-[900px] mx-auto">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={progress.answers[currentQuestion.id] ?? null}
          showExplanation={progress.answers[currentQuestion.id] !== undefined}
          showXRay={false}
          isMarkedForReview={true}
          onAnswerSelect={() => {}}
          onNext={nextQuestion}
          onToggleXRay={() => {}}
          onToggleMarkForReview={toggleMarkForReview}
        />
      </div>
    </div>
  )
}
