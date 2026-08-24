## 1. Shared undo infrastructure

- [x] 1.1 Add two module-level variables `let undoNotes = null` and `let undoTodos = null` near the other notes/todos state; verify they are accessible in the notes and todos functions
- [x] 1.2 In `loadNotesFromWeek(key)`, add `undoNotes = null; undoTodos = null;` at the start so snapshots are invalidated on week navigation; verify the variables are null after calling `loadNotesFromWeek`

## 2. Clear notes

- [x] 2.1 Add a `clearNotesBtn` button to the notes panel header (after `#addNoteBtn`) with label "🗑 Tyhjennä" and the same small ghost-button style as `#addNoteBtn`; verify the button is visible in the notes header
- [x] 2.2 Wire `clearNotesBtn` click: show `confirm('Tyhjennetäänkö kaikki muistiinpanot?')`; if cancelled, do nothing; verify a cancel leaves notes unchanged
- [x] 2.3 On confirm: snapshot `undoNotes = notes.map(n => ({...n}))`, clear `notes.length = 0`, call `saveNotes()` and `renderNotes()`; verify the notes panel is empty after confirming
- [x] 2.4 After clearing notes, insert an "↺ Kumoa" button into the notes header and start a 5-second timer that removes the button and sets `undoNotes = null` on expiry; verify the undo button appears after clearing and disappears after 5 seconds
- [x] 2.5 Wire the undo button click: cancel the timer, restore `notes` from `undoNotes` (push all items back), set `undoNotes = null`, remove the button, call `saveNotes()` and `renderNotes()`; verify clicking undo restores all notes

## 3. Clear todos

- [x] 3.1 Add a `clearTodosBtn` button to the todos panel header (after `#addTodoBtn`) with label "🗑 Tyhjennä" and matching style; verify the button is visible in the todos header
- [x] 3.2 Wire `clearTodosBtn` click: show `confirm('Tyhjennetäänkö kaikki tehtävät?')`; if cancelled, do nothing; verify a cancel leaves todos unchanged
- [x] 3.3 On confirm: snapshot `undoTodos = todos.map(t => ({...t}))`, clear `todos.length = 0`, call `saveTodos()` and `renderTodos()`; verify the todo list is empty after confirming
- [x] 3.4 After clearing todos, insert an "↺ Kumoa" button into the todos header and start a 5-second timer that removes it and sets `undoTodos = null` on expiry; verify the undo button appears and disappears after 5 seconds
- [x] 3.5 Wire the undo button click: cancel the timer, restore `todos` from `undoTodos`, set `undoTodos = null`, remove the button, call `saveTodos()` and `renderTodos()`; verify clicking undo restores all todos
