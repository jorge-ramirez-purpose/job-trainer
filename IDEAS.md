# Ideas for Future Implementation

## Real Interview Scenario Questions

Add a new phase or question type based on actual interview questions Jorge has received. These are more architectural/scenario-based than the current predict-output and multiple-choice formats.

### Why this matters

Current questions test knowledge of APIs and language mechanics. Real interviews increasingly test system thinking — how you'd architect a solution, handle edge cases, and make tradeoffs under constraints. These questions bridge that gap.

### Format considerations

- **New question type?** Current types (`predict-output`, `multiple-choice`) work for factual questions. Scenario questions ("how would you build X") could still use `multiple-choice` where each option is a different architectural approach, with the explanation covering tradeoffs of each.
- **New phase vs mixed in?** These questions span multiple domains (React + networking, performance + data structures). A dedicated "Scenarios" or "System Design" phase keeps them together. Alternatively, tag them by primary domain and distribute across existing phases.
- **Difficulty level** — Consider adding a `difficulty` field to TQuestion (`'easy' | 'medium' | 'hard'`). Scenario questions are inherently harder and could be filtered separately.

### Collected interview questions

#### 1. Offline-first audio transcription

**Question asked:** "How would you develop a React app that transcribes live audio? What would you do if the internet connection goes down but you need to continue recording? How would you efficiently store the file?"

**Topics this covers:**
- MediaRecorder API / Web Audio API for capturing audio in the browser
- Service Workers for offline detection and background sync
- IndexedDB for local storage of binary blobs (audio chunks) when offline
- Chunked upload strategy — send small segments as they're recorded, queue unsent chunks when offline
- Reconnection handling — resume uploading queued chunks when connection returns
- Storage efficiency — choose format (WebM/Opus vs WAV), compress before storing, stream chunks rather than buffering the entire file in memory
- Optimistic UI — show recording progress even when offline, sync status indicator
- Edge cases: browser tab close during offline recording (beforeunload + IndexedDB persistence), storage quota limits, partial chunk corruption

**Possible multiple-choice framing:**
- "Which browser API is best for storing large audio blobs offline?" → IndexedDB (not localStorage which has 5MB limit, not cookies, not sessionStorage)
- "What strategy ensures no audio is lost during intermittent connectivity?" → Queue chunks in IndexedDB + background sync on reconnect
- "How do you detect when the connection drops in a React app?" → navigator.onLine + 'online'/'offline' events + ping-based health check

#### 2. Efficiently deleting from a large array without re-rendering everything

**Question asked:** "How would you handle an array of 1,000 elements where you delete one? How do you prevent re-rendering or messing up the whole array?"

**Topics this covers:**
- React reconciliation and keys — using stable unique IDs (not array index) as keys so React can identify which item was removed
- React.memo on list items — prevent siblings from re-rendering when one item is removed
- Virtualization (react-window, react-virtuoso) — only render visible items, so removing one item from a 1,000-item list only affects the ~20 visible rows
- State update pattern — use filter() to create a new array reference (immutability) but React's diffing + keys ensure only the removed DOM node is destroyed
- useCallback for handlers passed to list items — prevent new function references from breaking React.memo
- Pagination vs infinite scroll vs virtualization tradeoffs
- Edge cases: removing the last item in a virtualized window, removing an item while scrolling, batch deletions

**Possible multiple-choice framing:**
- "What key strategy prevents React from re-rendering all 1,000 items when one is deleted?" → Stable unique IDs as keys + React.memo on each item
- "Which technique renders only visible items from a 1,000-element list?" → Virtualization (react-window / react-virtuoso)
- "Why does using array index as key cause issues when deleting items?" → React reuses components by position, causing state to shift to wrong items

### More scenario ideas to collect

These are common frontend interview scenarios worth adding as Jorge encounters them:

- **Real-time collaborative editing** — how to handle conflicts when two users edit the same document (CRDTs, OT, WebSockets)
- **Optimistic UI updates** — show the result before the server confirms, roll back on failure
- **Authentication flow** — JWT refresh tokens, silent renewal, handling expired sessions mid-form
- **Image upload with preview** — FileReader, object URLs, compression before upload, progress tracking
- **Search with debounce + caching** — avoid redundant API calls, cancel in-flight requests, show stale results while loading
- **Drag and drop reordering** — state management for order changes, optimistic reorder, persisting to backend
- **Form with complex validation** — dependent field validation, async validation (check username availability), error display strategy
- **Dark mode implementation** — CSS variables vs Tailwind dark:, system preference detection, persistence, flash prevention on load

### Implementation checklist (when ready)

- [ ] Decide on phase name: "Scenarios" / "System Design" / "Real World"
- [ ] Decide if new question type is needed or if multiple-choice with longer explanations suffices
- [ ] Add `difficulty` field to TQuestion type (optional, for future filtering)
- [ ] Jorge provides real questions as he encounters them — format into quiz structure
- [ ] Consider adding a "discussion" field alongside explanation for open-ended talking points
- [ ] Update sidebar, constants, and README when phase is added
