## 1. Scrollable popup body

- [x] 1.1 Add `#popupBody` wrapper div in the popup markup around all content between `#popupHeader` and `.popup-footer-row` (`docs/index.html`)
- [x] 1.2 Style `#popupBody` with `flex: 1 1 auto; min-height: 0; overflow-y: auto;` so it becomes the single scrollable region
- [x] 1.3 Remove `#popupParticipants`'s standalone `max-height`/`overflow-y` so it no longer creates a nested scrollbar
- [x] 1.4 Cap `#popupText`'s manual resize growth with `max-height: 320px`
- [x] 1.5 Verify the popup header and footer (Tallenna/Peruuta) remain visible and reachable when a slot has enough content (multiple participants, subjects, long text, lunch, supervision) to exceed the viewport height

## 2. "Tyhjennä sisältö" (clear content) control

- [x] 2.1 Add a `clearContentBtn` button to the popup markup next to the existing `clearCellBtn`, visually distinct (neutral styling vs. the destructive red "Tyhjennä solu")
- [x] 2.2 Wire `clearContentBtn`'s click handler to reset `popupParticipants`, `popupSubjects`, and the `#popupText` value, then re-render the participants and subjects sections
- [x] 2.3 Verify the handler does not modify `weekData`, the time fields, lunch fields, or the supervision toggle, and does not close the popup
- [x] 2.4 Verify activating "Tallenna" after "Tyhjennä sisältö" persists the cleared text/participants/subjects while preserving the existing time override, lunch, and supervision settings
- [x] 2.5 Verify activating "Peruuta" (or ✕/backdrop) after "Tyhjennä sisältö" discards the clear and leaves the slot's stored data completely unchanged
