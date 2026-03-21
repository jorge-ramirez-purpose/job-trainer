import { Router, Request, Response } from 'express';
import { Question } from '../../shared/types';

export function createQuestionsRouter(questions: Question[]) {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    let filtered = questions;

    const { category, tag } = req.query;

    if (typeof category === 'string') {
      filtered = filtered.filter(
        (q) => q.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (typeof tag === 'string') {
      filtered = filtered.filter(
        (q) => q.tag.toLowerCase() === tag.toLowerCase()
      );
    }

    res.json(filtered);
  });

  router.get('/:id', (req: Request, res: Response) => {
    const question = questions.find((q) => q.id === req.params.id);

    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    res.json(question);
  });

  return router;
}
