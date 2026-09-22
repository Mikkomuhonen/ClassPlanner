## Context

`docs/index.html` renders lesson cells in `renderGrid()`. Print output is styled entirely via a single `@media print` block; `#toolbar` (and everything in it) is unconditionally hidden with `display: none !important` when printing, so any toolbar control never appears on the printed page itself — it only affects state read before printing. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Reflect a lesson's subject color on the cell background on screen, not just the badge.
- Let the teacher choose, per browser/device, whether printed cells also carry that background tint, without changing the default printed appearance for existing users.

**Non-Goals:**
- Not persisting the print-color preference to Firestore/cloud config — it is a local display preference, not planner data, and may reasonably differ per device.
- Not extending the coloring to multiple simultaneous subject colors (e.g. gradients/split cells) when a slot has more than one subject — only the first selected subject's color is used, consistent with how it's already used for cell classification.

## Decisions

- **CSS custom properties carry the per-cell color into print.** Each cell's tint (`--cell-tint`) and accent color (`--cell-accent`) are set via inline `style.setProperty(...)` in `renderGrid()`, in addition to the inline `background`/`box-shadow` already used for the screen appearance. The print stylesheet's default rule (`.lesson-cell.has-content { background: #fffde7 !important; }`) cannot be overridden by a per-cell inline color merely by specificity, since it's global and `!important`. Referencing the custom properties in a *more specific* print-only rule (`body.print-colors .lesson-cell.has-subject-color { background: var(--cell-tint, #fffde7) !important; ... }`) lets that rule win only when the toggle's `print-colors` body class is present, while leaving the default print rule as the fallback otherwise. Alternative considered: toggling two full sets of duplicate inline styles for print vs. screen — rejected as more code for no benefit over custom properties, which the cascade already resolves correctly by specificity.
- **Preference stored in `localStorage`, not per-week or per-account config.** Printing is a local, momentary action; unlike `dayBreaks`/`dayLunch` (structural, shared across devices via Firestore) this is a per-browser display preference with no reason to sync across devices.
- **Default is off (badge-only in print).** Preserves prior printed output exactly for anyone who doesn't interact with the new control, avoiding a surprise ink-heavy printout after this change ships.

## Risks / Trade-offs

- [Risk] A teacher on a new device/browser won't have their preference carried over (since it's `localStorage`, not account-level) → Mitigation: acceptable, since the default (badge-only) is the same lower-ink baseline previously in place; this is a convenience toggle, not planner data.
- [Risk] CSS specificity-based override is subtle and could break if someone edits print rules in the future without noticing the ordering/specificity dependency → Mitigation: documented here in design.md; the two rules are adjacent in the stylesheet for visibility.
