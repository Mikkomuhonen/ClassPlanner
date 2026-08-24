## 1. Remove global localStorage notes/todos

- [x] 1.1 Remove the two `localStorage.getItem` initializations for `cp_notes` and `cp_todos` at app startup; verify the variables `notes` and `todos` are initialized as empty arrays instead
- [x] 1.2 Replace `saveNotes()` and `saveTodos()` implementations so they only set `dirty = true` instead of writing to localStorage; verify that adding a note sets the dirty flag

## 2. Week-scoped note/todo loading

- [x] 2.1 Add a `loadNotesFromWeek(key)` helper that ensures `weekData[key].notes` and `weekData[key].todos` arrays exist and points the `notes` and `todos` variables at them; verify that after calling it, modifying `notes` also modifies `weekData[key].notes`
- [x] 2.2 Call `loadNotesFromWeek(key)` during app initialization (after `weekData` is ready) and after `renderGrid()` on startup; verify the notes and todo panels render empty on a fresh load with no folder selected

## 3. Save and load integration

- [x] 3.1 In `saveWeek()`, include `notes: weekData[key].notes || []` and `todos: weekData[key].todos || []` in the JSON written to file; verify the saved JSON contains both arrays
- [x] 3.2 In `loadWeek()`, after reading the file, assign `weekData[key].notes = data.notes || []` and `weekData[key].todos = data.todos || []`, then call `loadNotesFromWeek(key)` and re-render notes and todos; verify that loading a saved file restores the notes and todos
- [x] 3.3 Verify backward compatibility: load a `viikko_*.json` file that has no `notes` or `todos` fields and confirm the notes and todo panels show empty without errors

## 4. Week navigation

- [x] 4.1 In `navigate()`, after updating `currentWeekOffset`, call `loadNotesFromWeek(newKey)` and re-render notes and todos; verify that navigating to a different week shows that week's (empty) notes, not the previous week's notes
- [x] 4.2 Verify round-trip: add a note on week 35, navigate to week 36 (notes empty), navigate back to week 35 (note still present in memory); verify the note reappears without saving/loading

## 5. Dirty flag

- [x] 5.1 Verify that adding, editing, or deleting a note or todo sets `dirty = true`; verify the browser's unsaved-changes guard (beforeunload) triggers when navigating away with unsaved note changes
