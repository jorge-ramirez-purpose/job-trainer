import { useQuiz } from './hooks/useQuiz'
import { Sidebar } from './components/sidebar/Sidebar'
import { TopBar } from './components/quiz/TopBar'
import { StatsRow } from './components/quiz/StatsRow'
import { QuestionCard } from './components/quiz/QuestionCard'
import { PHASE_TITLES } from './constants/phases'

const App = () => {
  const {
    quizState,
    currentQuestion,
    selectAnswer,
    nextQuestion,
    toggleMarkForReview,
    toggleXRay,
    getStats,
    totalQuestions,
    loading,
    error,
    category,
    selectCategory
  } = useQuiz()

  const stats = getStats()
  const title = category ? PHASE_TITLES[category] ?? category : 'All phases'

  if (loading) {
    return (
      <div className="flex h-screen text-sm bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPhase={category} currentMode="Quiz" onPhaseSelect={selectCategory} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen text-sm bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPhase={category} currentMode="Quiz" onPhaseSelect={selectCategory} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-screen text-sm bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPhase={category} currentMode="Quiz" onPhaseSelect={selectCategory} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No questions available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen text-sm bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPhase={category} currentMode="Quiz" onPhaseSelect={selectCategory} />

      <div className="flex-1 flex flex-col">
        <TopBar
          title={title}
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
            isMarkedForReview={quizState.markedForReview.includes(currentQuestion.id)}
            onAnswerSelect={selectAnswer}
            onNext={nextQuestion}
            onToggleXRay={toggleXRay}
            onToggleMarkForReview={toggleMarkForReview}
          />
        </div>
      </div>
    </div>
  )
}

export default App
