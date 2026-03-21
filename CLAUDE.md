# Project: job-trainer

Frontend interview prep quiz app — React + TypeScript + Vite frontend, Express API backend.

## Commands

```bash
npm run dev          # Vite frontend (port 5173)
npm run dev:server   # Express API (port 3001)
npm run dev:all      # Both at once
npm run build        # tsc + vite build
npx tsc --noEmit     # Type-check without building
```

## Code style

- Use `type` instead of `interface`. Prefix all type names with `T` (e.g. `TQuestionCardProps`, `TQuestion`)
- Use ES modules (import/export), not CommonJS
- React components: functional with arrow functions
- Tailwind CSS for all styling — no CSS modules or styled-components

## Commit rules

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- NEVER include Co-Authored-By or any AI/Claude attribution in commit messages
- Keep subject line concise

## Workflow

- Run `npx tsc --noEmit` after making type changes to catch errors
- Update README.md after completing any major feature
- Small, focused commits — one logical change per commit
- Prefer editing existing files over creating new ones

## Architecture

- `src/components/` — UI only, no business logic
- `src/hooks/` — Custom hooks (data fetching, state management)
- `src/types/` — Re-exports from `shared/types.ts`
- `server/` — Express API (port 3001), serves questions from JSON
- `shared/` — Types shared between client and server
- Vite proxies `/api/*` to the Express server in dev

## Questions data

- 112 questions in `server/data/questions.json`
- Categories: JavaScript, React, TypeScript, Patterns, HTML/CSS & SQL
- Question types: `predict-output`, `multiple-choice`
- API supports `?category=X&tag=Y` filtering
