type TProps = {
  correct: number
  wrong: number
  score: number
}

export const StatsRow = ({ correct, wrong, score }: TProps) => {
  const total = correct + wrong
  const hasAnswered = total > 0

  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
        <div className="text-xl font-medium text-gray-900 dark:text-gray-100">{correct}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Correct</div>
        <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1.5">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-300" 
            style={{ width: hasAnswered ? `${(correct / total) * 100}%` : '0%' }}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
        <div className="text-xl font-medium text-gray-900 dark:text-gray-100">{wrong}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Wrong</div>
        <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1.5">
          <div 
            className="h-full bg-red-500 rounded-full transition-all duration-300" 
            style={{ width: hasAnswered ? `${(wrong / total) * 100}%` : '0%' }}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
        <div className="text-xl font-medium text-gray-900 dark:text-gray-100">{score}%</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Score</div>
        <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1.5">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-300" 
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  )
}