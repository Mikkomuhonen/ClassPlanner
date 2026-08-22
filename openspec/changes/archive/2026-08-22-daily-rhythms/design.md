## Context

See proposal.md for motivation. All code lives in `public/index.html` (vanilla JS, no build tools). The current `recalc()` function hardcodes `let time = 480` (08:00) as the start of every day, and lesson cells truncate their text content to a single line via `.split('\n')[0]`.

## Goals / Non-Goals

**Goals:**
- Parameterise the day start time so each day column can use a different rhythm's `startMinutes`
- Replace the truncated one-line cell preview with full inline display of all content
- Keep the data model backward-compatible: existing `config.json` and `viikko_*.json` files load correctly; missing `rhythms`/`dayRhythms` fields fall back to defaults

**Non-Goals:**
- Per-day break structure (breaks remain shared across all rhythms)
- Lesson duration per rhythm (always 45 min)
- Responsive layout changes beyond natural cell height expansion

## Decisions

### D1: Rhythm as start-time offset, schedule stays absolute
`rhythms` is an array of `{name, startMinutes}` objects. The shared `schedule` array continues to store absolute minute values computed from a base of 480 (08:00). When rendering a cell for day `d`, compute `offset = rhythms[dayRhythms[d]].startMinutes - 480` and add it to `slot.start`/`slot.end` only for display (popup title, time label). The schedule array itself is never mutated by rhythm selection.

**Rationale:** Keeps `recalc()` unchanged. Rhythm display is a pure render-time transformation. Avoids re-running `recalc()` on every day column render.

**Alternative considered:** Store schedule as offsets from day start (0-based). Rejected — would require migrating existing saved files and rewriting `recalc()`.

### D2: Inline cell content — `white-space: pre-wrap` + auto height
Replace the single-line text preview with the full text node. Set `.lesson-cell` to `height: auto` (remove the fixed `min-height`; add a smaller minimum of ~40px so empty cells stay clickable). Use `white-space: pre-wrap` on `.cell-text` so newlines render without `<br>` elements.

**Rationale:** Zero JS change — only the `renderGrid()` text assignment (`textContent = full text` instead of `.split('\n')[0]`) and two CSS property changes. No layout framework needed; HTML table rows naturally expand to the tallest cell.

**Alternative considered:** `contenteditable` inline editing. Rejected — the popup model is already established and participant selection requires a dedicated panel.

### D3: Column header rhythm selector
In normal mode, day `<th>` shows `DAY_FULL[d] + ' (' + rhythm.name + ')'`. In edit mode, replace the text with a `<select>` listing all rhythm names, pre-selected to `dayRhythms[d]`. Changing the select updates `dayRhythms[d]` and re-renders the grid (to update popup titles).

**Rationale:** Consistent with existing edit-mode pattern (controls only visible when `body.edit-mode`). No additional panel needed.

### D4: Rhythms panel in edit mode
A new `#rhythmsSection` below the grid in edit mode (parallel to `#registrySection`). Each rhythm row has: name input, start-time input (`<input type="time">`), delete button. An "add rhythm" button appends a new entry. On deactivation of edit mode, `saveConfig()` persists everything (already triggered by `toggleEditMode`).

### D5: Default rhythms on first load
If `config.json` contains no `rhythms` field (first-time use or pre-existing config), initialise with four defaults: A=08:00, B=08:30, C=09:00, D=09:30. `dayRhythms` defaults to `[0,0,0,0,0]` (all days use rhythm A).

## Risks / Trade-offs

- **Tall rows with sparse days** → If one day has 10 lines of notes, all other day cells in that row expand to match. For a planning view this is acceptable; the user can choose to be concise. No mitigation needed.
- **config.json backward compatibility** → Old files without `rhythms` load successfully (D5 default). Old files are not rewritten until the user enters and exits edit mode.
- **Popup time label uses display offset, not stored offset** → Week data (`viikko_*.json`) stores lesson slot indices only, not absolute times. The displayed time in the popup is computed fresh from the current rhythm at render time. If the user later changes a rhythm's start time, old weeks will display new times for existing entries — this is intentional (the rhythm definition is the source of truth).
