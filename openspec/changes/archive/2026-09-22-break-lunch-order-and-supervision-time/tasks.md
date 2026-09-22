## 1. Effective supervision helper

- [x] 1.1 Add `getEffectiveSupervision(cell, brk, lessonEndMin)` next to `getEffectiveLunch`, returning `{start, duration}` or `null`, defaulting start to `lessonEndMin` and duration to the break's duration when no per-slot override is set — verified by reading the function and confirming it mirrors `getEffectiveLunch`'s fallback shape

## 2. Grid rendering: ordering and indicator content

- [x] 2.1 In `renderGrid()`, group the break indicator and supervision indicator into a `brkGroup` fragment and the lunch indicator into a `lunchGroup` fragment — verify via `get_errors` and manual read of the diff
- [x] 2.2 Compute `lunchStartsFirst` as `cell.lunchBeforeBreak` when set, else `brk && effLunch && effLunch.start < t.end` — verify by reading the cell for a slot with an early lunch and one with a manual override
- [x] 2.3 Fix the corrupted supervision and lunch indicator glyphs to the correct emoji (🏃, 🍽️), verified byte-for-byte via `od -c` / `git show` before and after the edit
- [x] 2.4 Update the supervision indicator text to `🏃 Välkkävalvonta HH:MM (Xmin)` using `getEffectiveSupervision` — verify by opening a cell with supervision active and reading the rendered text

## 3. Popup: supervision time fields and manual order toggle

- [x] 3.1 Add hidden-by-default supervision start time input and duration select to the popup markup, shown only while the supervision toggle is active
- [x] 3.2 Add the "🔀 Ruokailu ennen välkkää" manual order toggle button to the popup markup
- [x] 3.3 In `openPopup()`, populate the supervision fields from `getEffectiveSupervision()` and the manual order toggle from `cell.lunchBeforeBreak`, toggling field visibility to match the supervision flag
- [x] 3.4 In the supervision toggle's click handler, show/hide the time fields and pre-fill defaults (lesson end time, break duration) the first time it is activated for a slot
- [x] 3.5 In `savePopup()`, persist `supervisionStart`/`supervisionDuration` (only when the supervision toggle is active and a value is present) and `lunchBeforeBreak` (when the manual order toggle is active)
- [x] 3.6 In the "Tyhjennä solu" handler, reset the supervision time fields and the manual order toggle alongside the existing supervision boolean reset

## 4. Verification

- [x] 4.1 Run `get_errors` on `docs/index.html` after each edit and confirm no new errors
- [x] 4.2 Manually verify the diff matches the intended behavior (chronological default order, manual override precedence, correct emoji bytes) before committing
- [x] 4.3 Commit and push the changes to `main`
