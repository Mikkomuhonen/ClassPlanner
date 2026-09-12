## 1. Design Tokens & Typography

- [x] 1.1 Add `:root` CSS custom properties for the 5 signal colors (`--ink`, `--paper`, `--chalk-blue`, `--marker-amber`, `--signal-green`) and a small type-scale set of custom properties, and verify they are defined once at the top of the `<style>` block in `docs/index.html`
- [x] 1.2 Add a Google Fonts `<link>` for the chosen sans-serif (Inter or IBM Plex Sans) with `display=swap`, and update `body { font-family }` to reference it with `system-ui` as fallback, and verify the font loads (Network tab) and text renders in the new typeface
- [x] 1.3 Replace the page `background` from `#f0f2f5` to `var(--paper)`, and verify the page background reads as a warmer off-white in the browser

## 2. Toolbar Restyle

- [x] 2.1 Replace the toolbar's `#1e3a5f`/`#2c5282` navy hex values with `var(--ink)`, and verify the toolbar renders with the new color and no leftover hardcoded navy hex remains in that rule block
- [x] 2.2 Flatten the pill-button-on-dark-navy toolbar button style into a quieter, higher-contrast treatment, and verify buttons remain clickable and legible against the new toolbar background
- [x] 2.3 Verify `body.edit-mode #editToggle` and other state-dependent toolbar styles still read clearly against the restyled toolbar

## 3. Status Indicator System (Grid Cells)

- [x] 3.1 Replace `.lesson-cell.has-content` full-cell background wash with a left-edge accent bar using `var(--chalk-blue)`, and verify cells with content show the accent bar instead of a full yellow background
- [x] 3.2 Replace `.cell-lunch-break` / `.cell-lunch` background-wash pill styling with text/label styling using `var(--marker-amber)`, and verify lunch/break markers are legible and visually distinct from lesson content
- [x] 3.3 Replace `.cell-supervision` background-wash blue pill styling with `var(--signal-green)` based styling, and verify supervision markers no longer share the same blue as lesson accents
- [x] 3.4 Consolidate the several near-duplicate amber hex values (`#f59e0b`, `#d97706`, `#fcd34d`, `#fef3c7`, `#92400e`, `#b45309`) into `var(--marker-amber)` and its tints, and verify no orphaned amber hex literals remain in the affected rules
- [x] 3.5 Verify `.cell-time.time-overridden` and other small status text colors remain legible against the new palette

## 4. Today-Column Highlight

- [x] 4.1 Identify the grid header/column render logic (in the JS render functions) and add a `.day-today` class to the column matching the current date, and verify the class appears on the correct column when the app loads on a weekday within the current week
- [x] 4.2 Add CSS for `.day-today` giving today's column a single deliberate highlight treatment (e.g. header background or top-accent), and verify only one column is highlighted at a time and it updates correctly when navigating between weeks

## 5. Sign-In Overlay Redesign

- [x] 5.1 Restyle `#signedOutOverlay` as a deliberate hero moment (typography, spacing, sign-in button treatment) using the new tokens, and verify the sign-in screen renders correctly when signed out and the sign-in button remains functional
- [x] 5.2 Verify the auth error message (`#authError`) styling still reads clearly against the redesigned overlay

## 6. Breaks Section & Remaining Polish

- [x] 6.1 Update `#breaksSection` and break-related controls (`.break-add-btn`, `.break-dur-dec`/`.break-dur-inc`, `.popup-lunch-row`) to use the new tokens where applicable, and verify the structure edit popup remains usable and legible
- [x] 6.2 Sweep the remaining `<style>` block for any leftover pre-redesign hex literals that should reference a token instead, and verify via search that no unintended hardcoded colors remain outside of user-configurable areas (subject registry colors, note colors) which are intentionally left unchanged

## 7. Verification Pass

- [ ] 7.1 Manually verify the normal (signed-in) grid view across all weekday columns looks correct with the new palette and typography
- [ ] 7.2 Manually verify edit mode (structure editing, break add/remove, lunch marker) still functions and looks correct
- [ ] 7.3 Manually verify the signed-out sign-in overlay and a failed sign-in error state both look correct
- [ ] 7.4 Manually verify print output (browser print preview) still shows notes with preserved background colors and subject badges with registry colors unchanged, confirming this redesign did not regress existing print requirements
- [ ] 7.5 Take a screenshot of the redesigned grid and toolbar and do a self-critique pass per the frontend-design skill (does it still read as a generic template, or does it feel deliberate?) before considering the change complete

