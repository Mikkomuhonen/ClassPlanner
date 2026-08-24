# week-planner Specification

## Purpose

Provides a weekly lesson plan grid (Monday–Friday, 08:00–15:00) where a teacher can view, fill in, navigate, save, and print lesson plans, with configurable break slots between lessons.

## Requirements

### Requirement: Week grid display
The system SHALL render a grid with five columns (Monday–Friday) and exactly seven lesson slot rows. There are no full-width break rows. Each lesson cell SHALL show a break indicator at its bottom when the day's configuration has a break after that lesson slot. Each day column header SHALL display the day name and the name of the rhythm currently assigned to that day. In edit mode each day column header SHALL provide a dropdown to change the day's rhythm assignment.

#### Scenario: Grid renders seven lesson rows
- **WHEN** the application loads
- **THEN** the grid shows exactly seven lesson slot rows (T1–T7) with no full-width break separator rows between them

#### Scenario: Break indicator in cell
- **WHEN** a lesson cell's day has a break configured after that lesson slot
- **THEN** a break duration badge appears at the bottom of that cell

#### Scenario: Column header shows assigned rhythm
- **WHEN** the grid is displayed in normal view mode
- **THEN** each day column header shows the day name followed by the assigned rhythm name in parentheses (e.g., "Maanantai (A)")

#### Scenario: Column header shows rhythm dropdown in edit mode
- **WHEN** the grid is displayed in edit mode
- **THEN** each day column header shows the day name and a dropdown control pre-selected to the day's current rhythm

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule. The popup SHALL provide optional lunch time fields: a start time input and a duration selector (15 or 20 minutes). When the user sets a lunch start time and closes the popup, the lunch start time and duration SHALL be stored for that slot in the current week's data. When the lunch start time field is empty, any previously stored lunch annotation SHALL be removed. The popup SHALL allow the user to select participants and enter free-form text. When the user changes the time fields and closes the popup, the overridden times SHALL be stored for that lesson slot for the current week. A control SHALL allow the user to clear the override and revert to the computed time. The popup SHALL close when the user clicks outside it or activates a close control.

The popup SHALL also include a subject selection section positioned between the time row and the participants section. The subject selection section SHALL display all registry subjects as selectable buttons. The user MAY select zero, one, or more subjects. A free-text input SHALL allow the user to type a code to create a new subject on the fly (see subject-registry spec). When the user closes the popup, the selected subject codes SHALL be stored as `subjects` (array of strings) in the lesson slot data for the current week.

#### Scenario: Popup opens with computed time
- **WHEN** the user clicks a lesson slot cell that has no time override
- **THEN** the popup shows the time computed from the day's rhythm and break configuration in editable time fields

#### Scenario: Popup opens with override time
- **WHEN** the user clicks a lesson slot cell that has a time override stored for the current week
- **THEN** the popup shows the overridden time in the time fields, visually distinguished from the computed time

#### Scenario: Save time override
- **WHEN** the user changes the time fields and closes the popup
- **THEN** the lesson cell displays the overridden time, and the override is saved to the current week's data

#### Scenario: Clear time override
- **WHEN** the user activates the "revert to default" control in the popup
- **THEN** the time override is removed and the cell reverts to displaying the computed time

#### Scenario: Set lunch time
- **WHEN** the user sets a lunch start time in the popup and closes it
- **THEN** the lesson cell shows a lunch indicator with the specified start time and duration

#### Scenario: Clear lunch time
- **WHEN** the user clears the lunch start time field in the popup and closes it
- **THEN** no lunch indicator appears in the lesson cell for that slot

#### Scenario: Save popup content
- **WHEN** the user closes the popup after making changes
- **THEN** the lesson slot cell displays all selected participant names and the full text content without truncation, and the cell height adjusts to accommodate the content

#### Scenario: Select subjects in popup
- **WHEN** the user selects one or more subjects and closes the popup
- **THEN** the selected subject codes are stored for that lesson slot and the cell displays subject badges

#### Scenario: Deselect all subjects
- **WHEN** the user deselects all subjects and closes the popup
- **THEN** no subject badges appear in the lesson cell

### Requirement: Lesson cell subject display
When a lesson slot has one or more subjects stored, the system SHALL render each subject as a color-coded badge on the same visual row as the time indicator. Subject badges SHALL use a larger font size than the participants line. When a slot has no subjects, no badge SHALL appear.

#### Scenario: Cell shows subject badges
- **WHEN** a lesson slot has one or more subjects stored
- **THEN** each subject's code appears as a badge with the background color defined in the subject registry, positioned on the same row as the time

#### Scenario: Cell shows no badge without subjects
- **WHEN** a lesson slot has no subjects stored
- **THEN** no subject badge appears in the cell

#### Scenario: Badge color follows registry
- **WHEN** a subject's color is changed in the registry
- **THEN** the badge in all cells referencing that subject reflects the updated color on next render

### Requirement: Edit mode toggle
The system SHALL provide a single toggle control that switches the page between normal view mode and edit mode. In normal mode, lesson cells are clickable for editing. In edit mode, break controls and participant registry management are visible; lesson cells are not editable.

#### Scenario: Toggle switches modes
- **WHEN** the user activates the edit mode toggle
- **THEN** the page transitions to edit mode, showing structure controls and hiding the lesson editing interaction
- **WHEN** the user deactivates the toggle
- **THEN** the page returns to normal mode

### Requirement: Week navigation
The system SHALL display the current week number and date range in the header and provide previous/next controls to navigate between weeks. Each week's data SHALL be stored and retrieved independently.

When the user navigates to a different week, the notes and to-do list SHALL update to show that week's notes and todos. If no data has been loaded for the destination week, the notes panel and to-do list SHALL be displayed empty.

#### Scenario: Navigate to adjacent week
- **WHEN** the user clicks the next or previous week control
- **THEN** the grid loads the data for that week, or displays an empty grid if no data has been saved for that week

#### Scenario: Notes change when navigating weeks
- **WHEN** the user navigates to a different week
- **THEN** the notes panel and to-do list reflect that week's notes and todos, not the previous week's

### Requirement: File persistence via File System Access API
The system SHALL allow the user to select a local folder once per session using the browser's directory picker. The system SHALL save the current week's data as `viikko_YYYY_WNN.json` in that folder when the user activates the save control. The system SHALL allow loading a saved week's file from the same folder.

The week's JSON file SHALL include the week's notes and to-do items alongside lesson slot data. When the user saves, notes and todos for the current week are written to the file. When the user loads a week, notes and todos are read from the file and displayed.

#### Scenario: Select folder and save week
- **WHEN** the user activates the folder selector and chooses a directory
- **THEN** the chosen folder is remembered for the session
- **WHEN** the user activates the save control
- **THEN** the current week data, notes, and todos are written to `viikko_YYYY_WNN.json` in the chosen folder

#### Scenario: Load saved week
- **WHEN** the user activates the open control and the chosen folder contains a file for the displayed week
- **THEN** the grid populates with the saved lesson slot data, and the notes and todos for that week are displayed

#### Scenario: Load week with no notes in file
- **WHEN** a saved week file contains no `notes` or `todos` fields
- **THEN** the notes panel and to-do list are displayed empty (backward compatible)

### Requirement: Print support
The system SHALL support printing the current week's grid via the browser print dialog. The printed output SHALL include the week header and all lesson slot rows with participants and text content. Controls, toolbar buttons, and edit-mode elements SHALL be hidden in the printed output.

When the current week has any notes or any to-do items, the printed output SHALL also include a second page containing the notes and to-do list. Notes SHALL be printed with their background colors preserved. All to-do items SHALL be printed with their checkbox state (checked or unchecked) and text. Action buttons (delete, add, color pickers) SHALL be hidden in the printed output. When there are no notes and no to-do items, the second page SHALL NOT appear.

The system SHALL ensure that note card text content is visible in the printed output regardless of browser handling of textarea elements.

#### Scenario: Print current week
- **WHEN** the user activates the print control
- **THEN** the browser print dialog opens and the print preview shows only the week grid in a compact layout suitable for A4 landscape paper

#### Scenario: Notes and todos print when content exists
- **WHEN** the user activates the print control and the current week has at least one note or one to-do item
- **THEN** the printed output includes a second page with the notes and to-do list after the grid page

#### Scenario: Notes page absent when no content
- **WHEN** the user activates the print control and there are no notes and no to-do items
- **THEN** the printed output contains only the week grid page

#### Scenario: Note colors preserved in print
- **WHEN** notes are printed
- **THEN** each note card retains its background color in the printed output

#### Scenario: All todos printed with checkbox state
- **WHEN** to-do items are printed
- **THEN** all items appear with a checkbox that reflects the done/undone state, and no action buttons are visible

#### Scenario: Note text visible in print
- **WHEN** notes are printed
- **THEN** the full text of each note is visible in the printed output

### Requirement: Inline cell content display
The system SHALL display the complete content of each lesson slot cell directly in the grid without truncation. All selected participant names SHALL appear as visible text in the cell. The entire text content SHALL be shown across as many lines as needed. Cell height SHALL expand automatically to fit its content. When a lunch annotation is set for the slot, the cell SHALL display a lunch indicator showing the lunch start time and duration. The grid SHALL remain readable when cells contain varying amounts of text.

#### Scenario: Full participant list visible in cell
- **WHEN** a lesson slot cell contains participant data
- **THEN** all participant names are visible in the cell without being cut off

#### Scenario: Full text visible in cell
- **WHEN** a lesson slot cell contains multi-line text
- **THEN** all lines of the text are visible in the cell without truncation

#### Scenario: Cell height adapts to content
- **WHEN** a lesson slot cell contains more text than the default minimum height allows
- **THEN** the cell expands vertically to show all content; adjacent cells in the same row expand to match the tallest cell in that row

#### Scenario: Full content visible when printing
- **WHEN** the user prints the weekly plan
- **THEN** each lesson slot cell in the printed output shows all participant names and the complete text content without truncation

#### Scenario: Lunch indicator visible in cell
- **WHEN** a lesson slot has a lunch start time set
- **THEN** the cell shows a lunch indicator with the format "🍽️ HH:MM (Xmin)"

#### Scenario: No lunch indicator when unset
- **WHEN** a lesson slot has no lunch start time
- **THEN** no lunch indicator appears in the cell

### Requirement: Lesson slot copy
The system SHALL provide a copy control in the lesson slot popup. The control SHALL allow the teacher to copy the current slot's content to any lesson slot on any weekday within the current week. The teacher SHALL select the target day and target lesson number (T1–T7) from dropdowns. Copying SHALL transfer participants, free-form text, and time override (if present) to the target slot, replacing its existing content. The source slot itself SHALL remain unchanged after the copy.

#### Scenario: Copy lesson to another day and slot
- **WHEN** the teacher selects a target day and target lesson number and activates the copy control in the popup
- **THEN** the target slot's participants, text, and time override are replaced with those of the current slot; the source slot's content is unchanged; the week grid updates to reflect the copied content

#### Scenario: Copy clears target's existing content
- **WHEN** the target slot already contains participants or text
- **THEN** the copy replaces the target's content entirely with the source's content

#### Scenario: Copy includes time override
- **WHEN** the source slot has a time override set
- **THEN** the copied slot also receives the same time override

### Requirement: Folder restore button across sessions
When the application loads and a previously selected folder handle is stored in IndexedDB, the system SHALL display a restore button in the toolbar showing the stored folder's name (e.g., "↩ Jatka: viikkosuunnitelmat"). Clicking the restore button SHALL request filesystem permission and, if granted, restore the folder as the active session folder, loading the current week's config and data. If permission is not granted or the handle is no longer valid, the restore button SHALL be hidden. The restore button SHALL NOT be shown when no handle is stored in IndexedDB. The system SHALL NOT attempt to call `requestPermission()` automatically on page load without a user gesture.

#### Scenario: Restore button appears when handle is stored
- **WHEN** the application loads and IndexedDB contains a previously stored folder handle
- **THEN** a restore button showing the folder name is visible in the toolbar

#### Scenario: Clicking restore button restores the folder
- **WHEN** the user clicks the restore button and the browser grants permission
- **THEN** the folder is set as the active session folder, config is loaded, and the current week's data is loaded

#### Scenario: Restore button hidden when permission denied
- **WHEN** the user clicks the restore button and permission is not granted
- **THEN** the restore button is hidden and no folder is set as active

#### Scenario: No restore button when no stored handle
- **WHEN** the application loads and IndexedDB contains no folder handle
- **THEN** no restore button is shown in the toolbar

#### Scenario: No automatic permission request on load
- **WHEN** the application loads
- **THEN** the system does not call requestPermission() without a user gesture

### Requirement: Clear notes with confirmation and undo
The notes panel SHALL provide a clear control. When the user activates the clear control, the system SHALL display a confirmation dialog. If the user confirms, all notes for the current week SHALL be removed and rendered empty. After clearing, a temporary undo control SHALL appear in the notes panel header for five seconds. Activating the undo control within that window SHALL restore the notes to their state before the clear. The undo control SHALL disappear when the five-second window expires or when the user navigates to a different week.

#### Scenario: Clear notes with confirmation
- **WHEN** the user activates the clear control in the notes panel
- **THEN** a confirmation dialog appears asking the user to confirm the action

#### Scenario: Confirmation cancelled
- **WHEN** the user dismisses the confirmation dialog
- **THEN** the notes remain unchanged

#### Scenario: Confirmation accepted
- **WHEN** the user confirms the clear action
- **THEN** all notes for the current week are removed and the notes panel shows empty

#### Scenario: Undo clears notes restoration
- **WHEN** the user activates the undo control within five seconds of clearing
- **THEN** all notes are restored to their state before the clear

#### Scenario: Undo expires
- **WHEN** five seconds elapse after clearing without the user activating undo
- **THEN** the undo control disappears and the clear is permanent for this session

### Requirement: Clear todos with confirmation and undo
The to-do list panel SHALL provide a clear control. When the user activates the clear control, the system SHALL display a confirmation dialog. If the user confirms, all to-do items for the current week SHALL be removed and the list rendered empty. After clearing, a temporary undo control SHALL appear in the to-do panel header for five seconds. Activating the undo control within that window SHALL restore the to-do items to their state before the clear. The undo control SHALL disappear when the five-second window expires or when the user navigates to a different week.

#### Scenario: Clear todos with confirmation
- **WHEN** the user activates the clear control in the to-do panel
- **THEN** a confirmation dialog appears asking the user to confirm the action

#### Scenario: Todo confirmation cancelled
- **WHEN** the user dismisses the confirmation dialog
- **THEN** the to-do list remains unchanged

#### Scenario: Todo confirmation accepted
- **WHEN** the user confirms the clear action
- **THEN** all to-do items for the current week are removed and the panel shows empty

#### Scenario: Undo todo restoration
- **WHEN** the user activates the undo control within five seconds of clearing
- **THEN** all to-do items are restored to their state before the clear

#### Scenario: Todo undo expires
- **WHEN** five seconds elapse after clearing without the user activating undo
- **THEN** the undo control disappears and the clear is permanent for this session
