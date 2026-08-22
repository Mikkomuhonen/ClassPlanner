## 1. Empty default breaks

- [x] 1.1 Change `defaultDayBreaks()` to return `Array.from({length:5}, () => [])` — verify no break indicators appear on page load when no config is saved

## 2. Lunch break type in editor

- [x] 2.1 In `renderBreaksEditor()`, after the `[+]` (add regular break) button for each lesson slot, add a `[🍽️]` button that calls an add-lunch handler; compute `const hasLunch = (dayBreaks[d]||[]).some(b=>b.type==='lunch')` once per day row and skip rendering all `[🍽️]` buttons for that day when `hasLunch` is true — verify the lunch button appears only when no lunch exists for the day
- [x] 2.2 Wire the add-lunch handler: push `{afterLesson: capLi, duration: 20, type: 'lunch'}` to `dayBreaks[capD]`, sort, call `renderBreaksEditor()` and `renderGrid()` — verify a lunch break entry appears after the selected lesson with duration 20min
- [x] 2.3 Add CSS for lunch break entry in the editor (`.break-entry-lunch`): distinct background (e.g., amber/yellow tint) to visually differentiate from regular breaks — verify lunch entries look different in the editor

## 3. Lunch break indicator in grid cells

- [x] 3.1 In `renderGrid()`, where the cell break indicator is created, check `brk.type === 'lunch'`; if true use class `cell-lunch-break` and text `` `🍽️ Ruokailu ${brk.duration}min` `` instead of the generic indicator — verify cells show the lunch indicator for lunch breaks and the regular indicator for regular breaks
- [x] 3.2 Add CSS `.cell-lunch-break` (amber/orange background, distinct from grey `.cell-break`) — verify visual distinction in the grid

## 4. Cascading time fix

- [x] 4.1 Add `computeCascadingSlotTime(dayIdx, slotIdx, weekKey)` that iterates previous lessons, uses `endOverride` from weekData when set (instead of the structural 45-min computed end), and adds break durations from `dayBreaks` — verify that if lesson N has endOverride=X and a 15-min break follows, lesson N+1 starts at X+15
- [x] 4.2 Update `getCellTime()` to call `computeCascadingSlotTime(dayIdx, slotIdx, weekKey)` instead of `computeDaySlotTime()` — verify cell times reflect cascaded overrides
- [x] 4.3 Update `closePopup()` override detection to compare against `computeCascadingSlotTime` instead of `computeDaySlotTime` — verify override flag is set only when user actually changed the cascaded time

## 5. Enhanced day copy + undo

- [x] 5.1 Add `let undoState = null` to state and add CSS `.undo-copy-btn` — verify variable exists
- [x] 5.2 Add `performCopy(src, targets)` helper that: saves pre-copy state of all target days (breaks, rhythm, cells) to `undoState`; copies dayBreaks+dayRhythms+weekData cells from src to each target; sets `dirty=true`; calls `renderBreaksEditor()` and `renderGrid()` — verify copy includes cell content
- [x] 5.3 Replace existing `copyBtn` handler with `performCopy(src, [tgt])`; add "Kopioi kaikille" button that calls `performCopy(src, [0..4].filter(d≠src))`; show "✓ Kopioitu [↩ Kumoa]" feedback after each copy — verify both buttons work
- [x] 5.4 Wire undo: clicking "↩ Kumoa" restores all affected days from `undoState`, clears `undoState`, re-renders — verify restores exact pre-copy state

## 6. Folder persistence via IndexedDB

- [x] 6.1 Add `openDB()`, `saveHandleToDB(handle)`, `loadHandleFromDB()` helpers using `indexedDB` with a `classplanner` database and `handles` object store — verify helpers work without errors
- [x] 6.2 In `selectFolder()`, after `dirHandle` is set call `saveHandleToDB(dirHandle)` — verify handle is stored in IndexedDB after folder selection
- [x] 6.3 Add `tryRestoreHandle()` async function: retrieves handle from IndexedDB, calls `handle.requestPermission({mode:'readwrite'})`, if granted sets `dirHandle`, updates folderName display, calls `loadConfig()` then `loadWeek()` — verify on page reload a permission prompt appears and data loads automatically after approval
- [x] 6.4 Call `tryRestoreHandle()` at the end of the init block — verify that reloading the page shows the folder name and data loads after one-click permission approval

## 7. UX feedback fixes

- [x] 7.1 Update `loadWeek()` to show user-visible feedback: alert if no folder selected, brief toolbar message if file not found for this week, brief "✓ Ladattu" on success — verify all three states give visible feedback
