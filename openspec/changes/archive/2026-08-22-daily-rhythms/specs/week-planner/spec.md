## MODIFIED Requirements

### Requirement: Week grid display
The system SHALL render a grid with five columns (Monday–Friday) and rows for each lesson slot defined by the active break schedule. Break rows SHALL be visually distinct from lesson rows and SHALL display their duration. Each day column header SHALL display the day name and the name of the rhythm currently assigned to that day. In edit mode each day column header SHALL provide a dropdown to change the day's rhythm assignment.

#### Scenario: Grid renders lesson and break rows
- **WHEN** the application loads
- **THEN** each lesson slot appears as an editable cell row spanning all five day columns, and each break appears as a full-width non-editable separator row labeled with its duration

#### Scenario: Column header shows assigned rhythm
- **WHEN** the grid is displayed in normal view mode
- **THEN** each day column header shows the day name followed by the assigned rhythm name in parentheses (e.g., "Maanantai (A)")

#### Scenario: Column header shows rhythm dropdown in edit mode
- **WHEN** the grid is displayed in edit mode
- **THEN** each day column header shows the day name and a dropdown control pre-selected to the day's current rhythm

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL allow the user to select participants and enter free-form text. The popup title SHALL show the day name and the lesson time range computed from the rhythm assigned to that day. The popup SHALL close when the user clicks outside it or activates a close control.

#### Scenario: Open popup on cell click
- **WHEN** the user clicks a lesson slot cell
- **THEN** a modal popup opens showing the time range computed from the day's assigned rhythm, the participant selection panel, and a free-text input area pre-filled with any previously saved content for that slot

#### Scenario: Save popup content
- **WHEN** the user closes the popup after making changes
- **THEN** the lesson slot cell displays all selected participant names and the full text content without truncation, and the cell height adjusts to accommodate the content

## ADDED Requirements

### Requirement: Inline cell content display
The system SHALL display the complete content of each lesson slot cell directly in the grid without truncation. All selected participant names SHALL appear as visible text in the cell. The entire text content SHALL be shown across as many lines as needed. Cell height SHALL expand automatically to fit its content. The grid SHALL remain readable when cells contain varying amounts of text.

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
