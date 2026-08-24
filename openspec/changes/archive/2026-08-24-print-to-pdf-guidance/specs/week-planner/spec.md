## MODIFIED Requirements

### Requirement: Print support
The system SHALL support printing the current week's grid via the browser print dialog. The printed output SHALL include the week header and all lesson slot rows with participants and text content. Controls, toolbar buttons, and edit-mode elements SHALL be hidden in the printed output.

When the current week has any notes or any to-do items, the printed output SHALL also include a second page containing the notes and to-do list. Notes SHALL be printed with their background colors preserved. All to-do items SHALL be printed with their checkbox state (checked or unchecked) and text. Action buttons (delete, add, color pickers) SHALL be hidden in the printed output. When there are no notes and no to-do items, the second page SHALL NOT appear.

The system SHALL ensure that note card text content is visible in the printed output regardless of browser handling of textarea elements.

The print control in the toolbar SHALL be labelled to communicate both printing and PDF saving as available outcomes. When the user activates the print control, a brief instructional tooltip or inline message SHALL appear guiding the user to select "Tallenna PDF:nä" (Save as PDF) in the browser's print dialog destination selector if they wish to save a PDF file for email attachment.

#### Scenario: Print current week
- **WHEN** the user activates the print control
- **THEN** the browser print dialog opens and the print preview shows only the week grid in a compact layout suitable for A4 landscape paper

#### Scenario: PDF guidance shown on print
- **WHEN** the user activates the print control
- **THEN** a brief message or tooltip is visible before or alongside the print dialog instructing the user to choose "Tallenna PDF:nä" to save as a file

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
