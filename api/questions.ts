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
  readFileSync(join(__dirname, '..', 'server', 'data', 'questions.json'), 'utf-8')
)

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { category, tag } = req.query

  let filtered = questions

  if (typeof category === 'string') {
    filtered = filtered.filter(
      (q) => q.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (typeof tag === 'string') {
    filtered = filtered.filter(
      (q) => q.tag.toLowerCase() === tag.toLowerCase()
    )
  }

  res.json(filtered)
}
