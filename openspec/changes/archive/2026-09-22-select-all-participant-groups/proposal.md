## Why
The popup's participant selection previously required selecting each registry group individually via its "Valitse kaikki →" button. When a teacher wants nearly everyone from across all groups in a slot, they had to click through every group separately. A single "select all groups" action, combined with the existing ability to deselect individual participants afterward, speeds up this common case.

## What Changes
- Add a "Valitse kaikki ryhmät →" control to the popup's participant selection section that adds every member of every registry group to the slot's selected participants in one action.
- Individual participants remain removable afterward via their existing chip (✕) or by toggling the member button off, unchanged from current behavior.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `week-planner`: the "Lesson slot popup editor" requirement gains a select-all-groups control for participant selection.

## Impact
- Affected file: `docs/index.html` — `renderPopupParticipants()` gains a top-level "select all groups" button rendered above the per-group list, and related CSS.
