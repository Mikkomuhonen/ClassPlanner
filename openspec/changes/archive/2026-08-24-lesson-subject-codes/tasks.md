## 1. Subject registry — data layer

- [x] 1.1 Add `loadSubjects()` and `saveSubjects()` helpers that read/write the `subjects` array from `localStorage`; verify that a round-trip (save then load) returns the same array
- [x] 1.2 Initialize `subjects` variable on app load by calling `loadSubjects()`; verify the variable is populated from `localStorage` on page reload
- [x] 1.3 Add subject code normalization (uppercase trim) to all entry points; verify that entering `"ma "` stores as `"MA"`

## 2. Subject registry — edit mode UI

- [x] 2.1 Add a "Oppiaineet" section to the edit mode panel (after the existing participant groups section); verify the section heading is visible in edit mode
- [x] 2.2 Render each registry entry as a row with code, name input, color picker, reorder buttons (↑ ↓), and delete button (🗑); verify all controls are visible for a sample registry entry
- [x] 2.3 Implement add-subject form (code input + "Lisää" button) that creates a new entry with default grey color; verify duplicate codes are rejected with an inline error
- [x] 2.4 Implement delete: remove entry from `subjects` array, call `saveSubjects()`, re-render; verify the deleted subject no longer appears in the list
- [x] 2.5 Implement reorder (↑ / ↓): swap adjacent entries, save, re-render; verify order change is reflected immediately
- [x] 2.6 Implement live edit of name and color: on change event update the entry in the array and call `saveSubjects()`; verify that changing a color in edit mode updates badges in the grid cells immediately after `renderGrid()`

## 3. Popup — subject selection

- [x] 3.1 Add a `popupSubjects` variable (array of selected codes) initialized when the popup opens from `cell.subjects || []`
- [x] 3.2 Add a `renderPopupSubjects()` function that renders: selected subjects as removable chips, registry subjects as toggle buttons (highlighted when selected), and a free-text input with a "+" button; verify the section appears below the time row in the popup
- [x] 3.3 Implement chip removal: clicking ✕ on a chip removes the code from `popupSubjects` and re-renders; verify the chip disappears and the registry button reverts to unselected state
- [x] 3.4 Implement toggle buttons: clicking a registry button adds or removes the code from `popupSubjects`; verify a selected button is visually highlighted
- [x] 3.5 Implement on-the-fly creation: if the typed code is not in `subjects`, create a new entry (default grey color, empty name), call `saveSubjects()`, add to `popupSubjects`, re-render; verify the new subject appears in the edit mode registry after closing the popup
- [x] 3.6 On popup close (`savePopup()`), include `subjects: [...popupSubjects]` in `slotData`; verify the value is stored in `weekData` and survives a save/load cycle

## 4. Grid cell — subject badge rendering

- [x] 4.1 In `renderGrid()`, after rendering the time div, if `cell.subjects?.length`, render a badge row: one pill per code, background color from registry (fall back to `#9ca3af` if code not found), font size larger than `.cell-participants`; verify badges appear in a cell that has subjects
- [x] 4.2 Verify that a cell with no subjects shows no badge row
- [x] 4.3 Verify that changing a subject's color in edit mode and calling `renderGrid()` updates badge colors in all affected cells

## 5. Backward compatibility

- [x] 5.1 Verify that a saved `viikko_YYYY_WNN.json` that has no `subjects` field in its cells loads without errors and displays no badges
