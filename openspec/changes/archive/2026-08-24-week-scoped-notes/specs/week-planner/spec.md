## MODIFIED Requirements

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

### Requirement: Week navigation
The system SHALL display the current week number and date range in the header and provide previous/next controls to navigate between weeks. Each week's data SHALL be stored and retrieved independently.

When the user navigates to a different week, the notes and to-do list SHALL update to show that week's notes and todos. If no data has been loaded for the destination week, the notes panel and to-do list SHALL be displayed empty.

#### Scenario: Navigate to adjacent week
- **WHEN** the user clicks the next or previous week control
- **THEN** the grid loads the data for that week, or displays an empty grid if no data has been saved for that week

#### Scenario: Notes change when navigating weeks
- **WHEN** the user navigates to a different week
- **THEN** the notes panel and to-do list reflect that week's notes and todos, not the previous week's
