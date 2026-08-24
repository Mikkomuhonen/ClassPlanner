## Context

Notes and todos currently live in global `localStorage` keys (`cp_notes`, `cp_todos`) and are loaded once on startup. The rest of the week's data (`weekData`) is managed in memory and persisted to `viikko_YYYY_WNN.json` via the File System Access API. The save/load functions are `saveWeek()` and `loadWeek()`. Week navigation is handled in `navigate()`.

## Goals / Non-Goals

**Goals:**
- Store notes and todos as part of `weekData[weekKey]` in memory
- Include them in `saveWeek()` (written to `viikko_YYYY_WNN.json`)
- Read them in `loadWeek()` and re-render on load
- Re-render notes and todos when `navigate()` changes the week
- Treat absent `notes`/`todos` fields in old files as empty arrays (backward compat)

**Non-Goals:**
- Migrating existing global localStorage notes to a week
- Auto-saving notes on every keystroke (save on 💾 only)
- Including notes in the template (`📋 Pohja`) — out of scope for this change

## Decisions

### 1. Storage location: weekData in memory, file on disk

Notes and todos move into `weekData[weekKey]`:

```
weekData[key] = {
  slots: { Ma: { ... }, Ti: { ... }, ... },   // existing
  notes: [{text, color}, ...],                 // new
  todos: [{text, done}, ...],                  // new
}
```

On `saveWeek()`, the full `weekData[key]` object (including notes and todos) is written to `viikko_YYYY_WNN.json`. On `loadWeek()`, notes and todos are read back.

**Why not localStorage?** localStorage is browser-local and doesn't travel with the folder. Storing in the JSON file keeps all week data together and consistent with the rest of the data model.

### 2. In-memory notes and todos variables become views into weekData

The `notes` and `todos` variables become references to the current week's arrays in `weekData`. When the week changes, they are re-pointed.

```js
function loadNotesFromWeek(key) {
  if (!weekData[key]) weekData[key] = {};
  if (!weekData[key].notes) weekData[key].notes = [];
  if (!weekData[key].todos) weekData[key].todos = [];
  notes = weekData[key].notes;
  todos = weekData[key].todos;
}
```

`saveNotes()` and `saveTodos()` become no-ops (or are removed) — notes persist only on `saveWeek()`. The `dirty` flag is set when notes/todos change, just like when lesson slots change.

### 3. Backward compatibility

Old `viikko_YYYY_WNN.json` files have no `notes` or `todos` fields. `loadWeek()` treats absence as `[]`. No migration needed.

### 4. Abandoned global localStorage keys

`cp_notes` and `cp_todos` are no longer read or written. Any existing data in those keys is silently ignored. No cleanup of localStorage is performed.

## Risks / Trade-offs

- **Unsaved notes:** If the user adds a note and navigates away without saving, the note is lost. This is the same behavior as lesson slot data — accepted trade-off, consistent with the existing model.
- **Empty state on first load:** Before a folder is selected and a week file loaded, notes and todos start empty. This is correct — they belong to a saved week.
