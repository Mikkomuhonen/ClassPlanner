## Context
Implementation lives in `docs/index.html`, in `renderPopupParticipants()`. See `proposal.md` - Why.

## Goals / Non-Goals
**Goals:**
- Let the teacher add every registry participant to a slot in one click.
- Keep the existing per-group select-all and per-participant toggle/removal behavior unchanged.

**Non-Goals:**
- Changing how groups or members are managed in the registry itself.
- Adding an "unselect all" control (individual removal already covers this).

## Decisions
- **Top-level button rendered once above the group list**, rather than modifying each group's own button, so the two actions (select one group vs. select everything) remain visually and behaviorally distinct.
- **Reuses the existing `popupParticipants` array and de-duplication logic** (`if (!popupParticipants.includes(m))`) already used by the per-group button, avoiding new state or duplicate-entry bugs.

## Risks / Trade-offs
- [Selecting all groups on a large registry could add many participants at once, making the chip row long] → Acceptable since removal is a single click per chip and the content area already scrolls.
