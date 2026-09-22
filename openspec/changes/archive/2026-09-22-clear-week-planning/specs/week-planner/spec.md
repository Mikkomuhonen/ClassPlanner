## MODIFIED Requirements

### Requirement: Week grid display
The system SHALL render a grid with five columns (Monday–Friday) and exactly seven lesson slot rows. There are no full-width break rows. Each lesson cell SHALL show a break indicator at its bottom when the day's configuration has a break after that lesson slot. Each day column header SHALL display the day name and the name of the rhythm currently assigned to that day. In edit mode each day column header SHALL provide a dropdown to change the day's rhythm assignment.

In edit mode, the system SHALL provide a "Tyhjennä kaikki solut" (Clear all cells) control that clears every lesson slot's stored data — text, participants, subjects, time override, lunch override or suppression, and supervision flag — for the currently displayed week only. The control SHALL NOT modify the week's notes or todos. Activating the control SHALL require the user to confirm before any data is cleared. If the currently displayed week has no lesson slot data to clear, activating the control SHALL show feedback that there is nothing to clear instead of silently doing nothing.

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

#### Scenario: Clear all cells for the current week
- **WHEN** the teacher activates "Tyhjennä kaikki solut" in edit mode while the currently displayed week has at least one lesson slot with stored data, and confirms the action
- **THEN** every lesson slot for the currently displayed week is cleared of text, participants, subjects, time override, lunch override/suppression, and supervision flag, the grid updates to show no content in any cell, and the week's notes and todos remain unchanged

#### Scenario: Clear all cells with nothing to clear
- **WHEN** the teacher activates "Tyhjennä kaikki solut" while the currently displayed week has no lesson slot data
- **THEN** the system shows feedback that there is nothing to clear and does not prompt for confirmation

#### Scenario: Clear all cells does not affect other weeks
- **WHEN** the teacher clears all cells for the currently displayed week
- **THEN** lesson slot data for any other week remains unchanged
