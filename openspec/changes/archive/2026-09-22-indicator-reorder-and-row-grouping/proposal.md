## Why
The binary "swap lunch/break order" toggle only supported two arrangements and did not cover the supervision indicator, so teachers with more complex schedules (break, lunch, and supervision all present) had no way to control the relative order of all three. Additionally, when a cell had multiple indicators, they were stacked on separate lines, taking up unnecessary vertical space and making the cell harder to scan at a glance.

## What Changes
- Replace the binary "🔀 Ruokailu ennen välkkää" swap toggle in the lesson slot popup with a reorderable list of all three indicator types (break, supervision, lunch), each with up/down controls to move it within the order.
- Persist the manual order as a `cell.indicatorOrder` array (only written when the teacher actually changes the order), superseding the legacy `cell.lunchBeforeBreak` boolean as the primary manual-order mechanism while still honoring existing `lunchBeforeBreak` data for previously saved slots that have not been touched.
- Group all present indicators (break, supervision, lunch) onto a single visual row within the lesson cell instead of stacking them on separate lines.

## Capabilities
### Modified Capabilities
- `week-planner`: the "Lesson slot popup editor" requirement changes (swap toggle replaced by a 3-item reorder list), and the "Break, lunch, and supervision indicator order" requirement changes (manual override is now a full order list, not a binary swap, and indicators are grouped on the same row).

### New Capabilities
None.

## Impact
- Affected file: `docs/index.html`
  - `getIndicatorOrder(...)` helper: order resolution now also supports a full `cell.indicatorOrder` array override (falls back to legacy boolean, falls back to chronological).
  - Popup: new `popupIndicatorOrder` state, `popupIndicatorOrderChanged` flag, `renderIndicatorOrder()` / `moveIndicatorOrder()` functions, and `#indicatorOrderList` markup replacing the removed `#swapOrderBtn`.
  - `renderGrid()`: indicators are now grouped into a single `.cell-indicator-row` wrapper per cell.
  - CSS: new `.cell-indicator-row` styles and adjustments to `.cell-break`/`.cell-supervision`/`.cell-lunch` when inside the row wrapper.
