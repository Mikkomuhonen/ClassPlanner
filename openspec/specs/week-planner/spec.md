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
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule. The popup SHALL provide optional lunch time fields: a start time input and a duration selector (15 or 20 minutes). The popup SHALL allow the user to select participants and enter free-form text. A control SHALL allow the user to clear a time override and revert to the computed time.

The popup SHALL also include a subject selection section positioned between the time row and the participants section. The subject selection section SHALL display all registry subjects as selectable buttons. The user MAY select zero, one, or more subjects. A free-text input SHALL allow the user to type a code to create a new subject on the fly (see subject-registry spec).

The popup's content area (all fields between the header and the footer) SHALL scroll independently when its content is taller than the available viewport height. The popup header and footer SHALL remain visible at all times, regardless of how much content the scrollable area contains.

The popup footer SHALL provide two explicit controls: a primary "Tallenna" (Save) action and a "Peruuta" (Cancel) action. Activating "Tallenna" SHALL commit all current popup field values — text, participants, subjects, time override (if the time fields differ from the computed time), lunch start/duration (if set), and supervision flag — to the current week's data for that lesson slot, close the popup, and show a brief visible confirmation that the save succeeded. Activating "Peruuta" SHALL discard any in-popup edits made since the popup was opened and close the popup without modifying the current week's data for that slot. The popup's close control (✕) and clicking outside the popup (on the backdrop) SHALL behave identically to activating "Peruuta": both discard in-popup edits and close the popup without saving.

The popup SHALL provide a "Tyhjennä sisältö" (Clear content) control, distinct from the existing "Tyhjennä solu" (Clear cell) control. Activating "Tyhjennä sisältö" SHALL clear the popup's in-progress text, participants, and subject selections, but SHALL leave the time fields, lunch fields, and supervision flag unchanged. Activating "Tyhjennä sisältö" SHALL NOT itself modify the current week's stored data or close the popup; the cleared state SHALL only be committed when the user subsequently activates "Tallenna", and SHALL be discarded like any other in-popup edit if the user activates "Peruuta", the ✕ control, or the backdrop instead.

#### Scenario: Popup opens with computed time
- **WHEN** the user clicks a lesson slot cell that has no time override
- **THEN** the popup shows the time computed from the day's rhythm and break configuration in editable time fields

#### Scenario: Popup opens with override time
- **WHEN** the user clicks a lesson slot cell that has a time override stored for the current week
- **THEN** the popup shows the overridden time in the time fields, visually distinguished from the computed time

#### Scenario: Save time override
- **WHEN** the user changes the time fields and activates "Tallenna"
- **THEN** the lesson cell displays the overridden time, and the override is saved to the current week's data

#### Scenario: Clear time override
- **WHEN** the user activates the "revert to default" control in the popup and then activates "Tallenna"
- **THEN** the time override is removed and the cell reverts to displaying the computed time

#### Scenario: Set lunch time
- **WHEN** the user sets a lunch start time in the popup and activates "Tallenna"
- **THEN** the lesson cell shows a lunch indicator with the specified start time and duration

#### Scenario: Clear lunch time
- **WHEN** the user clears the lunch start time field in the popup and activates "Tallenna"
- **THEN** no lunch indicator appears in the lesson cell for that slot

#### Scenario: Save popup content
- **WHEN** the user activates "Tallenna" after making changes
- **THEN** the lesson slot cell displays all selected participant names and the full text content without truncation, and the cell height adjusts to accommodate the content, and a brief confirmation is shown

#### Scenario: Select subjects in popup
- **WHEN** the user selects one or more subjects and activates "Tallenna"
- **THEN** the selected subject codes are stored for that lesson slot and the cell displays subject badges

#### Scenario: Deselect all subjects
- **WHEN** the user deselects all subjects and activates "Tallenna"
- **THEN** no subject badges appear in the lesson cell

#### Scenario: Cancel discards edits
- **WHEN** the user changes any popup field (text, participants, subjects, time, lunch, or supervision) and then activates "Peruuta"
- **THEN** the popup closes and the lesson slot's stored data is unchanged from before the popup was opened

#### Scenario: Closing via the ✕ control discards edits
- **WHEN** the user changes any popup field and then activates the ✕ close control
- **THEN** the popup closes and the lesson slot's stored data is unchanged from before the popup was opened, identical to activating "Peruuta"

#### Scenario: Clicking the backdrop discards edits
- **WHEN** the user changes any popup field and then clicks outside the popup on the backdrop
- **THEN** the popup closes and the lesson slot's stored data is unchanged from before the popup was opened, identical to activating "Peruuta"

#### Scenario: Save confirmation feedback
- **WHEN** the user activates "Tallenna" and the save completes
- **THEN** a brief visible confirmation (e.g. a checkmark or "Tallennettu" message) appears, distinct from the closed popup state

#### Scenario: Popup content scrolls when it exceeds the viewport
- **WHEN** the popup's content (time fields, subjects, participants, text, copy row, lunch row, supervision row) is taller than the available viewport height
- **THEN** the content area between the header and footer becomes scrollable, and the header and footer remain visible and reachable at all times

#### Scenario: Clear content without affecting other settings
- **WHEN** the user has set a time override, lunch time, and supervision flag on a slot, opens the popup, and activates "Tyhjennä sisältö" followed by "Tallenna"
- **THEN** the text, participants, and subjects are cleared from the slot, but the time override, lunch time, and supervision flag remain saved as before

#### Scenario: Clear content is discarded by Cancel
- **WHEN** the user activates "Tyhjennä sisältö" and then activates "Peruuta" instead of "Tallenna"
- **THEN** the popup closes and the lesson slot's stored data (text, participants, subjects, and all other fields) is unchanged from before the popup was opened

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
The system SHALL require the user to be signed in with a Google account (see cloud-auth capability) before saving or loading weekly data. The system SHALL save the current week's data to that signed-in user's cloud storage (see cloud-sync capability) when the user activates the save control. The system SHALL allow loading a previously saved week's data from the same signed-in user's cloud storage.

The stored week data SHALL include the week's notes and to-do items alongside lesson slot data. When the user saves, notes and todos for the current week are written to cloud storage. When the user loads a week, notes and todos are read from cloud storage and displayed.

#### Scenario: Select folder and save week
- **WHEN** a signed-in user activates the save control
- **THEN** the current week's data, notes, and todos are written to that user's cloud storage; no local folder selector is presented or required

#### Scenario: Load saved week
- **WHEN** the user activates the load control and the signed-in user's cloud storage contains data for the displayed week
- **THEN** the grid populates with the saved lesson slot data, and the notes and todos for that week are displayed

#### Scenario: Load week with no notes in file
- **WHEN** a saved week's cloud data contains no notes or todos
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
When the application loads and the user has an active authenticated session (see cloud-auth capability), the system SHALL automatically restore that session and load the current week's config and data from cloud storage, without requiring the user to take any additional action such as picking a folder or restoring a handle. The system SHALL NOT display a folder restore button or perform any local folder/handle restoration; there is no concept of a "stored folder handle" in the cloud-based model.

#### Scenario: Restore button appears when handle is stored
- **WHEN** the application loads
- **THEN** no folder restore button is ever shown, because folder handles are no longer used; a signed-in user's data loads automatically instead

#### Scenario: Clicking restore button restores the folder
- **WHEN** the application has an active authenticated session on load
- **THEN** the system restores that session automatically and loads the current week's config and data, with no restore button to click

#### Scenario: Restore button hidden when permission denied
- **WHEN** the application loads without a valid authenticated session
- **THEN** no restore button or folder-permission prompt is shown; the sign-in prompt is displayed instead

#### Scenario: No restore button when no stored handle
- **WHEN** the application loads
- **THEN** the system never displays a folder restore button, regardless of session state

#### Scenario: No automatic permission request on load
- **WHEN** the application loads
- **THEN** the system does not call any local filesystem permission API; it relies solely on the authentication session to restore data

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
