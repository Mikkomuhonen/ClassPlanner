## Why

Teachers need to mark a specific lunch time within a lesson slot, since lunch occurs at different times on different days. Currently there is no way to record when lunch takes place inside a lesson period.

## What Changes

- Popup gains two optional fields: a lunch start time (`<input type="time">`) and a duration selector (15 or 20 min). When set, the values are saved to the slot's week data. When cleared, no lunch marker is stored.
- Lesson cells show a `🍽️ Ruokailu HH:MM (Xmin)` indicator only when a lunch start time is recorded for that slot. No indicator appears when the field is unset.

## Capabilities

### New Capabilities

_(none — see Modified Capabilities)_

### Modified Capabilities

- `week-planner`: Lesson slots gain an optional lunch time annotation. The popup editor allows setting and clearing a lunch start time and duration. The cell displays a lunch indicator only when a start time is set.

## Impact

- `public/index.html` — all changes here:
  - Popup HTML: add lunch time `<input type="time">` and duration `<select>` (15/20 min) with a label and clear button
  - `openPopup()`: populate lunch fields from `cell.lunchStart` / `cell.lunchDuration`
  - `closePopup()`: read lunch fields; if start time is set save `lunchStart` (minutes) and `lunchDuration`; if cleared delete both fields
  - `renderGrid()`: if `cell.lunchStart` is set, append `<div class="cell-lunch">🍽️ HH:MM (Xmin)</div>`
  - CSS: `.cell-lunch` style
  - No changes to config.json or persistence format (lunch data lives in viikko_*.json)
