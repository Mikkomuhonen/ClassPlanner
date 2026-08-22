## 1. CSS

- [x] 1.1 Add `.cell-lunch` CSS rule (similar to `.cell-break`: small font, muted colour, top border) and `.popup-lunch-row` styling — verify styles exist in the file

## 2. HTML

- [x] 2.1 Add a lunch row to the popup HTML after the existing copy row: label "🍽️ Ruokailu alkaa", `<input type="time" id="lunchStartInput">`, `<select id="lunchDuration">` with options 15 and 20, and a `<button id="clearLunchBtn">Poista</button>` — verify elements appear in the popup

## 3. Grid rendering

- [x] 3.1 In `renderGrid()`, after rendering the cell-break indicator, check `cell.lunchStart`; if set, append `<div class="cell-lunch">🍽️ HH:MM (Xmin)</div>` using `minToTime(cell.lunchStart)` and `cell.lunchDuration` — verify the indicator appears in cells that have a lunch start time and does not appear in cells without one

## 4. Popup read/write

- [x] 4.1 In `openPopup()`, populate `#lunchStartInput` with `minToTime(cell.lunchStart)` if set, else empty; set `#lunchDuration` to `cell.lunchDuration || 15` — verify fields show correct values when reopening a popup with lunch data
- [x] 4.2 In `closePopup()`, read `#lunchStartInput`; if non-empty parse to minutes and store `slotData.lunchStart` and `slotData.lunchDuration`; if empty delete both fields from the slot object — verify lunch indicator appears/disappears correctly after closing popup

## 5. Clear button

- [x] 5.1 Wire `#clearLunchBtn` to clear `#lunchStartInput` value — verify clicking clear empties the time field (saved on popup close)
