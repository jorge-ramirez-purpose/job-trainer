import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Question } from '../shared/types';
import { createQuestionsRouter } from './routes/questions';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const questions: Question[] = JSON.parse(
  readFileSync(join(__dirname, 'data', 'questions.json'), 'utf-8')
);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/questions', createQuestionsRouter(questions));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
