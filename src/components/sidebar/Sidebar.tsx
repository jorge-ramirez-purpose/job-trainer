type TSidebarProps = {
  currentPhase: string
  currentMode: string
}

export const Sidebar = ({ currentPhase = 'React', currentMode = 'Quiz' }: TSidebarProps) => {
  const phases = [
    { name: 'JS core', progress: '20/20', color: 'bg-purple-500', active: false },
    { name: 'React', progress: '40/40', color: 'bg-emerald-500', active: currentPhase === 'React' },
    { name: 'TypeScript', progress: '24/24', color: 'bg-amber-500', active: false },
    { name: 'Patterns', progress: '0/16', color: 'bg-red-500', active: false },
    { name: 'HTML/CSS & SQL', progress: '0/12', color: 'bg-blue-500', active: false }
  ]

  const modes = [
    { name: 'Quiz', active: currentMode === 'Quiz' },
    { name: 'Flashcards', active: currentMode === 'Flashcards' },
    { name: 'Review wrongs', active: false }
  ]

  return (
    <div className="w-52 border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0 py-3.5">
      <div className="px-3.5 pb-3 text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 mb-2">
        Interview prep 
        <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-0.5">
          frontend · jorge
        </div>
      </div>
      
      <div className="px-2 mb-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1.5 mb-1">
          Phases
        </div>
        {phases.map((phase) => (
          <div 
            key={phase.name}
            className={`flex items-center gap-2 px-1.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              phase.active 
                ? 'bg-gray-100 text-gray-900 font-medium dark:bg-gray-700 dark:text-gray-100' 
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${phase.color}`} />
            {phase.name}
            <span className="ml-auto text-xs text-gray-500">
              {phase.progress}
            </span>
          </div>
        ))}
      </div>

      <div className="px-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1.5 mb-1">
          Mode
        </div>
        {modes.map((mode) => (
          <div 
            key={mode.name}
            className={`px-1.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              mode.active 
                ? 'bg-gray-100 text-gray-900 font-medium dark:bg-gray-700 dark:text-gray-100' 
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            {mode.name}
          </div>
        ))}
      </div>
    </div>
  )
}