## Why

The lesson-slot popup editor currently saves whatever the user typed as soon as the popup closes — whether closed via the ✕ button, the backdrop, or (implicitly) any other dismissal. There is no way to discard an edit, and the ✕ icon (which conventionally means "dismiss without saving") actually commits the change. This creates confusion: users click an empty area expecting nothing to happen, or click ✕ expecting to discard, and their edit is saved either way. The fix is to make Save and Cancel explicit, distinct actions, and to give visible feedback when something is saved.

## What Changes

- **BREAKING** (behavior): Closing the popup no longer implicitly saves. The popup requires an explicit action to persist changes.
- Add a **"Tallenna" (Save)** primary button and a **"Peruuta" (Cancel)** button to the popup footer.
- "Tallenna" commits all popup edits (text, participants, subjects, time override, lunch, supervision) to the current week's data, same fields as today, then closes the popup and shows a brief inline confirmation (e.g. "✓ Tallennettu").
- "Peruuta" discards all in-popup edits and closes the popup without touching stored data.
- The ✕ close control and clicking the backdrop now behave as **Cancel** (discard), matching conventional UI expectations for those affordances, instead of silently saving.
- If the user attempts to close a popup with unsaved changes via ✕/backdrop/Escape, nothing is written — this is a deliberate no-confirmation discard (matching the "X = dismiss" convention), not a silent save.
- General: any other save-completing action in the app that currently lacks visible feedback (e.g., silent success) should show a brief confirmation, consistent with the existing toolbar Save button's "✓ Tallennettu" flash pattern.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
- `week-planner`: The "Lesson slot popup editor" requirement changes from "closing the popup saves" to "an explicit Save action saves; Cancel/✕/backdrop discard." All scenarios describing "closes the popup" as the save-triggering action are reworded to describe the explicit Save button, and new scenarios are added for Cancel/✕/backdrop discarding unsaved edits and for the save-confirmation feedback.

## Impact

- `docs/index.html`: popup markup (`#popup` footer area) gains "Tallenna"/"Peruuta" buttons; `closePopup()` JS logic is split into a `saveAndClosePopup()` (renamed/refactored from today's `closePopup()`) and a `cancelPopup()` that discards in-memory popup state without writing to `weekData`; the ✕ button and backdrop-click handler are rewired to call `cancelPopup()` instead of the save-and-close path; a small on-screen confirmation element/flash is added for the save action.
- No changes to Firestore data shape, auth, or any other capability — this only changes when/how the existing popup fields get written.
