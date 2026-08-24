## Context

The application is a single HTML file (`public/index.html`) with all logic inline. State is split between `localStorage` (persistent configuration: rhythms, participant groups) and in-memory week data that is saved/loaded as JSON files via the File System Access API. The existing participant groups pattern — a registry object stored in `localStorage`, chip-based selection in the popup, rendered inline in cells — is the direct model for the subject registry.

## Goals / Non-Goals

**Goals:**
- Add a subject registry to `localStorage` alongside the existing rhythm and participant data
- Enable multi-subject selection per lesson slot in the popup
- Render subject badges (colored, prominent) in lesson cells next to the time
- Allow on-the-fly subject creation from the popup
- Manage the registry (add, edit, color, delete, reorder) in edit mode

**Non-Goals:**
- Subject-based filtering or reporting across weeks
- Exporting or importing the subject registry
- Subject assignment at the day or week level (only per slot)
- Validation of subject codes against any external curriculum standard

## Decisions

### 1. Storage key and shape

Subject registry stored in `localStorage` under key `subjects` as a JSON array:

```json
[
  { "code": "MA", "name": "Matematiikka", "color": "#3b82f6" },
  { "code": "FY", "name": "Fysiikka",     "color": "#8b5cf6" }
]
```

**Why array, not object?** Order matters for display and consistent UI. An array preserves insertion/drag order with no extra bookkeeping, matching how `participantGroups` is handled.

**Alternatives considered:** keyed object (`{MA: {...}}`) — simpler lookup, but order is not guaranteed across JS engines for non-integer keys, and reorder logic is more complex.

### 2. Cell data: store codes, not full objects

`cell.subjects` stores an array of code strings (e.g., `["MA", "FY"]`), not copies of registry entries. Color and name are resolved at render time from the registry.

**Why?** Decouples stored week data from display decisions. Changing a color in the registry is immediately reflected everywhere without touching saved files. Matches how `cell.participants` stores names, not group objects.

**Risk:** If a subject is deleted from the registry, its code remains in saved week data and renders as a badge without a color (falls back to a neutral grey). Accepted trade-off — the user deleted it deliberately.

### 3. On-the-fly creation: add to registry immediately (Option A)

When a user types an unknown code in the popup and confirms, the code is added to the registry with a default grey color and an empty name, then selected for the slot.

**Why?** Lowest friction. The user can always open edit mode to add the full name and pick a color later. Consistent with the "quick capture, refine later" philosophy of the rest of the app.

**Alternative (Option B — ask for name/color first):** More complete data upfront but interrupts the flow of filling in a lesson slot.

### 4. Popup layout

Subject section is placed immediately below the time row, above participants. This matches the visual hierarchy requested: subjects are more prominent than participants.

```
[time row]
[subject chips + registry buttons + free-text input]
[participants]
[text area]
```

### 5. Badge style in cell

Subjects rendered as small pills with colored background on the same line as the time indicator (`cell-time` row or adjacent). Font size larger than `.cell-participants` to give subjects visual priority.

## Risks / Trade-offs

- **Large number of subjects:** If the registry grows long, the popup's subject button row could become crowded. Mitigation: the row can wrap; no hard limit imposed now, revisit if UX suffers.
- **Code collision on-the-fly:** If two codes differ only in case (e.g., `ma` vs `MA`), they could be duplicates in intent. Mitigation: normalize codes to uppercase on input.
- **Saved file compatibility:** Old `viikko_YYYY_WNN.json` files have no `subjects` field in cells. Mitigation: treat missing `subjects` as `[]` at load time — no migration needed.

## Migration Plan

No server or database migration. `localStorage` key `subjects` is absent in existing sessions; the app treats absence as an empty array on first load.
