import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'

type TQuestion = {
  id: string
  category: string
  tag: string
  type: string
  question: string
  code?: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: TQuestion[] = JSON.parse(
  readFileSync(join(process.cwd(), 'server', 'data', 'questions.json'), 'utf-8')
)

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid question ID' })
    return
  }

  const question = questions.find((q) => q.id === id)

  if (!question) {
    res.status(404).json({ error: 'Question not found' })
    return
  }

  res.json(question)
}
