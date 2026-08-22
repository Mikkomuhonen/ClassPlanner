## MODIFIED Requirements

### Requirement: Per-day break configuration
The system SHALL maintain a separate break configuration for each of the five weekdays. Each configuration SHALL be an ordered list of break entries, where each entry specifies which lesson slot the break follows, the break duration in minutes, and an optional type. All five configurations MAY differ from each other. A day with no entries in its configuration has no breaks between any lessons. The system SHALL initialise all five day configurations as empty; no breaks are pre-populated.

#### Scenario: Days with different break positions
- **WHEN** the teacher has configured Monday with a break after lesson 1 and Tuesday with a break after lesson 2
- **THEN** the time labels for Monday lesson 2 reflect the Monday break, and the time labels for Tuesday lesson 2 reflect no break (starting immediately after lesson 1)

#### Scenario: Default configuration is empty
- **WHEN** the application loads for the first time with no saved config
- **THEN** no break indicators appear in any lesson cell and all lessons start back-to-back

### Requirement: Break editor panel in edit mode
The system SHALL display a "Välitauot" editor section in edit mode. The section SHALL show each weekday as a separate row. Each row SHALL display the day's current breaks as a visual timeline of lesson slots and break entries. The teacher SHALL be able to add a regular break after any lesson slot and add a lunch break after any lesson slot. The teacher SHALL be able to set a break's duration (15–30 minutes), and remove any break. Changes SHALL cause the day's computed lesson times to update immediately.

#### Scenario: Add a break to a day
- **WHEN** the teacher activates the add-break control for a specific lesson slot on a specific day
- **THEN** a break entry is added for that day after that slot, with a default duration of 15 minutes, and the lesson times for that day update

#### Scenario: Add a lunch break to a day
- **WHEN** the teacher activates the add-lunch control for a specific lesson slot on a specific day that has no lunch break yet
- **THEN** a lunch break entry is added for that day after that slot, with a default duration of 20 minutes, and the lesson times for that day update

#### Scenario: Only one lunch break per day
- **WHEN** a day already has a lunch break
- **THEN** the add-lunch control is not available for any other lesson slot on that day

#### Scenario: Remove a break from a day
- **WHEN** the teacher activates the remove control on a break entry for a specific day
- **THEN** the break is removed and the lesson times for that day update

#### Scenario: Change break duration
- **WHEN** the teacher changes the duration of a break on a specific day
- **THEN** the lesson times for that day update immediately to reflect the new duration

### Requirement: Break indicator in lesson cell
The system SHALL render a visual break indicator at the bottom of a lesson cell when that day has a break after the lesson represented by that cell. Regular breaks SHALL show a neutral indicator displaying the duration. Lunch breaks SHALL show a distinct indicator displaying "🍽️ Ruokailu Xmin". No indicator SHALL appear for lesson cells where that day has no break after that lesson.

#### Scenario: Break indicator visible
- **WHEN** a lesson cell's day has a regular break configured after that lesson slot
- **THEN** the cell shows a break duration badge at its bottom

#### Scenario: Lunch break indicator visible
- **WHEN** a lesson cell's day has a lunch break configured after that lesson slot
- **THEN** the cell shows a lunch indicator "🍽️ Ruokailu Xmin" at its bottom, visually distinct from regular break indicators

#### Scenario: No indicator when no break
- **WHEN** a lesson cell's day has no break after that lesson slot
- **THEN** no break indicator appears in that cell
