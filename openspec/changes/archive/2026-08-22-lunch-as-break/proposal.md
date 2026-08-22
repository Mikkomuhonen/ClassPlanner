## Why

The application currently pre-fills every day with six automatic breaks (after each of lessons T1–T6), forcing teachers to manually delete unwanted breaks every time. Lunch also cannot be represented as a structural break that cascades lesson times. Teachers need to start with a clean schedule and add both regular breaks and a single lunch break exactly where needed.

## What Changes

- `defaultDayBreaks()` returns five empty arrays — no breaks are pre-populated. Teachers add breaks explicitly.
- Break objects gain an optional `type: 'lunch'` field. A lunch break is inserted via a dedicated `🍽️` button in the Välitauot editor and renders with a distinct "🍽️ Ruokailu Xmin" indicator instead of the generic "░ Xmin ░". Only one lunch break is allowed per day; the `🍽️` button is hidden when a lunch break already exists for that day.
- The existing popup-based `lunchStart` / `lunchDuration` annotation remains for recording the exact clock time of lunch within a lesson, but lesson timing cascading is now handled by the structural lunch break.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `per-day-breaks`: Break types — breaks now support an optional `type: 'lunch'` field. Lunch breaks display distinctly. Exactly one lunch break is permitted per day. Default day configuration starts empty.

## Impact

- `public/index.html`:
  - `defaultDayBreaks()`: return `Array.from({length:5}, () => [])`
  - Break object type: `{afterLesson, duration, type?}` where `type` can be `'lunch'`
  - `renderBreaksEditor()`: add `[🍽️]` button after each lesson slot; hide all `[🍽️]` buttons when `dayBreaks[d]` already contains `type:'lunch'`; lunch entries render with lunch-specific CSS class and label
  - `renderGrid()`: cell break indicator checks `brk.type === 'lunch'` and renders `🍽️ Ruokailu Xmin` with `.cell-lunch-break` styling instead of the generic indicator
  - CSS: add `.cell-lunch-break` and `.break-entry-lunch` styles
