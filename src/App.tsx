import { useQuiz } from './hooks/useQuiz'
import { Sidebar } from './components/sidebar/Sidebar'
import { TopBar } from './components/quiz/TopBar'
import { StatsRow } from './components/quiz/StatsRow'
import { QuestionCard } from './components/quiz/QuestionCard'

const App = () => {
  const {
    quizState,
    currentQuestion,
    selectAnswer,
    nextQuestion,
    toggleXRay,
    getStats,
    totalQuestions,
    loading,
    error
  } = useQuiz()

  const stats = getStats()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">No questions available.</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen text-sm bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPhase="React" currentMode="Quiz" />

      <div className="flex-1 flex flex-col">
        <TopBar
          title="React core mechanics"
          tag={currentQuestion.tag}
          currentQuestion={quizState.currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="flex-1 p-4 overflow-y-auto  w-full max-w-[900px] mx-auto">
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
            onAnswerSelect={selectAnswer}
            onNext={nextQuestion}
            onToggleXRay={toggleXRay}
          />
        </div>
      </div>
    </div>
  )
}

export default App
