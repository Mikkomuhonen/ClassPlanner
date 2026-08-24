## Context

Notes and todos are now week-scoped arrays (`weekData[key].notes`, `weekData[key].todos`) pointed to by the `notes` and `todos` variables. The notes header already contains color picker buttons and an "add" button. The todos header contains only an "add" button. Both headers are rendered inline in the HTML.

## Goals / Non-Goals

**Goals:**
- Add a clear button to each panel header separately
- Show `confirm()` before clearing
- Show a timed undo button (5 s) after clearing
- Undo is in-memory only

**Non-Goals:**
- Clearing both panels with a single action
- Persistent undo across page reload or week navigation
- Clearing only completed todos (all-or-nothing)

## Decisions

### 1. Undo storage

Before clearing, snapshot the current array:
```js
// Notes
undoNotes = notes.map(n => ({ ...n }));  // shallow copy is sufficient
notes.length = 0;
saveNotes();
renderNotes();
startUndoTimer('notes');

// Todos
undoTodos = todos.map(t => ({ ...t }));
todos.length = 0;
saveTodos();
renderTodos();
startUndoTimer('todos');
```

Two module-level variables (`undoNotes`, `undoTodos`) hold the snapshots. They are `null` when no undo is pending.

### 2. Undo button lifecycle

`startUndoTimer(panel)` shows a `↺ Kumoa` button in the relevant panel header and sets a 5-second `setTimeout`. When the timer fires, the button is removed and the snapshot is nulled. If the user clicks undo before the timer fires, the timer is cleared.

The undo button is inserted into the existing header `div` at render time and removed on expiry or activation. No separate container element is needed.

### 3. Undo invalidated on week navigation

`loadNotesFromWeek(key)` already replaces `notes` and `todos` references. After navigation, the undo snapshots are stale. Setting `undoNotes = null; undoTodos = null;` at the start of `loadNotesFromWeek` cleanly invalidates both — no timer cancellation is needed since the buttons will have been removed from the DOM by the panel re-render.

### 4. Clear button placement

Clear button appended to the existing header row for each panel, after the current last button:
- Notes: after `[+ Uusi lappu]`
- Todos: after `[+ Uusi]`

Style: same small ghost-button style as other header controls.

## Risks / Trade-offs

- **`confirm()` blocks the main thread**: acceptable for a destructive action; no async needed.
- **Timer fires after navigation**: the undo button will be gone from the DOM (re-rendered), so the expired callback is a no-op — no error.
