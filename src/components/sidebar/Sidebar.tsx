import { PHASES } from '../../constants/phases'

type TProps = {
  currentPhase: string | null
  onPhaseSelect: (phase: string | null) => void
}

export const Sidebar = ({ currentPhase, onPhaseSelect }: TProps) => {
  return (
    <div className="w-52 border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 flex-shrink-0 py-3.5">
      <div className="px-3.5 pb-3 text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 mb-2">
        Interview prep
        <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-0.5">
          frontend · jorge
        </div>
      </div>

      <div className="px-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1.5 mb-1">
          Phases
        </div>
        <div
          onClick={() => onPhaseSelect(null)}
          className={`flex items-center gap-2 px-1.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
            currentPhase === null
              ? 'bg-gray-100 text-gray-900 font-medium dark:bg-gray-700 dark:text-gray-100'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          All phases
          <span className="ml-auto text-xs text-gray-500">128</span>
        </div>
        {PHASES.map((phase) => (
          <div
            key={phase.name}
            onClick={() => onPhaseSelect(phase.category)}
            className={`flex items-center gap-2 px-1.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              currentPhase === phase.category
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
    </div>
  )
}
