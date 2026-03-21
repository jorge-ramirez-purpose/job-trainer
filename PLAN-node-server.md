# Plan: Add Node.js Server for Questions Storage

## Context

The job-trainer app currently has 20 interview questions hardcoded in `src/data/questions.ts`. There's no backend — it's a pure React + Vite SPA. We need to add a Node.js Express server that stores and serves these questions via a REST API, so the frontend fetches them instead of importing them directly.

## Project Structure (new files)

```
server/
  index.ts              — Express entry point (port 3001)
  routes/questions.ts   — GET /api/questions, GET /api/questions/:id
  data/questions.json   — migrated question data
  tsconfig.json         — server-specific TS config
shared/
  types.ts              — Question & QuizState interfaces (used by both sides)
```

## Implementation Steps

### 1. Install dependencies
```
npm install express cors
npm install -D @types/express @types/cors tsx
```

### 2. Create `shared/types.ts`
Move `Question` and `QuizState` interfaces from `src/types/Question.ts` into `shared/types.ts`. Update `src/types/Question.ts` to re-export from `shared/types`.

### 3. Update `tsconfig.json`
Change `"include": ["src"]` → `"include": ["src", "shared"]` so the client can import shared types.

### 4. Create `server/data/questions.json`
Convert the 20 questions from `src/data/questions.ts` into a plain JSON array (strip TS type annotations).

### 5. Create `server/tsconfig.json`
Separate TS config for Node.js (no DOM libs, ESNext module, includes `server/` and `shared/`).

### 6. Create `server/routes/questions.ts`
- `GET /` — returns all questions; supports optional `?category=X&tag=Y` filtering
- `GET /:id` — returns a single question or 404

### 7. Create `server/index.ts`
Express app: load questions.json, mount routes at `/api/questions`, listen on port 3001.

### 8. Update `vite.config.ts`
Add proxy so `/api/*` forwards to `http://localhost:3001`:
```ts
server: {
  proxy: {
    '/api': { target: 'http://localhost:3001', changeOrigin: true }
  }
}
```

### 9. Update `src/hooks/useQuiz.ts`
Replace `import { questions }` with `fetch('/api/questions')` in a `useEffect`. Add `loading` and `error` state. Return them from the hook.

### 10. Update `src/App.tsx`
Handle `loading` and `error` from the hook — show a loading indicator / error message. Guard against `currentQuestion` being undefined while loading.

### 11. Delete `src/data/questions.ts`
No longer needed once the API is serving questions.

### 12. Update `package.json` scripts
Add `"dev:server": "tsx watch server/index.ts"` for running the backend with auto-reload.

## Files Modified
- `src/types/Question.ts` — re-export from shared
- `src/hooks/useQuiz.ts` — fetch from API instead of import
- `src/App.tsx` — handle loading/error states
- `vite.config.ts` — add proxy config
- `tsconfig.json` — add `shared` to include
- `package.json` — new deps + scripts

## Files Created
- `shared/types.ts`
- `server/index.ts`
- `server/routes/questions.ts`
- `server/data/questions.json`
- `server/tsconfig.json`

## Files Deleted
- `src/data/questions.ts`

## Verification
1. Start server: `npm run dev:server` → curl `http://localhost:3001/api/questions` returns 20 questions
2. Start frontend: `npm run dev` → app loads, questions render from API
3. Test filtering: `curl http://localhost:3001/api/questions?category=React`
4. Test single question: `curl http://localhost:3001/api/questions/q1`
5. Verify loading state shows briefly before questions appear
