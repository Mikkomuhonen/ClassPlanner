## 1. Popup Footer Buttons

- [x] 1.1 Add "Tallenna" (primary, `--chalk-blue`) and "Peruuta" (secondary/outlined) buttons to the popup footer markup in `docs/index.html`, and verify both render in the popup and are visually distinct (primary vs secondary)
- [x] 1.2 Add an inline confirmation element (or reuse the button's own text-swap pattern) for the save flash, and verify it is hidden by default

## 2. Split Save/Cancel Logic

- [x] 2.1 Refactor `closePopup()` into `savePopup()` (existing read-fields-and-write-to-weekData logic, unchanged) and a new `cancelPopup()` (resets popup state and hides the overlay without writing to `weekData`), and verify both functions exist and `weekData` is unchanged after `cancelPopup()` runs
- [x] 2.2 Add the save confirmation flash to `savePopup()` (swap "Tallenna" button label to "✓ Tallennettu" for ~1.2–1.5s, matching the existing toolbar save-button pattern, then close the popup), and verify the flash is visible before the popup closes

## 3. Rewire Triggers

- [x] 3.1 Wire the new "Tallenna" button's click handler to `savePopup()`, and verify clicking it saves edits and shows the confirmation
- [x] 3.2 Wire the new "Peruuta" button's click handler to `cancelPopup()`, and verify clicking it discards edits with no confirmation flash
- [x] 3.3 Rewire the existing `#popupClose` (✕) click handler from `closePopup()` to `cancelPopup()`, and verify clicking ✕ after edits discards them
- [x] 3.4 Rewire the existing backdrop-click handler from `closePopup()` to `cancelPopup()`, and verify clicking the backdrop after edits discards them

## 4. Verification Pass

- [ ] 4.1 Manually verify: open a slot, edit text/participants/subjects, click "Tallenna" — the cell reflects the edit and a confirmation is shown
- [ ] 4.2 Manually verify: open a slot, edit fields, click "Peruuta" — the cell is unchanged from before opening the popup
- [ ] 4.3 Manually verify: open a slot, edit fields, click ✕ — the cell is unchanged (same as Peruuta)
- [ ] 4.4 Manually verify: open a slot, edit fields, click the dark backdrop outside the popup — the cell is unchanged (same as Peruuta)
- [ ] 4.5 Manually verify time override, lunch time, and supervision toggle each still save correctly via "Tallenna" and are discarded correctly via "Peruuta"/✕/backdrop
