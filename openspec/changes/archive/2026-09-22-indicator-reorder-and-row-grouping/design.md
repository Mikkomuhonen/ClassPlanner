## Context
All-in-one implementation in `docs/index.html`. See `proposal.md` - Why. Previously indicators were ordered via a single boolean (`cell.lunchBeforeBreak`) and rendered on separate lines/rows.

## Goals / Non-Goals
**Goals:**
- Allow manual ordering of all three indicator types (break, supervision, lunch), not just a binary swap.
- Keep backward compatibility with previously saved `lunchBeforeBreak` data.
- Display all present indicators together on one row.

**Non-Goals:**
- Drag-and-drop reordering (up/down buttons are sufficient).
- Changing how break/supervision/lunch times are computed.

## Decisions
- **Order storage as an array (`cell.indicatorOrder`)**: chosen over adding more booleans because it scales to all three indicator types and any future additions, and directly maps to the display order.
- **`popupIndicatorOrderChanged` dirty flag**: the order is only persisted when the teacher explicitly changes it, so slots without a manual override keep using the (cheaper, always-current) chronological default rather than freezing a snapshot of it.
- **Legacy fallback in `getIndicatorOrder`**: precedence is explicit `indicatorOrder` array > legacy `lunchBeforeBreak` boolean > chronological default, so old saved data keeps working without a migration step.
- **Single shared `.cell-indicator-row` flex wrapper**: chosen over per-indicator row logic because it lets the resolved order list simply be iterated and appended once, and gives a consistent badge-like visual style to all indicators.

## Risks / Trade-offs
- [Legacy boolean becomes stale once explicit order is used] → Once a slot is saved with `popupIndicatorOrderChanged`, the array takes precedence, so the boolean is no longer read for that slot; no cleanup of the boolean is needed since it's simply ignored.
- [Row wrapper may wrap to multiple lines on narrow columns] → `.cell-indicator-row` uses `flex-wrap: wrap`, so it degrades gracefully rather than overflowing.
