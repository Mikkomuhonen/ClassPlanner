## 1. State and data model

- [x] 1.1 Add `rhythms` array (default 4 entries: A=480, B=510, C=540, D=570 minutes) and `dayRhythms` array (5 zeros) to module-level state in `public/index.html` — verify both variables exist and default values are correct when logged to console on load
- [x] 1.2 Update `loadConfig()` to restore `rhythms` and `dayRhythms` from `config.json` when present; fall back to defaults when fields are absent — verify old config files without those fields still load without error

## 2. Rhythm-aware time display

- [x] 2.1 Add helper `slotTimeForDay(slot, dayIdx)` that returns `{start, end}` by adding `rhythms[dayRhythms[dayIdx]].startMinutes - 480` as an offset to `slot.start` and `slot.end` — verify the helper returns correct shifted times for each rhythm
- [x] 2.2 Update `openPopup(dayIdx, slotIdx)` to use `slotTimeForDay` instead of raw `slot.start`/`slot.end` when composing the popup title — verify the popup shows the correct time for the selected day's rhythm

## 3. Inline cell content display

- [x] 3.1 In `renderGrid()`, change the cell text node from `cellData.text.split('\n')[0]` to `cellData.text` (full text) — verify multi-line text renders completely in the cell
- [x] 3.2 In CSS, set `.lesson-cell` to `height: auto; min-height: 40px` and `.cell-text` to `white-space: pre-wrap` — verify cells expand vertically to show full content and shrink when empty
- [x] 3.3 Verify print output: open print preview and confirm all participant names and full text appear in each lesson cell without truncation

## 4. Column header rhythm display

- [x] 4.1 Update `renderGrid()` header row generation: in normal mode each day `<th>` shows `DAY_FULL[d] + ' (' + rhythms[dayRhythms[d]].name + ')'` — verify headers show correct rhythm names on page load
- [x] 4.2 In edit mode each day `<th>` shows the day name and a `<select>` populated with all rhythm names, pre-selected to `dayRhythms[d]`; changing the select updates `dayRhythms[d]` and calls `renderGrid()` — verify selecting a different rhythm updates the header and popup times for that day

## 5. Rhythms management panel (edit mode)

- [x] 5.1 Add `<section id="rhythmsSection">` below `#registrySection` in `public/index.html`; show it only when `body.edit-mode` class is present (CSS `display:none` / `display:block`) — verify section appears when edit mode is toggled on
- [x] 5.2 Implement `renderRhythms()` that populates `#rhythmsSection` with one row per rhythm: name `<input>`, start-time `<input type="time">`, and delete `<button>`; inputs update `rhythms[i]` on `input` event — verify changes to name or time are reflected in the column headers after `renderGrid()` is called
- [x] 5.3 Implement delete rhythm: clicking delete removes the rhythm from `rhythms`, remaps any `dayRhythms[d]` that referenced the deleted index to 0, and calls `renderGrid()` and `renderRhythms()` — verify deleted rhythm no longer appears and affected days fall back to first rhythm
- [x] 5.4 Implement add rhythm button: clicking "Uusi rytmi" appends `{name: '', startMinutes: 480}` to `rhythms` and calls `renderRhythms()` — verify new rhythm row appears with empty name and 08:00 default
- [x] 5.5 Call `renderRhythms()` from `init()` and from `toggleEditMode()` when entering edit mode — verify rhythm panel renders on load and refreshes correctly on mode toggle

## 6. Persistence

- [x] 6.1 Update `saveConfig()` to include `rhythms` and `dayRhythms` in the JSON written to `config.json` — verify the saved file contains both fields with current values
- [x] 6.2 End-to-end verification: set rhythms, assign different rhythms to days, save config, reload page, re-select folder — verify rhythms and day assignments are fully restored

## 7. Cell time display

- [x] 7.1 Change "Aika" left column to show lesson numbers (T1, T2, ... T7) instead of clock times; update CSS to centre and bold the number — verify the column shows Tn labels on page load
- [x] 7.2 Add a per-day time line at the top of each lesson cell using `slotTimeForDay(slot, d)` formatted as "HH:MM–HH:MM"; update automatically when rhythm start time changes — verify each cell shows its day-specific time and updates when the rhythm is edited
