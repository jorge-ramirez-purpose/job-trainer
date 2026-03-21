interface TopBarProps {
  title: string
  tag: string
  currentQuestion: number
  totalQuestions: number
}

export const TopBar = ({ title, tag, currentQuestion, totalQuestions }: TopBarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center gap-2.5">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1">
        {title}
      </div>
      <span className="text-xs px-2 py-0.5 rounded-full border bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-400">
        {tag}
      </span>
      <span className="text-xs px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
        Q {currentQuestion + 1} / {totalQuestions}
      </span>
    </div>
  )
}