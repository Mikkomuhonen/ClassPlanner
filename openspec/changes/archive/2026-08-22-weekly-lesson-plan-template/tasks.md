## 1. Project scaffolding

- [x] 1.1 Create `public/` directory and `public/index.html` skeleton (DOCTYPE, head with meta charset/viewport/title and inline style + script tags, body with placeholder content) — verify the file exists at `public/index.html`
- [x] 1.2 Update `package.json` `start` script from `node src/index.js` to `npx serve public` — verify `npm start` serves the page at `http://localhost:3000`

## 2. Week grid rendering

- [x] 2.1 Implement the default break schedule as a JavaScript array of `{type, start, end}` objects (lesson/break slots from 08:00–15:00) — verify the array produces 7 lesson slots with correct default start/end times when logged to the console
- [x] 2.2 Render the week grid from the schedule array as an HTML table: header row (Aika, Ma, Ti, Ke, To, Pe), one lesson row per slot spanning all five day columns, break rows as full-width separators labelled with duration — verify table renders with correct structure on page load

## 3. Edit mode

- [x] 3.1 Implement the edit mode toggle button: clicking adds/removes an `edit-mode` class on the body and toggles the button label between "✏️ Muokkaa rakennetta" and "✓ Valmis" — verify class and label change on each click
- [x] 3.2 In edit mode show duration controls (decrement / value / increment) on each break row and an "Lisää välkkä" link after each lesson row; hide them in normal mode — verify controls are visible only when `edit-mode` class is present
- [x] 3.3 Implement break duration change: updating a break's duration mutates the schedule array and re-renders the grid, recalculating all subsequent lesson and break start/end times — verify time labels shift correctly after a duration change
- [x] 3.4 Implement add/remove break: inserting a new break after a lesson row or deleting an existing break updates the schedule array and re-renders the grid — verify lesson count and times adjust accordingly

## 4. Lesson cell popup

- [x] 4.1 Implement popup open: clicking a lesson slot cell opens a modal overlay showing the cell's time range label, a participant panel (placeholder list), and a textarea pre-filled with any saved text — verify popup appears with correct time label
- [x] 4.2 Implement popup close: clicking outside the modal or a close button hides the overlay and persists the textarea value and participant selection back into the cell's in-memory data — verify content is retained after closing
- [x] 4.3 Display a text preview (first line of content) and a comma-separated participant list in the lesson slot cell — verify the cell shows updated preview immediately after the popup closes

## 5. Participant selection in popup

- [x] 5.1 Implement the in-memory participant registry data structure: an array of `{name, members[]}` group objects, initialised with one empty placeholder group — verify structure is accessible in the popup
- [x] 5.2 Render all groups and their members in the popup participant panel with checkboxes; pre-check names that are already in the lesson slot's participant list — verify checkboxes reflect current selection when popup opens
- [x] 5.3 Implement individual name toggle: clicking a checkbox adds the name to or removes it from the lesson slot's participant list and updates the cell preview — verify checkbox state and preview update correctly
- [x] 5.4 Implement group quick-select button per group: clicking it replaces the lesson slot's participant list with exactly that group's current members and updates all checkboxes — verify previous cross-group selections are cleared

## 6. Registry management in edit mode

- [x] 6.1 Render a participant registry section below the grid in edit mode showing each group header with an add-name control, a delete-group control, and each member with a delete-name control — verify section is visible only in edit mode
- [x] 6.2 Implement add group: clicking "Uusi ryhmä" appends a new group with an inline editable name input — verify the new group appears in both the registry section and the popup participant panel
- [x] 6.3 Implement add name: clicking the add-name control within a group appends an inline editable name entry — verify the new name appears in the popup participant panel for that group
- [x] 6.4 Implement delete group and delete name: clicking the respective delete controls removes the entry from the registry; the popup participant panel updates accordingly — verify removed items no longer appear

## 7. File persistence

- [x] 7.1 Implement folder selection: clicking the folder button calls `showDirectoryPicker()`, stores the `FileSystemDirectoryHandle` in a module-level variable, and displays the folder name in the toolbar; if the API is absent, show a "Selain ei tue kansionvalintaa" message and disable save/load — verify folder name appears in toolbar after selection
- [x] 7.2 Implement save week: clicking the save button serialises the current week's lesson slot data to JSON and writes `viikko_YYYY_WNN.json` to the selected folder — verify the file appears in the chosen folder with correct content
- [x] 7.3 Implement load week: when the displayed week changes (navigation) or the user clicks the open button, attempt to read `viikko_YYYY_WNN.json` from the folder and populate grid cells; show empty grid if file does not exist — verify cells populate correctly from a previously saved file
- [x] 7.4 Implement config persistence: on exit from edit mode write `config.json` (schedule array + registry) to the folder; on page load attempt to read `config.json` and restore schedule and registry if the file exists — verify config survives a page reload when the folder is re-selected

## 8. Week navigation

- [x] 8.1 Implement week header: compute the ISO week number and the Monday–Friday date range from a `currentWeekOffset` variable (0 = current week) and display them in the header — verify correct week number and dates are shown on load
- [x] 8.2 Implement previous/next controls: clicking them increments/decrements `currentWeekOffset`, updates the header dates and week number, and triggers a grid load for the new week — verify navigation changes the displayed week and loads/clears grid data

## 9. Polish and print

- [x] 9.1 Implement unsaved-changes guard: set a dirty flag when lesson data changes; on `beforeunload`, if the flag is set return a confirmation string so the browser prompts the user — verify the browser dialog appears when closing the tab with unsaved edits
- [x] 9.2 Implement print support: add a print button that calls `window.print()`; add `@media print` CSS that hides toolbar, controls, edit-mode elements, and break control buttons, and renders the grid full-width in A4 landscape orientation — verify print preview shows only the week grid without UI chrome
