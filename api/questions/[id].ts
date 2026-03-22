import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TQuestion } from '../../shared/types'
import questions from '../../server/data/questions.json'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid question ID' })
    return
  }

  const question = (questions as TQuestion[]).find((q) => q.id === id)

  if (!question) {
    res.status(404).json({ error: 'Question not found' })
    return
  }

  res.json(question)
}
