# Interview Prep App

A React + TypeScript + Vite quiz app for frontend interview preparation, backed by a Node.js Express API.

## Features

- **Quiz Mode**: 112 interactive questions with predict-output and multiple-choice formats
- **Phase Navigation**: Filter questions by topic area from the sidebar
- **X-Ray Mode**: Peek at the correct answer before committing
- **Syntax Highlighting**: Code snippets rendered with PrismJS
- **Progress Tracking**: Correct/wrong/score stats per session

## Topics Covered (112 questions)

| Phase | Questions | Topics |
|-------|-----------|--------|
| JS core | 20 | closures, event loop, promises, async/await, prototypes, this, coercion, scope |
| React | 40 | useState batching, stale closures, useEffect deps, useRef, useMemo, useCallback, context, reconciliation & keys, controlled components, custom hooks, data fetching, React.memo |
| TypeScript | 24 | generics, utility types, narrowing, discriminated unions, type guards, mapped types, conditional types |
| Patterns | 16 | debounce/throttle, observer, pub/sub, module, factory, singleton, strategy |
| HTML/CSS & SQL | 12 | specificity, flexbox, grid, positioning, joins, indexing, normalization |

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
  hooks/            # useQuiz hook (fetches from API)
  types/            # Re-exports shared types
  styles/           # PrismJS custom theme
server/
  index.ts          # Express entry point (port 3001)
  routes/           # API route handlers
  data/             # questions.json (112 questions)
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
- Vite (dev server + build)
- Tailwind CSS
- PrismJS (syntax highlighting)
- Express + cors (API server)
- tsx (server dev runner)
