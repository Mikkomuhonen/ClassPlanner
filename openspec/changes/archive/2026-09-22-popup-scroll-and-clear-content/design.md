## Context

The entire application (`docs/index.html`) is a single static HTML file with inline CSS and a classic `<script>` block — there is no build step or component framework. The lesson slot popup (`#popup`) is a fixed-width, flex-column card capped at `max-height: 88vh` with `overflow: hidden`. Only one inner section (`#popupParticipants`) had its own scroll region; every other section (time row, subjects, textarea, copy row, lunch rows, footer) had no scroll behavior of its own. When combined content exceeded 88vh, the excess was silently clipped by the outer `overflow: hidden` — most critically, the footer's "Tallenna"/"Peruuta" buttons could become unreachable.

## Goals / Non-Goals

- Goal: make the popup's content always reachable regardless of how much a slot contains, without changing the save/cancel data model.
- Goal: add a lightweight way to clear just text/participants/subjects, reusing the existing explicit save/cancel commit model rather than introducing a new persistence path.
- Non-goal: redesigning the popup's visual style, width, or field layout.
- Non-goal: touching the "Tyhjennä solu" (clear cell) control's existing immediate-write behavior.

## Decisions

### Single scrollable body wrapper
Wrap everything between `#popupHeader` and `.popup-footer-row` in a new `#popupBody` div styled `flex: 1 1 auto; min-height: 0; overflow-y: auto;`. `min-height: 0` is required because flex items default to `min-height: auto`, which would otherwise prevent the wrapper from shrinking below its content's natural height and defeat the scroll.

Alternative considered: give every individual section its own `overflow-y: auto` with a fixed `max-height` (as `#popupParticipants` already did). Rejected — this produces multiple nested scrollbars, is harder to reason about, and doesn't guarantee the footer stays visible when several sections grow at once.

### Remove `#popupParticipants`'s standalone scroll
Since the outer `#popupBody` now scrolls the whole content area, `#popupParticipants`'s own `max-height: 210px; overflow-y: auto` is redundant and would create a scrollbar-within-a-scrollbar. Removed in favor of the single outer scroll.

### Cap textarea growth
`#popupText` keeps `resize: vertical` (user-controlled growth) but gains `max-height: 320px` so a user cannot manually resize it enough to push the footer off-screen within the now-scrollable body. Beyond that cap, the surrounding `#popupBody` scroll takes over.

### New "Tyhjennä sisältö" control
Reuses the existing in-memory popup editing state (`popupParticipants`, `popupSubjects`, the `#popupText` value) exactly the way normal field edits work today. The handler:
1. Resets `popupParticipants = []`, `popupSubjects = []`, clears `#popupText`'s value.
2. Re-renders the participants and subjects sections so the UI reflects the cleared state.
3. Does **not** touch `weekData`, the time override, lunch fields, or the supervision button state, and does **not** close the popup.

This means "Tyhjennä sisältö" behaves exactly like editing any other field: it's only persisted on "Tallenna" and discarded on "Peruuta"/✕/backdrop, requiring no new commit path. This is deliberately different from "Tyhjennä solu", which writes directly to `weekData` and deletes the slot's stored entry immediately, independent of Tallenna/Peruuta.

## Risks / Trade-offs

- Removing `#popupParticipants`'s own `max-height` means a very large participant registry could take up much more of the scrollable body before the user reaches lower sections — acceptable since the whole body now scrolls as one unit and the header/footer remain pinned.
- The two "clear" controls being adjacent (`Tyhjennä sisältö` vs `Tyhjennä solu`) could be confused; mitigated with distinct icons/colors (neutral gray vs. destructive red, already applied) and distinct labels.

## Migration Plan

No data migration needed — this is a pure UI/behavior change to `docs/index.html` with no schema or storage-format changes.

## Open Questions

None.
