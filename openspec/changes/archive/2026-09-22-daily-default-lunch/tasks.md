## 1. Default lunch state, resolution, and grid display

- [x] 1.1 Add `dayLunch` state array (`[null, null, null, null, null]`), parallel to `dayBreaks`/`dayRhythms` (`docs/index.html`)
- [x] 1.2 Add `getEffectiveLunch(dayIdx, slotIdx, cell)` helper implementing the precedence: explicit per-week override → explicit per-week suppression (`cell.lunchCleared`) → day default (`dayLunch[dayIdx]` matching the slot) → none
- [x] 1.3 Update the grid cell renderer to use `getEffectiveLunch` instead of only checking `cell.lunchStart`, and add an `is-default` CSS modifier so a default lunch renders visually distinct (muted/italic) from a per-week override

## 2. "Välitauot" editor: configure a day's default lunch

- [x] 2.1 Add `.lunch-config-row` UI to each day row in `renderBreaksEditor`: an "+ 🍽️ Ruokailu" add control when no default exists
- [x] 2.2 When a default exists, render it as an inline editable group: lesson-slot `<select>` (T1–T7), `<input type=time>`, duration `<select>` (15/20 min), and a remove (`×`) control
- [x] 2.3 Verify adding, editing (slot/time/duration), and removing a day's default lunch updates `dayLunch` immediately and re-renders the grid

## 3. Popup integration (per-week override/suppression)

- [x] 3.1 Add `id="lunchLabel"` to the popup's lunch label so it can be relabeled
- [x] 3.2 Update `openPopup` to pre-fill the lunch fields via `getEffectiveLunch` and append "(oletus)" to the label when showing the day's default
- [x] 3.3 Update `savePopup`: when the lunch field has a value, store it as an explicit per-week override (existing behavior); when empty and the day has a default attached to that slot, store `cell.lunchCleared = true`; when empty and no default applies, write nothing extra (existing behavior)
- [x] 3.4 Verify "Tyhjennä solu" removes any per-week lunch override/suppression along with the rest of the cell, so the day's default (if any) reappears on next open

## 4. Persistence

- [x] 4.1 Encode `dayLunch` as `dayLunchByIndex` (plain object keyed by day index) in `saveConfig`, matching the existing `dayBreaksByIndex` encoding
- [x] 4.2 Restore `dayLunch` from `dayLunchByIndex` in `applyConfigData`, defaulting missing/absent days to `null`
- [x] 4.3 Verify a configured default lunch survives exiting edit mode, reloading, and signing back in

## 5. Copy-day and undo integration

- [x] 5.1 Extend the day-structure copy action to also copy `dayLunch[src] → dayLunch[tgt]`
- [x] 5.2 Extend the copy's undo snapshot (`undoState.affected[].lunch`) to capture and restore the target day's prior `dayLunch` value
- [x] 5.3 Verify copying a day with no default lunch onto a day that has one clears the target's default, and that undo restores it
