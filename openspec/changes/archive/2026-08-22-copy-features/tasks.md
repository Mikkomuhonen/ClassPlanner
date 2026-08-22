## 1. Day settings copy

- [x] 1.1 Add CSS `.copy-row` (flex, gap, align-items: center, margin-top: 10px, padding-top: 8px, border-top: 1px dashed #e5e7eb) to `public/index.html` — verify the row is visually separated from the day rows
- [x] 1.2 In `renderBreaksEditor()`, append a copy-row div after the last day row: two `<select>` elements (source day, target day, each listing DAY_FULL), a `<button>Kopioi</button>`, and a status `<span>` — verify the row appears at the bottom of the Välitauot panel in edit mode
- [x] 1.3 Wire the copy button: if source !== target, deep-clone `dayBreaks[src]` to `dayBreaks[tgt]`, copy `dayRhythms[src]` to `dayRhythms[tgt]`, call `renderBreaksEditor()` and `renderGrid()`, show brief "✓ Kopioitu" feedback in the status span; if source === target, do nothing — verify breaks and rhythm update after copy

## 2. Lesson slot copy

- [x] 2.1 Add a copy row to the popup HTML in `public/index.html` (after `<textarea id="popupText">`): a label "Kopioi tunti →", a day `<select id="copyTargetDay">`, a slot `<select id="copyTargetSlot">` (T1–T7), and a `<button id="copySlotBtn">Kopioi</button>` — verify the row appears at the bottom of the popup
- [x] 2.2 Populate `#copyTargetDay` with DAY_FULL options and `#copyTargetSlot` with T1–T7 options on page load (static HTML options or wired in init) — verify both selects show the correct options
- [x] 2.3 Implement `copyLessonSlot()`: reads current popup textarea value and popupParticipants, reads start/end time inputs, reads `weekData[key][DAYS[dayIdx]][String(slotIdx)]` for any existing override, writes a cloned slot object to `weekData[key][DAYS[targetDay]][String(targetSlot)]`, calls `renderGrid()`, shows brief "✓ Kopioitu" feedback on the button — verify the target cell shows the copied content in the grid
- [x] 2.4 Wire `#copySlotBtn` click to call `copyLessonSlot()` using `popupState` for source and the two selects for target — verify copy works from within an open popup without closing it
