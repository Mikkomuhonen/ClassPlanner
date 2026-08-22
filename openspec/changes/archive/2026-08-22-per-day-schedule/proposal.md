## Why

The shared break schedule forces all weekdays to have breaks at the same positions, but in practice breaks fall at different points on different days. Additionally, there is no way to record that a specific lesson on a specific week started or ended at a different time than usual.

## What Changes

- **BREAKING**: Replace the single shared `schedule` array (lessons + breaks interleaved) with `dayBreaks[5]` — one break-config array per weekday. Lesson slots are always exactly 7 per day; only break positions and durations vary per day.
- Add a "Välitauot" (breaks) editor panel in edit mode showing each day's break configuration as an interactive timeline, replacing the full-width break rows in the grid.
- Break indicators (duration badge) move into lesson cells, shown at the cell bottom when that day has a break after that lesson.
- Add `startOverride` and `endOverride` optional fields to lesson slot data in `viikko_*.json`, allowing a single lesson on a single week to have manually recorded actual start/end times.
- Popup editor gains editable start/end time fields (pre-filled from computed time; editable for overrides). A "Palauta oletusaika" control clears the override.
- Migration: existing `schedule` array is converted to `dayBreaks` on first load, copying the same break structure to all five days.

## Capabilities

### New Capabilities

- `per-day-breaks`: Per-weekday break configuration — the teacher defines which lesson slots have breaks and how long, independently for each day of the week. Replaces the shared break schedule.

### Modified Capabilities

- `week-planner`: The week grid no longer uses full-width break rows. Break indicators appear within lesson cells. Lesson slot cells gain optional time-override display; the popup gains editable time fields for recording actual start/end times.

## Impact

- `public/index.html` — all changes concentrated here:
  - Remove `schedule` state, `recalc()`, `lessonSlots()`, `slotTimeForDay()`, shared break rows in grid
  - Add `dayBreaks[5]` state and `computeDaySlotTime(dayIdx, slotIdx)`
  - Add `getCellTime(dayIdx, slotIdx, weekKey)` (override-aware)
  - New "Välitauot" editor section in edit mode
  - Break indicators in lesson cells
  - Popup extended with `startOverride`/`endOverride` input fields
  - `saveConfig()` / `loadConfig()` updated for `dayBreaks`
  - `saveWeek()` / `loadWeek()` carry `startOverride`/`endOverride`
- `config.json` format: `schedule` field replaced by `dayBreaks`
- `viikko_*.json` format: lesson slots gain optional `startOverride`/`endOverride`
