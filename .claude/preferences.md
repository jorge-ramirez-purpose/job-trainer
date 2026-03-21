# Claude Code Preferences

## Commit Standards
- Use conventional commits format: `type: description`
- Keep commit messages under 50 characters
- Types: feat, fix, refactor, docs, test, chore
- Co-author: Jorge <jarp9665de@gmail.com>

## Code Standards
- Use React + TypeScript + Vite
- Use Tailwind CSS for styling
- Follow Domain Driven Design principles
- Components should not contain business logic
- Move functions to /utils folders with tests
- Use pnpm instead of npm when possible

## Project Structure
- /src/components - UI components only
- /src/hooks - Custom React hooks
- /src/utils - Business logic and utilities
- /src/types - TypeScript interfaces
- /src/data - Static data