## Purpose

Provides a weekly lesson plan grid (Monday–Friday, 08:00–15:00) where a teacher can view, fill in, navigate, save, and print lesson plans, with configurable break slots between lessons.

## ADDED Requirements

### Requirement: Week grid display
The system SHALL render a grid with five columns (Monday–Friday) and rows for each lesson slot defined by the active break schedule. Break rows SHALL be visually distinct from lesson rows and SHALL display their duration.

#### Scenario: Grid renders lesson and break rows
- **WHEN** the application loads
- **THEN** each lesson slot appears as an editable cell row spanning all five day columns, and each break appears as a full-width non-editable separator row labeled with its duration

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL allow the user to select participants and enter free-form text. The popup SHALL close when the user clicks outside it or activates a close control.

#### Scenario: Open popup on cell click
- **WHEN** the user clicks a lesson slot cell
- **THEN** a modal popup opens showing the time range, participant selection panel, and a free-text input area pre-filled with any previously saved content for that slot

#### Scenario: Save popup content
- **WHEN** the user closes the popup after making changes
- **THEN** the lesson slot cell reflects the updated participant list and the first line of the text content as a preview

### Requirement: Configurable break schedule
The system SHALL allow the teacher to add, remove, and adjust the duration of break slots in edit mode. Each break SHALL have a configurable duration between 15 and 30 minutes. The lesson slot times SHALL recalculate automatically when the break schedule changes.

#### Scenario: Edit mode reveals break controls
- **WHEN** the user activates edit mode via the toggle
- **THEN** each break row displays duration controls (increment/decrement) and a delete control, and an "Add break" control appears after each lesson row

#### Scenario: Break duration changes recalculate times
- **WHEN** the user changes a break's duration in edit mode
- **THEN** all lesson slot start and end times from that point onward update to reflect the new schedule

### Requirement: Edit mode toggle
The system SHALL provide a single toggle control that switches the page between normal view mode and edit mode. In normal mode, lesson cells are clickable for editing. In edit mode, break controls and participant registry management are visible; lesson cells are not editable.

#### Scenario: Toggle switches modes
- **WHEN** the user activates the edit mode toggle
- **THEN** the page transitions to edit mode, showing structure controls and hiding the lesson editing interaction
- **WHEN** the user deactivates the toggle
- **THEN** the page returns to normal mode

### Requirement: Week navigation
The system SHALL display the current week number and date range in the header and provide previous/next controls to navigate between weeks. Each week's data SHALL be stored and retrieved independently.

#### Scenario: Navigate to adjacent week
- **WHEN** the user clicks the next or previous week control
- **THEN** the grid loads the data for that week, or displays an empty grid if no data has been saved for that week

### Requirement: File persistence via File System Access API
The system SHALL allow the user to select a local folder once per session using the browser's directory picker. The system SHALL save the current week's data as `viikko_YYYY_WNN.json` in that folder when the user activates the save control. The system SHALL allow loading a saved week's file from the same folder.

#### Scenario: Select folder and save week
- **WHEN** the user activates the folder selector and chooses a directory
- **THEN** the chosen folder is remembered for the session
- **WHEN** the user activates the save control
- **THEN** the current week data is written to `viikko_YYYY_WNN.json` in the chosen folder

#### Scenario: Load saved week
- **WHEN** the user activates the open control and the chosen folder contains a file for the displayed week
- **THEN** the grid populates with the saved lesson slot data for that week

### Requirement: Print support
The system SHALL support printing the current week's grid via the browser print dialog. The printed output SHALL include the week header, all lesson slot rows with participants and text content, and break rows. Controls, toolbar buttons, and edit-mode elements SHALL be hidden in the printed output.

#### Scenario: Print current week
- **WHEN** the user activates the print control
- **THEN** the browser print dialog opens and the print preview shows only the week grid in a compact layout suitable for A4 landscape paper
