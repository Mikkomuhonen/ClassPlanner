## Context

`docs/index.html` already had two independent lunch-related mechanisms in the codebase before this change:
1. A per-week, per-slot lunch (`cell.lunchStart`/`cell.lunchDuration`), set only via the lesson slot popup, documented in `week-planner`'s "Lesson slot popup editor" requirement.
2. A never-implemented "lunch break" concept described in the `per-day-breaks` spec (a break entry with a `type` of lunch, attached after a lesson boundary) — only unused CSS classes (`break-entry-lunch`, `break-lunch-btn`) remain in the codebase; there is no `type` field on break entries and no "add lunch break" control.

Teachers with a fixed daily lunch time had to re-enter it in the popup every single week. This change adds a third mechanism: a per-day *default* lunch, configured once in the existing "Välitauot" editor (alongside breaks and rhythms), that automatically applies every week unless a per-week override exists.

## Goals / Non-Goals

- Goal: let a teacher configure a day's lunch once (slot, start time, duration) and have it show up automatically in every week's grid and popup thereafter.
- Goal: preserve the existing popup-based per-week lunch editing exactly as-is for the exception case (different day, no lunch this week, etc.).
- Goal: keep persistence and copy/undo behavior consistent with how `dayBreaks`/`dayRhythms` already work.
- Non-goal: implementing the older spec'd-but-unbuilt "lunch break" (break-entry-with-type) mechanism. That requirement in `per-day-breaks` is left untouched and is called out as likely stale in the proposal; reconciling or retiring it is deferred to a follow-up change.
- Non-goal: having the default lunch affect cascading lesson start times. Consistent with the pre-existing per-week lunch, a lunch indicator (default or override) is purely a display label and does not shift subsequent lesson slot times (this mirrors how `cell.lunchStart` already behaved — it never fed into `computeCascadingSlotTime`).

## Decisions

### New `dayLunch` state array, parallel to `dayBreaks`/`dayRhythms`
`dayLunch[dayIdx]` is `{ slot, start, duration } | null`. It lives alongside `dayBreaks` and `dayRhythms`, is edited in the same "Välitauot" section, and is persisted in the same `config` Firestore document (`dayLunchByIndex`, encoded as a plain object the same way `dayBreaksByIndex` already is, since Firestore does not support arrays-of-arrays or sparse arrays well as top-level array fields alongside object entries).

Alternative considered: modeling the default lunch as a special break entry (`dayBreaks[d].push({ afterLesson, duration, type: 'lunch' })`), matching the older spec'd-but-unbuilt design. Rejected for this change — a break shifts subsequent lesson start times by its duration (that is the entire point of a break), whereas lunch here is deliberately a non-time-shifting label attached to a specific lesson slot, exactly like the existing per-week `cell.lunchStart`. Reusing the break array would either change lunch's non-shifting behavior (a breaking change to existing weeks) or require a special-cased "non-shifting break," which is more confusing than a parallel `dayLunch` array.

### Resolution precedence via `getEffectiveLunch(dayIdx, slotIdx, cell)`
A single helper resolves what lunch info (if any) to display or pre-fill for a slot:
1. `cell.lunchStart != null` → explicit per-week override (existing behavior, unchanged) — highest precedence.
2. `cell.lunchCleared === true` → explicit per-week suppression of the day's default — no lunch shown for this slot this week.
3. Otherwise, `dayLunch[dayIdx]` if its `slot` matches the current slot → the day's default, marked `isDefault: true` for display/labeling purposes.
4. Otherwise → no lunch.

This is used identically by both the grid cell renderer and `openPopup`'s field pre-fill, so the two views never disagree about what's currently in effect.

### New `cell.lunchCleared` flag for "no lunch this week" when a default exists
Previously, an empty lunch field on save simply meant "no `lunchStart` field is written" — there was nothing to suppress because there was no default to suppress. Now that a day-level default can exist, an empty save on a slot that has a default must be distinguishable from "never touched this slot." `savePopup` therefore writes `slotData.lunchCleared = true` only when the lunch field is empty *and* the day has a default attached to that exact slot; otherwise it writes nothing extra, preserving today's behavior for slots with no default.

"Tyhjennä solu" (clear cell) continues to delete the entire per-week cell entry, which removes `lunchCleared` along with everything else — so clearing the cell naturally "resets to defaults," including the day's default lunch reappearing.

### Popup labeling
The lunch label element gains an id (`lunchLabel`) so `openPopup` can append "(oletus)" when the fields are showing the day's default (`effLunch.isDefault`), giving the teacher a clear visual cue that they are about to create a per-week override the moment they touch those fields, without needing a separate UI element.

### UI placement and interaction
The "Välitauot" day row gains a `.lunch-config-row` at the end, visually separated by a dashed border from the break timeline. It shows either:
- a single "+ 🍽️ Ruokailu" add button (no default configured yet), or
- an inline editable group (lesson-slot `<select>`, `<input type=time>`, duration `<select>`, and a remove `×` button) once a default exists.

This mirrors the existing break-entry editing pattern (inline `+`/`−`/`×` controls) already used for regular breaks in the same section, so the interaction model is familiar.

### Copy-day and undo
The existing "copy day structure" control (which already copies `dayBreaks` and `dayRhythms`) is extended to also copy `dayLunch[src] → dayLunch[tgt]`, and the undo snapshot (`undoState.affected[].lunch`) captures the target's prior `dayLunch` value the same way it already captures `breaks` and `rhythm`, so undo fully reverts all three.

## Risks / Trade-offs

- Two independent "lunch" concepts now exist in the spec corpus long-term (the actually-implemented per-slot + per-day-default mechanism, and the older unbuilt break-type mechanism in `per-day-breaks`). This is called out explicitly in the proposal so it is not mistaken for accidental duplication; cleanup of the stale requirement is deferred rather than bundled into this change to keep this change's diff focused.
- A day's default lunch is keyed to a specific lesson slot index rather than "after lesson N" like breaks; if a teacher later changes which slot lunch happens on, they use the inline slot `<select>` rather than removing and re-adding — this was chosen to match how the per-week popup already lets a teacher pick lunch time/duration without re-selecting a slot, keeping the two editing surfaces conceptually aligned.

## Migration Plan

No migration required. `dayLunch` defaults to `[null, null, null, null, null]` for all existing users; nothing changes for a day until the teacher explicitly adds a default lunch. Existing per-week `cell.lunchStart` data continues to display exactly as before (case 1 in the resolution precedence always wins).

## Open Questions

None.
