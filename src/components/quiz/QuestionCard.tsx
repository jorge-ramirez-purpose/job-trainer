import { Question } from '../../types/Question'

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  showExplanation: boolean
  onAnswerSelect: (index: number) => void
  onNext: () => void
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
  onNext
}: QuestionCardProps) => {
  const getOptionStyle = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index 
        ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 dark:border-indigo-400'
        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
    }
    
    if (index === question.correctAnswer) {
      return 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'border-red-600 bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200'
    }
    
    return 'border-gray-300 bg-white text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-3">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
        {question.type === 'predict-output' ? 'Predict the output' : 'Multiple choice'}
      </div>
      
      <div className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed mb-3">
        {question.question}
      </div>
      
      {question.code && (
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-3 mb-3 font-mono text-xs text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
          {question.code}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showExplanation}
            className={`border rounded-lg p-2 text-xs font-mono cursor-pointer text-left transition-colors ${getOptionStyle(index)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 leading-relaxed mb-3 dark:bg-emerald-900/50 dark:border-emerald-600 dark:text-emerald-200">
          <strong>Why:</strong> {question.explanation}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button className="text-xs px-3.5 py-1.5 rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors">
          Mark for review
        </button>
        <div className="flex-1"></div>
        <button className="text-xs px-3.5 py-1.5 rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors">
          Skip
        </button>
        {showExplanation && (
          <button 
            onClick={onNext}
            className="text-xs px-3.5 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
          >
            Next question →
          </button>
        )}
      </div>
    </div>
  )
}