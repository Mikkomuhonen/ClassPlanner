## REMOVED Requirements

### Requirement: Configurable break schedule
**Reason**: Replaced by per-day break configuration. The shared break schedule forced all days to have breaks at the same positions. The new per-day model (see `per-day-breaks` capability) replaces it entirely.
**Migration**: Existing `config.json` files that contain a `schedule` array are automatically migrated to `dayBreaks` on first load.

## MODIFIED Requirements

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
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule (rhythm start time plus break offsets). The popup SHALL allow the user to select participants and enter free-form text. When the user changes the time fields and closes the popup, the overridden times SHALL be stored for that lesson slot for the current week. A control SHALL allow the user to clear the override and revert to the computed time. The popup SHALL close when the user clicks outside it or activates a close control.

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

#### Scenario: Save popup content
- **WHEN** the user closes the popup after making changes
- **THEN** the lesson slot cell displays all selected participant names and the full text content without truncation, and the cell height adjusts to accommodate the content
