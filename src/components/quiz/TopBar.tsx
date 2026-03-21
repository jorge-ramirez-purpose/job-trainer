import { useState, useRef, useEffect } from 'react'

type TProps = {
  title: string
  tag: string
  currentQuestion: number
  totalQuestions: number
  tags?: string[]
  onTagSelect?: (tag: string) => void
}

export const TopBar = ({ title, tag, currentQuestion, totalQuestions, tags, onTagSelect }: TProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const hasDropdown = tags && tags.length > 1 && onTagSelect

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleTagClick = (selectedTag: string) => {
    onTagSelect?.(selectedTag)
    setIsOpen(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center gap-2.5">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1">
        {title}
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => hasDropdown && setIsOpen(!isOpen)}
          className={`text-xs px-2 py-0.5 rounded-full border bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-400 ${
            hasDropdown ? 'cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/70' : 'cursor-default'
          }`}
        >
          {tag} {hasDropdown && '▾'}
        </button>
        {isOpen && tags && (
          <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 py-1 max-h-64 overflow-y-auto">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => handleTagClick(t)}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                  t === tag
                    ? 'bg-purple-50 text-purple-800 font-medium dark:bg-purple-900/50 dark:text-purple-200'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="text-xs px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
        Q {currentQuestion + 1} / {totalQuestions}
      </span>
    </div>
  )
}
