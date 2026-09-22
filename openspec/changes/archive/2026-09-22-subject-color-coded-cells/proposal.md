## Why

Previously, lesson cells with subjects showed a color-coded subject badge, but the cell background itself stayed plain white/highlighted regardless of subject. Teachers wanted the cell background to reflect the subject's color at a glance on screen, but printing every cell with full color tint would use a lot of ink/toner and might not always be desired — some teachers prefer a lightweight printout with only the subject badge colored. Both needs are addressed: color-coded cell backgrounds on screen, plus an explicit choice of how much color carries over to print output.

## What Changes

- Lesson cells that have at least one subject selected now render a light background tint and a left-edge accent line using that subject's registry color (the first selected subject if more than one is set), visible on screen at all times.
- A new toolbar toggle "🎨 Väritä tulosteessa" (Colorize in print) lets the teacher choose between two printed outputs:
  - **Off (default)**: printed cells keep the existing plain highlight color; only the subject badge itself is colored. Matches prior printed behavior exactly.
  - **On**: printed cells also receive the full subject-color background tint and accent line, matching the on-screen appearance.
- The toggle's state persists across sessions (stored in the browser, not per-account cloud data) and defaults to off so existing printed output is unchanged unless the teacher opts in.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `week-planner`: "Lesson cell subject display" gains cell-level background color coding (not just the badge). "Print support" gains the print color toggle and its effect on printed cell backgrounds.

## Impact

- `docs/index.html`: `renderGrid()` sets a background tint and CSS custom properties per cell when subjects are present; new toolbar checkbox and its `change` handler toggle a `body` class and persist the preference via `localStorage`; print stylesheet gains a conditional rule keyed off that class.
- No data model or Firestore schema changes — the print preference is a local browser setting, not saved with week/config data.
