## Context

`docs/index.html`'s popup editor (`#popup`/`#popupOverlay`) is opened by `openPopup(dayIdx, slotIdx)` and today closed exclusively by `closePopup()`, which both reads all popup form fields and writes them into `weekData[key][DAYS[dayIdx]][slotIdx]`, then hides the overlay. Three triggers call `closePopup()` today: the ✕ button, a backdrop click (`popupOverlay` click where `e.target === popupOverlay`), and no other path (no Escape handling exists). See `proposal.md` - Why for the UX problem this causes.

The toolbar's existing `saveBtn` already has a working "flash a confirmation" pattern (swap button text to "✓ Tallennettu" for ~1.5s then revert) that this change should reuse the same visual idiom for, for consistency.

## Goals / Non-Goals

**Goals:**
- Split "read popup fields and write to weekData" from "close the popup" so Save and Cancel/✕/backdrop can diverge.
- Make discarding an edit possible for the first time (currently every close path saves).
- Add a save confirmation consistent with the existing toolbar pattern.

**Non-Goals:**
- No "unsaved changes?" confirmation dialog before discarding — per the proposal, ✕/backdrop/Cancel intentionally discard immediately without prompting, matching the conventional meaning of an X icon.
- No change to which fields are captured or their data shape in `weekData` — only when the write happens.
- No change to other popups/sections (registry, rhythms, breaks editors) in this change — those are out of scope unless the user asks for a follow-up change.

## Decisions

**1. Rename/refactor `closePopup()` into two functions: `savePopup()` and `cancelPopup()`, both calling a shared `hidePopupOverlay()`.**
`savePopup()` contains exactly today's `closePopup()` body (read fields → write to `weekData` → `dirty = true` → `renderGrid()`) plus the new confirmation flash, then hides the overlay. `cancelPopup()` skips all reads/writes and just resets `popupState`/`popupParticipants`/`popupSubjects` and hides the overlay. Alternative considered: keep one function with a boolean `shouldSave` parameter — rejected as slightly less readable than two clearly-named functions for two clearly distinct user intents.

**2. Add "Tallenna" and "Peruuta" buttons to the existing popup footer area (near `#popupResetTime`/copy controls), styled as primary/secondary using the tokens from the `timetable-board-redesign` change already on this branch** (`--chalk-blue` for the primary Tallenna button, a plain/outlined style for Peruuta), so the buttons visually fit the in-progress redesign rather than reintroducing old ad hoc colors.

**3. Rewire existing triggers**: `#popupClose` (✕) and the backdrop-click handler both now call `cancelPopup()` instead of `closePopup()`. No Escape-key handling exists today and none is added in this change (out of scope; could be a fast follow).

**4. Confirmation feedback**: reuse the toolbar's flash idiom — on save, briefly change the "Tallenna" button's own label to "✓ Tallennettu" for ~1.2–1.5s (matching the existing `saveBtn`/`loadBtn`/`templateBtn` timing already in the codebase), then revert, then close the popup after the flash completes (small delay) so the user actually sees the confirmation before the popup disappears. Alternative considered: a toast/snackbar — rejected as unnecessary new UI pattern when an existing, working idiom already fits.

## Risks / Trade-offs

- [Risk] Existing users may have muscle memory of "click outside to save" and be surprised edits are now discarded on backdrop click → [Mitigation] This is the explicit, intended fix for the confusion reported; the new Tallenna/Peruuta buttons make the required action visually obvious the first time.
- [Risk] Delaying popup close until after the confirmation flash could feel sluggish if the delay is too long → [Mitigation] Keep the delay short (match existing ~1.2–1.5s pattern already used elsewhere, which has been acceptable) or close immediately and show the flash as a transient element that outlives the popup briefly (implementation detail decided during coding, not spec-relevant).
- [Trade-off] No confirm-before-discard dialog means a genuine "I still had a change but clicked in the wrong place" is now a lost edit rather than a lost click; this trade-off matches the proposal's explicit scope decision (X = discard, no prompt) and can be revisited later as a separate change if it proves undesirable in practice.

## Migration Plan

1. Add "Tallenna"/"Peruuta" buttons to the popup footer markup.
2. Split `closePopup()` into `savePopup()` (today's logic + confirmation flash) and `cancelPopup()` (discard-only).
3. Rewire `#popupClose` click handler and the backdrop-click handler to call `cancelPopup()`.
4. Wire the new "Tallenna" button to `savePopup()` and "Peruuta" button to `cancelPopup()`.
5. Manually verify: edit a slot and click Tallenna (change persists + confirmation shows); edit a slot and click Peruuta/✕/backdrop (change is discarded in all three cases).
6. Commit on the existing `redesign-timetable-ui` branch (already the active branch, already off `main`); no separate branch needed since this is a continuation of in-progress UI work on the same branch.

No data migration needed — this only changes when existing fields are written, not their shape.
