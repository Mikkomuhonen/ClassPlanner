## Why

Lesson cells can show up to three indicators at their bottom: a regular break, a lunch break, and a break-supervision marker. Previously the display order was always fixed (break/supervision, then lunch) regardless of which one actually happens first, and break supervision had no time of its own — it was a plain on/off flag implicitly assumed to coincide with the break. Teachers whose lunch is scheduled to start before the regular break in the same slot, or whose supervision duty starts at a different time than the break itself, had no way to reflect that in the plan. Additionally, the supervision and lunch indicator icons were stored as corrupted byte sequences, so they rendered as a broken placeholder glyph both on screen and when printed.

## What Changes

- Lesson cells now order the break/supervision indicator and the lunch indicator chronologically by default: if the lunch actually starts before the end of the lesson (i.e., before the break), the lunch indicator is shown first.
- The lesson slot popup gains a manual "🔀 Ruokailu ennen välkkää" toggle that lets the teacher force the lunch indicator to display before the break/supervision indicator for that slot, overriding the automatic chronological order.
- Break supervision gains an optional specific start time and duration, editable in the popup once the supervision toggle is active. When left unset, supervision defaults to the break's own start time (the lesson's end time) and duration.
- The break-supervision and lunch indicator icons are corrected from corrupted placeholder characters to the intended emoji (🏃 for supervision, 🍽️ for lunch), fixing their appearance both on screen and in the printed weekly plan (which renders the same grid DOM).
- The break-supervision indicator text now includes its effective start time and duration, matching the lunch indicator's format.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `week-planner`: The "Lesson slot popup editor" requirement gains supervision start time/duration fields and a manual indicator-order toggle, both persisted on save. A new requirement describes how the break/supervision and lunch indicators are ordered within a cell (chronological by default, manual override takes precedence) and how the supervision indicator is rendered.

## Impact

- Affected file: `docs/index.html` (single-file app) — `renderGrid()` cell rendering, `openPopup()`/`savePopup()` popup logic, popup HTML markup, and the new `getEffectiveSupervision()` helper alongside the existing `getEffectiveLunch()`.
- No data migration required: `cell.breakSupervision` remains a boolean flag; `cell.supervisionStart`/`cell.supervisionDuration` and `cell.lunchBeforeBreak` are new optional per-week, per-slot fields that default to absent (falling back to prior behavior) for existing saved data.
- No changes to Firestore schema structure beyond new optional fields on existing per-slot cell objects.
