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
    totalQuestions
  } = useQuiz()

  const stats = getStats()

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