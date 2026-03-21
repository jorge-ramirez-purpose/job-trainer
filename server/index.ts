import express from 'express';
import cors from 'cors';
import { TQuestion } from '../shared/types';
import { createQuestionsRouter } from './routes/questions';
import questions from './data/questions.json';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/questions', createQuestionsRouter(questions as TQuestion[]));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
