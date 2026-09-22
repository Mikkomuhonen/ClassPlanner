## 1. On-screen cell color coding

- [x] 1.1 Add `hexToRgba()` color utility and verify it converts 3- and 6-digit hex colors to an `rgba(...)` string with the given alpha
- [x] 1.2 In `renderGrid()`, compute the first selected subject's color per cell and apply a light background tint plus a left-edge accent box-shadow via inline styles, and verify cells with subjects show the tint on screen
- [x] 1.3 Verify cells without subjects keep the existing plain/highlighted background (no tint applied)
- [x] 1.4 Add a `has-subject-color` hover rule so tinted cells darken slightly on hover instead of losing their tint

## 2. Print color toggle

- [x] 2.1 Add a "🎨 Väritä tulosteessa" checkbox control to the toolbar and verify it is hidden in print output (inherits `#toolbar`'s existing print `display: none`)
- [x] 2.2 Set `--cell-tint`/`--cell-accent` CSS custom properties on each tinted cell alongside the existing inline styles, and verify they are present in the DOM via inspection
- [x] 2.3 Add a print stylesheet rule scoped to `body.print-colors .lesson-cell.has-subject-color` that reads the custom properties with `!important`, and verify it is more specific than the default `.lesson-cell.has-content` print rule
- [x] 2.4 Wire the checkbox to toggle the `print-colors` body class on change, and verify toggling it changes which print rule applies (inspect via browser print preview)
- [x] 2.5 Persist the toggle's state to `localStorage` on change and restore it on page load, and verify the checkbox reflects the saved state after a reload
- [x] 2.6 Verify the default (unset) state is off, matching the prior badge-only printed appearance
