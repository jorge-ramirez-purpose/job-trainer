# Interview Prep App

A React + TypeScript + Vite quiz app for frontend interview preparation, backed by a Node.js Express API.

## Features

- **Quiz Mode**: 128 interactive questions with predict-output and multiple-choice formats
- **Phase Navigation**: Filter questions by topic area from the sidebar
- **URL Routing**: Every phase and question is accessible via URL (e.g. `/quiz/react/5`)
- **Review Wrong Answers**: Browse questions you got wrong with explanations
- **Marked for Review**: Flag questions and revisit them later
- **X-Ray Mode**: Peek at the correct answer before committing
- **Syntax Highlighting**: Code snippets rendered with PrismJS
- **Progress Persistence**: Answers and marks saved to localStorage

## Topics Covered (128 questions)

| Phase | Questions | Topics |
|-------|-----------|--------|
| JS core | 20 | closures, event loop, promises, async/await, prototypes, this, coercion, scope |
| React | 40 | useState batching, stale closures, useEffect deps, useRef, useMemo, useCallback, context, reconciliation & keys, controlled components, custom hooks, data fetching, React.memo |
| TypeScript | 24 | generics, utility types, narrowing, discriminated unions, type guards, mapped types, conditional types |
| Patterns | 16 | debounce/throttle, observer, pub/sub, module, factory, singleton, strategy |
| HTML/CSS & SQL | 12 | specificity, flexbox, grid, positioning, joins, indexing, normalization |
| Node.js & Express | 16 | middleware, routing, error handling, req/res lifecycle, async patterns, REST design, environment & config, security basics |

## Routes

```
/quiz/all/1              # All phases, question 1
/quiz/react/5            # React phase, question 5
/quiz/typescript/1       # TypeScript phase, question 1
/quiz/html-css-sql/3     # HTML/CSS & SQL, question 3
/quiz/nodejs-express/1   # Node.js & Express, question 1
/review/1                # Wrong answers, first question
/marked/1                # Marked for review, first question
```

## Getting Started

```bash
# Install dependencies
npm install

# Start both frontend and backend
npm run dev:all

# Or run them separately:
npm run dev          # Vite frontend on port 5173
npm run dev:server   # Express API on port 3001
```

## Project Structure

```
src/
  components/       # React UI components
  constants/        # Phase definitions, slug mappings
  hooks/            # useQuiz, useProgress, useFilteredQuiz
  pages/            # QuizPage, ReviewPage, MarkedPage
  types/            # Re-exports shared types
  styles/           # PrismJS custom theme
server/
  index.ts          # Express entry point (port 3001)
  routes/           # API route handlers
  data/             # questions.json (128 questions)
shared/
  types.ts          # TQuestion, TQuizState (used by both sides)
```

## API

The Express server serves questions at `http://localhost:3001`:

```
GET /api/questions                        # all questions
GET /api/questions?category=React         # filter by category
GET /api/questions?tag=closures           # filter by tag
GET /api/questions/:id                    # single question
```

## Tech Stack

- React 18 + TypeScript
- React Router (URL-based navigation)
- Vite (dev server + build)
- Tailwind CSS
- PrismJS (syntax highlighting)
- Express + cors (API server)
- tsx (server dev runner)
