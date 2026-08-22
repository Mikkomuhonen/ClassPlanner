## 1. State refactor — remove schedule, add dayBreaks

- [x] 1.1 Add `const LESSON_COUNT = 7` constant and `let dayBreaks = Array.from({length:5}, () => [])` state variable with default breaks (15 min after lessons 0–5, no break after lesson 6) — verify `dayBreaks` has 5 arrays each with 6 entries on page load
- [x] 1.2 Add `computeDaySlotTime(dayIdx, slotIdx)` function that sums 45 min per lesson plus break durations before `slotIdx` from `dayBreaks[dayIdx]` and adds `rhythms[dayRhythms[dayIdx]].startMinutes` — verify it returns correct start/end for slot 0 (no break before) and slot 2 (one break before) on a day with breaks after slots 0 and 1
- [x] 1.3 Add `getCellTime(dayIdx, slotIdx, weekKey)` function that returns `startOverride`/`endOverride` from weekData if present, else calls `computeDaySlotTime` — verify it returns override when set and falls back to computed when not
- [x] 1.4 Remove `schedule` state variable, `recalc()`, `lessonSlots()`, and `slotTimeForDay()` — verify no references remain and page loads without errors

## 2. Grid rendering refactor

- [x] 2.1 Rewrite `renderGrid()` to iterate `LESSON_COUNT` (0..6) for lesson rows instead of the `schedule` array — verify 7 lesson rows appear and no full-width break rows are rendered
- [x] 2.2 In each lesson cell, replace the `slotTimeForDay` call with `getCellTime(d, curLi, weekKey)` for the displayed time — verify cell times update when rhythm is changed
- [x] 2.3 Add break indicator per cell: after appending cell content, call `dayBreaks[d].find(b => b.afterLesson === curLi)` and if found append `<div class="cell-break">░ Xmin ░</div>` — verify the indicator appears only for cells whose day has a break after that lesson
- [x] 2.4 Add CSS `.cell-break` (small, centered, muted, bottom of cell) and remove the old break-row CSS classes (`.break-row`, `.break-label`, `.break-controls`, `.break-dur-btn`, `.break-del-btn`, `.add-break-row`, `.add-break-btn`) — verify no console errors and visual style is clean
- [x] 2.5 Update `openPopup(dayIdx, slotIdx)` to use `getCellTime` for popup title time display — verify popup title shows computed or overridden time correctly

## 3. Popup time override

- [x] 3.1 Add two `<input type="time">` fields to the popup HTML (before the textarea) with ids `popupStartTime` and `popupEndTime`; add a `<button id="popupResetTime">Palauta oletusaika</button>` — verify the fields appear in the popup
- [x] 3.2 In `openPopup()`, populate `popupStartTime` and `popupEndTime` with `getCellTime` values; if an override is active add a CSS class `has-override` to indicate visual distinction — verify fields show correct time values
- [x] 3.3 In `closePopup()`, read the time fields; if values differ from `computeDaySlotTime`, store `startOverride` and `endOverride` in the weekData cell; if equal to computed, delete any existing override fields — verify override is stored when changed and cleared when reset to default
- [x] 3.4 Wire `popupResetTime` button: clear `startOverride`/`endOverride` from weekData cell and reset time inputs to computed values — verify cell reverts to computed time display after reset
- [x] 3.5 Update `renderGrid()` cell time display: if `getCellTime` returns an override, add CSS class `time-overridden` to the `.cell-time` div (e.g., different colour) — verify override cells are visually distinct from computed cells

## 4. Välitauot editor panel (edit mode)

- [x] 4.1 Add `<section id="breaksSection">` to HTML below `#rhythmsSection`; show it only in edit mode (same CSS pattern as other edit sections); add heading "Välitauot" — verify section appears in edit mode
- [x] 4.2 Implement `renderBreaksEditor()` that renders one row per day: `DAY_FULL[d]` label followed by a flex sequence `T1 [+] [15min▲▼×] T2 [+] T3 ...` where `[+]` adds a break after that lesson and the break entry shows duration with increment/decrement and delete — verify each day's row reflects `dayBreaks[d]`
- [x] 4.3 Wire add-break: clicking `[+]` after lesson `li` on day `d` pushes `{afterLesson: li, duration: 15}` to `dayBreaks[d]`, sorts by `afterLesson`, calls `renderBreaksEditor()` and `renderGrid()` — verify new break appears and cell times update
- [x] 4.4 Wire delete-break: clicking `×` on a break entry removes it from `dayBreaks[d]`, calls `renderBreaksEditor()` and `renderGrid()` — verify break removed and times update
- [x] 4.5 Wire duration change: increment/decrement clamps to 15–30 min in steps of 5, updates `dayBreaks[d]` entry, calls `renderGrid()` — verify cell break indicators update with new duration
- [x] 4.6 Call `renderBreaksEditor()` from `toggleEditMode()` when entering edit mode and from `init()` — verify editor renders on load and on edit mode activation

## 5. Config persistence

- [x] 5.1 Update `saveConfig()` to write `dayBreaks` to `config.json` (replacing `schedule`) — verify saved file contains `dayBreaks` array with 5 elements
- [x] 5.2 Update `loadConfig()`: if `data.dayBreaks` is a 5-element array, restore it; else if `data.schedule` is present, migrate by extracting break entries and copying to all 5 days; else keep defaults — verify migration runs without error and produces correct breaks when loading old config
- [x] 5.3 Update `saveWeek()` and `loadWeek()` to preserve `startOverride`/`endOverride` fields in slot data — verify overrides survive a save/reload cycle

## 6. Cleanup and HTML cleanup

- [x] 6.1 Remove the static break-row rendering in any remaining `renderGrid()` code paths (the `schedule`-based `else` branch for break slots) and remove the `add-break-row`/`add-break-btn` HTML section (if still present as a template) — verify no stale break-row HTML is generated
- [x] 6.2 End-to-end: configure different breaks on Monday and Tuesday, enter lesson content, save week, reload page, re-select folder — verify break configs persist and time labels are correct for each day
