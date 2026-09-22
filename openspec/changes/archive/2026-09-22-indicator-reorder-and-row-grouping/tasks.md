## 1. Indicator order data and popup UI

- [x] 1.1 Extend `getIndicatorOrder` to resolve order from `cell.indicatorOrder` array, falling back to legacy `lunchBeforeBreak`, falling back to chronological — verified by manual testing of slots with each data shape
- [x] 1.2 Replace `#swapOrderBtn` with `#indicatorOrderList`, add `popupIndicatorOrder`/`popupIndicatorOrderChanged` state and `renderIndicatorOrder()`/`moveIndicatorOrder()` — verified by opening the popup and reordering via the ↑/↓ controls
- [x] 1.3 Persist `slotData.indicatorOrder` in `savePopup()` only when `popupIndicatorOrderChanged` is true — verified by saving without reordering and confirming no `indicatorOrder` field is written
- [x] 1.4 Reset order state in the clear-cell handler — verified by clearing a slot and reopening the popup to see the default order

## 2. Same-row grouping in the grid

- [x] 2.1 Build an `indicatorEls` map of break/supervision/lunch elements in `renderGrid()` and append the present ones, in resolved order, into a single `.cell-indicator-row` wrapper — verified visually for cells with 1, 2, and 3 indicators present
- [x] 2.2 Add `.cell-indicator-row` CSS and adjust indicator classes' margins/borders when inside the row wrapper — verified visually that indicators appear as inline badges on one row

## 3. Documentation

- [x] 3.1 Document the reorder list and same-row grouping behavior in the `week-planner` spec (this change)
