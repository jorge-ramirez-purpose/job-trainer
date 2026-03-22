import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TQuestion } from '../shared/types'
import questions from '../server/data/questions.json'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { category, tag } = req.query

  let filtered: TQuestion[] = questions as TQuestion[]

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
