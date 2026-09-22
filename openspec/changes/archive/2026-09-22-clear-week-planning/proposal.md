## Why

When a teacher wants to completely redo a week — different break positions, a different default lunch time, and entirely different lesson content — they currently have to manually delete every lesson cell one at a time via the popup's "Tyhjennä solu" control, and manually remove every break/lunch entry row by row in the "Välitauot" editor. This is slow and error-prone for a full redo. Two bulk-clear controls remove this friction.

## What Changes

- Add a "🗑 Tyhjennä kaikki solut" (Clear all cells) control to the "Välitauot" editor panel (edit mode). It clears every lesson slot's stored data (text, participants, subjects, time override, lunch override/suppression, supervision flag) for the **currently displayed week only**, leaving the week's notes and todos untouched. Requires confirmation before clearing. Shows feedback when there is nothing to clear.
- Add a "🗑 Tyhjennä viikon välitauot ja ruokailut" (Clear breaks & lunches) control to the same panel. It clears the break entries (`dayBreaks`) and default lunch configuration (`dayLunch`) for **all five weekdays**. Because these are structural, cross-week settings (not per-week data), clearing them affects every week, not just the one currently displayed — the confirmation dialog states this explicitly. Requires confirmation before clearing. Shows feedback when there is nothing to clear.
- Both controls are additive; they do not change any existing per-cell or per-day editing behavior (the popup's "Tyhjennä solu"/"Tyhjennä sisältö" controls and the per-day break/lunch add/edit/remove controls are unaffected).

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `week-planner`: adds a new bulk "clear all cells for the current week" requirement to the week-planner grid editing capability.
- `per-day-breaks`: adds a new bulk "clear all break and lunch configuration" requirement to the break editor panel capability.

## Impact

- `docs/index.html`: `renderBreaksEditor()` gains two new buttons and their click handlers; no changes to data model shape (reuses existing `weekData`, `dayBreaks`, `dayLunch` structures and the existing `dirty` flag / `saveConfig()` persistence path).
- No Firestore schema changes; clearing is expressed as ordinary mutations of the same in-memory structures that are already persisted by the existing week-save and config-save flows.
