## MODIFIED Requirements

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule. The popup SHALL provide optional lunch time fields: a start time input and a duration selector (15 or 20 minutes). The popup SHALL allow the user to select participants and enter free-form text. A control SHALL allow the user to clear a time override and revert to the computed time.

The popup SHALL also include a subject selection section positioned between the time row and the participants section. The subject selection section SHALL display all registry subjects as selectable buttons. The user MAY select zero, one, or more subjects. A free-text input SHALL allow the user to type a code to create a new subject on the fly (see subject-registry spec).

The popup footer SHALL provide two explicit controls: a primary "Tallenna" (Save) action and a "Peruuta" (Cancel) action. Activating "Tallenna" SHALL commit all current popup field values — text, participants, subjects, time override (if the time fields differ from the computed time), lunch start/duration (if set), and supervision flag — to the current week's data for that lesson slot, close the popup, and show a brief visible confirmation that the save succeeded. Activating "Peruuta" SHALL discard any in-popup edits made since the popup was opened and close the popup without modifying the current week's data for that slot. The popup's close control (✕) and clicking outside the popup (on the backdrop) SHALL behave identically to activating "Peruuta": both discard in-popup edits and close the popup without saving.

#### Scenario: Popup opens with computed time
- **WHEN** the user clicks a lesson slot cell that has no time override
- **THEN** the popup shows the time computed from the day's rhythm and break configuration in editable time fields

#### Scenario: Popup opens with override time
- **WHEN** the user clicks a lesson slot cell that has a time override stored for the current week
- **THEN** the popup shows the overridden time in the time fields, visually distinguished from the computed time

#### Scenario: Save time override
- **WHEN** the user changes the time fields and activates "Tallenna"
- **THEN** the lesson cell displays the overridden time, and the override is saved to the current week's data

#### Scenario: Clear time override
- **WHEN** the user activates the "revert to default" control in the popup and then activates "Tallenna"
- **THEN** the time override is removed and the cell reverts to displaying the computed time

#### Scenario: Set lunch time
- **WHEN** the user sets a lunch start time in the popup and activates "Tallenna"
- **THEN** the lesson cell shows a lunch indicator with the specified start time and duration

#### Scenario: Clear lunch time
- **WHEN** the user clears the lunch start time field in the popup and activates "Tallenna"
- **THEN** no lunch indicator appears in the lesson cell for that slot

#### Scenario: Save popup content
- **WHEN** the user activates "Tallenna" after making changes
- **THEN** the lesson slot cell displays all selected participant names and the full text content without truncation, and the cell height adjusts to accommodate the content, and a brief confirmation is shown

#### Scenario: Select subjects in popup
- **WHEN** the user selects one or more subjects and activates "Tallenna"
- **THEN** the selected subject codes are stored for that lesson slot and the cell displays subject badges

#### Scenario: Deselect all subjects
- **WHEN** the user deselects all subjects and activates "Tallenna"
- **THEN** no subject badges appear in the lesson cell

#### Scenario: Cancel discards edits
- **WHEN** the user changes any popup field (text, participants, subjects, time, lunch, or supervision) and then activates "Peruuta"
- **THEN** the popup closes and the lesson slot's stored data is unchanged from before the popup was opened

#### Scenario: Closing via the ✕ control discards edits
- **WHEN** the user changes any popup field and then activates the ✕ close control
- **THEN** the popup closes and the lesson slot's stored data is unchanged from before the popup was opened, identical to activating "Peruuta"

#### Scenario: Clicking the backdrop discards edits
- **WHEN** the user changes any popup field and then clicks outside the popup on the backdrop
- **THEN** the popup closes and the lesson slot's stored data is unchanged from before the popup was opened, identical to activating "Peruuta"

#### Scenario: Save confirmation feedback
- **WHEN** the user activates "Tallenna" and the save completes
- **THEN** a brief visible confirmation (e.g. a checkmark or "Tallennettu" message) appears, distinct from the closed popup state
