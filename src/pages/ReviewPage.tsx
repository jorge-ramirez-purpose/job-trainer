import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFilteredQuiz, TPersistedProgress } from '../hooks/useProgress'
import { TQuestion } from '../types/Question'
import { TopBar } from '../components/quiz/TopBar'
import { QuestionCard } from '../components/quiz/QuestionCard'

const isWrongAnswer = (q: TQuestion, progress: TPersistedProgress) => {
  const answer = progress.answers[q.id]
  return answer !== undefined && answer !== q.correctAnswer
}

export const ReviewPage = () => {
  const { index } = useParams()
  const navigate = useNavigate()
  const questionIndex = Math.max(0, (parseInt(index ?? '1', 10) || 1) - 1)

  const onQuestionChange = useCallback((newIndex: number) => {
    navigate(`/review/${newIndex + 1}`, { replace: true })
  }, [navigate])

  const { currentQuestion, currentIndex, prevQuestion, nextQuestion, toggleMarkForReview, totalQuestions, loading, error, progress } = useFilteredQuiz(isWrongAnswer, questionIndex, onQuestionChange)

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
        <p className="text-gray-500 dark:text-gray-400">No wrong answers to review.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <TopBar
        title="Review wrong answers"
        tag={currentQuestion.tag}
        currentQuestion={currentIndex}
        totalQuestions={totalQuestions}
      />

      <div className="flex-1 p-4 overflow-y-auto w-full max-w-[900px] mx-auto">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={progress.answers[currentQuestion.id] ?? null}
          showExplanation={true}
          showXRay={false}
          isMarkedForReview={progress.markedForReview.includes(currentQuestion.id)}
          onAnswerSelect={() => {}}
          onPrev={prevQuestion}
          onNext={nextQuestion}
          onToggleXRay={() => {}}
          onToggleMarkForReview={toggleMarkForReview}
        />
      </div>
    </div>
  )
}
