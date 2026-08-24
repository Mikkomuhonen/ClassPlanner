## MODIFIED Requirements

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule. The popup SHALL provide optional lunch time fields: a start time input and a duration selector (15 or 20 minutes). When the user sets a lunch start time and closes the popup, the lunch start time and duration SHALL be stored for that slot in the current week's data. When the lunch start time field is empty, any previously stored lunch annotation SHALL be removed. The popup SHALL allow the user to select participants and enter free-form text. When the user changes the time fields and closes the popup, the overridden times SHALL be stored for that lesson slot for the current week. A control SHALL allow the user to clear the override and revert to the computed time. The popup SHALL close when the user clicks outside it or activates a close control.

The popup SHALL also include a subject selection section positioned between the time row and the participants section. The subject selection section SHALL display all registry subjects as selectable buttons. The user MAY select zero, one, or more subjects. A free-text input SHALL allow the user to type a code to create a new subject on the fly (see subject-registry spec). When the user closes the popup, the selected subject codes SHALL be stored as `subjects` (array of strings) in the lesson slot data for the current week.

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

#### Scenario: Select subjects in popup
- **WHEN** the user selects one or more subjects and closes the popup
- **THEN** the selected subject codes are stored for that lesson slot and the cell displays subject badges

#### Scenario: Deselect all subjects
- **WHEN** the user deselects all subjects and closes the popup
- **THEN** no subject badges appear in the lesson cell

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
