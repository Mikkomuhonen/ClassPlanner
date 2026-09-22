## Why

Lunch is set today purely per lesson slot via the popup ("Ruokailu alkaa" fields), and only for the currently open week. Most classes eat lunch at the same time on the same weekday every single week, so a teacher currently has to re-enter the same lunch time/duration in the popup week after week. There is no way to configure a day's lunch once and have it apply automatically to every future week, while still allowing an exception on a specific week when the schedule changes (e.g. a shortened day, a field trip, a swapped lesson).

## What Changes

- Add a per-day "default lunch" setting to the schedule-structure editor (the "Välitauot" section, alongside break configuration): a quick "+ 🍽️ Ruokailu" control that attaches a lunch (lesson slot, start time, duration) to a weekday. This default applies to every week automatically once configured, and is saved/loaded with the rest of the schedule structure (rhythms, breaks).
- The lesson grid and the lunch popup fields now show the day's default lunch automatically for the slot it's attached to, labeled as "(oletus)" in the popup, without requiring any per-week action.
- The existing per-slot popup lunch fields are preserved unchanged as the mechanism for a per-week exception: editing and saving the popup's lunch fields for a specific week's slot creates a week-specific override (different time/duration, or explicitly no lunch that week) without altering the day's default.
- Copying one day's schedule structure to another (the existing "copy day" control) now also copies the source day's default lunch setting, consistent with how it already copies breaks and rhythm.

## Capabilities

### Modified Capabilities
- `week-planner`: the lesson slot popup and grid display gain default-lunch resolution (day-level default with per-week override).
- `per-day-breaks`: the day-structure editor ("Välitauot" section) gains a control to configure a per-day default lunch (lesson slot, start time, duration), persisted and copied alongside the existing break/rhythm configuration.

Note: `per-day-breaks` already contains an older, never-implemented requirement describing a different "lunch break" mechanism (a break entry with a `type` of lunch, attached after a lesson boundary, rendered as "🍽️ Ruokailu Xmin"). No code implements that mechanism today (only unused CSS classes remain). This change does not implement that older mechanism or remove its requirement text; it adds the day-default lunch as a separate, actually-implemented mechanism. Reconciling or retiring the stale requirement is left for a follow-up change.

## Impact

- Affected file: `docs/index.html` (new `dayLunch` state array; `getEffectiveLunch` resolution helper; `renderBreaksEditor` UI additions; `openPopup`/`savePopup` lunch-field prefill and override logic; grid cell lunch rendering; `saveConfig`/`applyConfigData` persistence; day-copy/undo handling).
- No breaking changes: weeks that already have an explicit per-slot lunch continue to display exactly as before.
