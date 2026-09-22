## Why

The lesson slot popup can grow taller than the viewport once a subject, several participants, lunch info, and free-form text are all present. The popup container clips overflowing content (`overflow: hidden`) with no scrollable region, so the footer's "Tallenna"/"Peruuta" controls and other fields can become inaccessible on smaller screens or with content-heavy slots. Separately, the only way to clear a slot's content today is the destructive "Tyhjennä solu" control, which also discards the time override, lunch info, and supervision flag — there is no way to clear just the text/participants/subjects while preserving those other settings.

## What Changes

- Make the popup's body (everything between the header and the footer) a single scrollable region so long content no longer clips the footer or any field off-screen; the header and footer stay pinned in view.
- Cap the free-text textarea's manual resize growth so a user can no longer resize it enough to push the footer out of view.
- Add a new non-destructive "Tyhjennä sisältö" (Clear content) control next to the existing "Tyhjennä solu" (Clear cell) control. It clears only the popup's text, participants, and subjects (in the in-popup editing state), leaving the time override, lunch settings, and supervision flag untouched. Like other field edits, it only takes effect once the user activates "Tallenna"; it does not write to stored data immediately and does not close the popup.

## Capabilities

### Modified Capabilities
- `week-planner`: the "Lesson slot popup editor" requirement gains scrollable-popup behavior and a new non-destructive content-clearing control.

## Impact

- Affected file: `docs/index.html` (popup CSS: `#popup`, new `#popupBody`, `#popupParticipants`, `#popupText`; popup HTML markup; new `clearContentBtn` click handler in the inline script).
- No data model or storage changes; no impact on cloud-sync or other capabilities.
