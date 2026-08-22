## Context

All code in `public/index.html`. Lesson slot data lives in `weekData[weekKey][dayAbbr][slotIdx]` as `{participants, text, startOverride?, endOverride?}`. The popup already has time-row fields. The cell already renders participants, text, and a break indicator.

## Goals / Non-Goals

**Goals:**
- Optional `lunchStart` (minutes) and `lunchDuration` (15 or 20) on the slot object
- Popup fields for setting and clearing; cell indicator when set

**Non-Goals:**
- Lunch as a structural break (no effect on lesson timings)
- Validation that lunch time falls within the lesson slot
- Per-day default lunch times

## Decisions

### D1: Lunch data stored in weekData, not config
Lunch time varies week-to-week and day-to-day. Storing in `viikko_*.json` via the existing slot object is the right scope. No new config fields.

### D2: Popup row uses `<input type="time">` + `<select>` for duration
Same pattern as the existing popup-time-row. If the time input is empty on close, delete `lunchStart` and `lunchDuration`. A "Poista" link clears the field inline.

### D3: Cell indicator is a simple div
Appended after participants and text. Uses `.cell-lunch` class styled similarly to `.cell-break`.
