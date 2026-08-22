## MODIFIED Requirements

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule. The popup SHALL provide optional lunch time fields: a start time input and a duration selector (15 or 20 minutes). When the user sets a lunch start time and closes the popup, the lunch start time and duration SHALL be stored for that slot in the current week's data. When the lunch start time field is empty, any previously stored lunch annotation SHALL be removed. The popup SHALL close when the user clicks outside it or activates a close control.

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
