import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import '../../styles/prism-custom.css'

type TProps = {
  code: string
  language?: string
  className?: string
}

export const CodeBlock = ({ code, language = 'javascript', className = '' }: TProps) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])
  
  return (
    <div className={`bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-3 mb-3 font-mono text-xs leading-relaxed overflow-x-auto ${className}`}>
      <pre className="!bg-transparent !border-none !p-0 !m-0 !font-mono">
        <code className={`language-${language} !bg-transparent !font-mono text-xs leading-relaxed text-gray-900 dark:text-gray-100`}>
          {code}
        </code>
      </pre>
    </div>
  )
}