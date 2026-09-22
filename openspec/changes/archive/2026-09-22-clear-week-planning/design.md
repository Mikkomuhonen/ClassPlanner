## Context

`docs/index.html` is a single-file app. Lesson-slot content lives in `weekData[weekKey]`, keyed by day abbreviation (`Ma`, `Ti`, ...), where each day's object also directly carries that week's `notes` and `todos` arrays as sibling properties (set in `applyWeekData`). Break positions (`dayBreaks`) and default lunch (`dayLunch`) are separate top-level arrays indexed by weekday (0–4) that are **not** per-week — they are structural config shared across every week and persisted via `saveConfig()`. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Let a teacher clear an entire week's lesson content in one action, without affecting that week's notes/todos or any other week.
- Let a teacher clear all weekdays' break/lunch structure in one action, with the cross-week impact clearly communicated at the point of action.

**Non-Goals:**
- Not adding a way to clear a single day's cells only (existing per-cell "Tyhjennä solu" already covers that granularity).
- Not adding an undo for these two bulk actions (unlike the day-copy feature's undo) — scope is kept minimal since both actions require an explicit confirm dialog first.

## Decisions

- **Clear all cells only deletes day keys, not the whole week object.** Because `weekData[key]` also stores `notes`/`todos` as sibling properties on the same object, the clear-all-cells handler deletes only the known day-abbreviation keys (`DAYS`) rather than replacing `weekData[key]` wholesale, so notes/todos survive. Alternative considered: reassign `weekData[key] = {}` and separately re-attach saved notes/todos — rejected as more error-prone than simply not touching those keys in the first place.
- **"Nothing to clear" gives feedback instead of silently no-op'ing.** Both buttons check for existing content before showing the confirm dialog; if there is nothing to clear, a small inline message is shown instead of doing nothing with no feedback, matching the existing feedback pattern used by day-copy (`feedbackSpan`).
- **Breaks/lunch clear explicitly warns about cross-week impact in the confirm text itself**, since `dayBreaks`/`dayLunch` are structural (shared) data, not per-week, and a teacher might otherwise assume it only affects the currently displayed week (as the cell-clear button does).
- **No success feedback message after clearing breaks/lunches.** That action calls `renderBreaksEditor()`, which fully rebuilds the `#breaksGroups` container (destroying any transient feedback `<span>` created in the previous render pass before a `setTimeout` could clear it). The visibly emptied editor rows (all "+" add-controls reappearing) serve as sufficient confirmation, avoiding a feedback message that would never actually render.
- **Persistence reuses existing flows.** Clearing cells sets the existing `dirty` flag (picked up by the normal week-save path). Clearing breaks/lunch relies on `toggleEditMode()`'s unconditional `saveConfig()` call on exiting edit mode — no new persistence code needed.

## Risks / Trade-offs

- [Risk] A teacher might click "Tyhjennä viikon välitauot ja ruokailut" not realizing it resets *every* week's break/lunch structure, not just the current one → Mitigation: confirmation dialog text explicitly states "Tämä koskee kaikkia viikkoja, ei vain nykyistä."
- [Risk] No undo for either bulk action means a mistaken confirm is unrecoverable from the UI → Mitigation: both require an explicit confirm dialog (unlike single-click actions), matching the destructiveness level of the existing single-cell "Tyhjennä solu" (also non-undoable).
