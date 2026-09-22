## MODIFIED Requirements

### Requirement: Lesson cell subject display
When a lesson slot has one or more subjects stored, the system SHALL render each subject as a color-coded badge on the same visual row as the time indicator. Subject badges SHALL use a larger font size than the participants line. When a slot has no subjects, no badge SHALL appear.

When a lesson slot has one or more subjects stored, the system SHALL also tint the cell's background with a light shade of the first stored subject's registry color and render a colored accent line along the cell's left edge in that subject's color, in addition to the badge. When a slot has no subjects, the cell SHALL use its normal (non-tinted) background.

#### Scenario: Cell shows subject badges
- **WHEN** a lesson slot has one or more subjects stored
- **THEN** each subject's code appears as a badge with the background color defined in the subject registry, positioned on the same row as the time

#### Scenario: Cell shows no badge without subjects
- **WHEN** a lesson slot has no subjects stored
- **THEN** no subject badge appears in the cell

#### Scenario: Badge color follows registry
- **WHEN** a subject's color is changed in the registry
- **THEN** the badge in all cells referencing that subject reflects the updated color on next render

#### Scenario: Cell background tinted by subject color
- **WHEN** a lesson slot has one or more subjects stored
- **THEN** the cell's background is tinted with a light shade of the first subject's color and the cell's left edge shows an accent line in that same color

#### Scenario: Cell background untinted without subjects
- **WHEN** a lesson slot has no subjects stored
- **THEN** the cell's background is not tinted by any subject color

### Requirement: Print support
The system SHALL support printing the current week's grid via the browser print dialog. The printed output SHALL include the week header and all lesson slot rows with participants and text content. Controls, toolbar buttons, and edit-mode elements SHALL be hidden in the printed output.

When the current week has any notes or any to-do items, the printed output SHALL also include a second page containing the notes and to-do list. Notes SHALL be printed with their background colors preserved. All to-do items SHALL be printed with their checkbox state (checked or unchecked) and text. Action buttons (delete, add, color pickers) SHALL be hidden in the printed output. When there are no notes and no to-do items, the second page SHALL NOT appear.

The system SHALL ensure that note card text content is visible in the printed output regardless of browser handling of textarea elements.

The system SHALL provide a toolbar toggle control that determines whether lesson cells with subjects print with their full subject-color background tint (matching the on-screen appearance) or with only the subject badge colored, leaving the cell background at its normal printed highlight color. The toggle SHALL default to printing with only the badge colored. The toggle's chosen state SHALL persist across page reloads in the browser.

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

#### Scenario: Print with badge-only coloring (default)
- **WHEN** the print color toggle is off and the user prints the current week
- **THEN** lesson cells with subjects show only the colored subject badge in the printed output; the cell background uses the normal printed highlight color, not the subject color

#### Scenario: Print with full cell coloring
- **WHEN** the print color toggle is on and the user prints the current week
- **THEN** lesson cells with subjects show the subject-color background tint and accent line in the printed output, matching their on-screen appearance

#### Scenario: Print color preference persists
- **WHEN** the user sets the print color toggle and reloads the application
- **THEN** the toggle reflects the previously chosen state
