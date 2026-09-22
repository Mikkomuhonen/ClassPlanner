## MODIFIED Requirements

### Requirement: Lesson slot popup editor
The system SHALL open a modal popup when the user clicks any lesson slot cell. The popup SHALL display editable start and end time fields pre-filled from the day's computed schedule. The popup SHALL provide optional lunch time fields: a start time input and a duration selector (15 or 20 minutes). The popup SHALL allow the user to select participants and enter free-form text. A control SHALL allow the user to clear a time override and revert to the computed time.

The popup SHALL also include a subject selection section positioned between the time row and the participants section. The subject selection section SHALL display all registry subjects as selectable buttons. The user MAY select zero, one, or more subjects. A free-text input SHALL allow the user to type a code to create a new subject on the fly (see subject-registry spec).

The popup SHALL provide a break-supervision toggle. When activated, the popup SHALL reveal an optional start time input and a duration selector for the supervision, pre-filled with the lesson's end time and the slot's break duration (if a break is configured after that slot) as defaults. The teacher MAY change these fields to record a supervision time that differs from the break's own time. When the supervision toggle is deactivated, the supervision start/duration fields SHALL be hidden and cleared.

The popup SHALL provide a manual indicator-order toggle ("🔀 Ruokailu ennen välkkää") that, when activated, forces the lunch indicator to display before the break/supervision indicator in the lesson cell for that slot, overriding the automatic chronological ordering described in the "Break, lunch, and supervision indicator order" requirement.

The popup's content area (all fields between the header and the footer) SHALL scroll independently when its content is taller than the available viewport height. The popup header and footer SHALL remain visible at all times, regardless of how much content the scrollable area contains.

The popup footer SHALL provide two explicit controls: a primary "Tallenna" (Save) action and a "Peruuta" (Cancel) action. Activating "Tallenna" SHALL commit all current popup field values — text, participants, subjects, time override (if the time fields differ from the computed time), lunch start/duration (if set), supervision flag, supervision start/duration (if set), and the manual indicator-order flag (if set) — to the current week's data for that lesson slot, close the popup, and show a brief visible confirmation that the save succeeded. Activating "Peruuta" SHALL discard any in-popup edits made since the popup was opened and close the popup without modifying the current week's data for that slot. The popup's close control (✕) and clicking outside the popup (on the backdrop) SHALL behave identically to activating "Peruuta": both discard in-popup edits and close the popup without saving.

The popup SHALL provide a "Tyhjennä sisältö" (Clear content) control, distinct from the existing "Tyhjennä solu" (Clear cell) control. Activating "Tyhjennä sisältö" SHALL clear the popup's in-progress text, participants, and subject selections, but SHALL leave the time fields, lunch fields, supervision flag/time fields, and the manual indicator-order flag unchanged. Activating "Tyhjennä sisältö" SHALL NOT itself modify the current week's stored data or close the popup; the cleared state SHALL only be committed when the user subsequently activates "Tallenna", and SHALL be discarded like any other in-popup edit if the user activates "Peruuta", the ✕ control, or the backdrop instead.

When a weekday has a default lunch configured (see per-day-breaks capability) attached to a given lesson slot, and the current week's data for that slot has no explicit lunch override, the popup's lunch fields SHALL be pre-filled with the day's default start time and duration, and SHALL be visually labeled as the default (e.g. "(oletus)"). Saving the popup with the lunch fields changed from the default SHALL store an explicit per-week lunch override for that slot, taking precedence over the day's default in all future views of that week. Saving the popup with the lunch start field cleared, when a default lunch is attached to that slot, SHALL store an explicit per-week marker suppressing the default for that slot in the current week only; the day's default SHALL continue to apply to all other weeks. Activating "Tyhjennä solu" SHALL remove any such per-week lunch override or suppression marker, as well as any supervision time fields and the manual indicator-order flag, after which the slot reverts to showing the day's default lunch (if any) again with no supervision and default indicator ordering.

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
- **WHEN** the user changes any popup field (text, participants, subjects, time, lunch, supervision, or indicator order) and then activates "Peruuta"
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

#### Scenario: Popup content scrolls when it exceeds the viewport
- **WHEN** the popup's content (time fields, subjects, participants, text, copy row, lunch row, supervision row) is taller than the available viewport height
- **THEN** the content area between the header and footer becomes scrollable, and the header and footer remain visible and reachable at all times

#### Scenario: Clear content without affecting other settings
- **WHEN** the user has set a time override, lunch time, and supervision flag on a slot, opens the popup, and activates "Tyhjennä sisältö" followed by "Tallenna"
- **THEN** the text, participants, and subjects are cleared from the slot, but the time override, lunch time, and supervision flag remain saved as before

#### Scenario: Clear content is discarded by Cancel
- **WHEN** the user activates "Tyhjennä sisältö" and then activates "Peruuta" instead of "Tallenna"
- **THEN** the popup closes and the lesson slot's stored data (text, participants, subjects, and all other fields) is unchanged from before the popup was opened

#### Scenario: Popup pre-fills the day's default lunch
- **WHEN** the user opens the popup for a lesson slot that has a default lunch attached to it and no per-week lunch override
- **THEN** the popup's lunch start and duration fields show the day's default values, labeled as the default

#### Scenario: Per-week lunch override takes precedence
- **WHEN** the user changes the lunch fields for a slot that has a default lunch attached and activates "Tallenna"
- **THEN** the lesson cell shows the newly entered lunch time for the current week, and other weeks continue to show the day's unchanged default lunch for that slot

#### Scenario: Suppress the default lunch for one week
- **WHEN** the user clears the lunch start field for a slot that has a default lunch attached and activates "Tallenna"
- **THEN** no lunch indicator appears in that slot for the current week, while other weeks continue to show the day's default lunch for that slot

#### Scenario: Clearing the cell restores the default lunch
- **WHEN** the user activates "Tyhjennä solu" on a slot that has a per-week lunch override or suppression, then reopens the popup for that slot
- **THEN** the popup shows the day's default lunch again (if one is attached to that slot), as if no per-week change had ever been made

#### Scenario: Activate supervision without a custom time
- **WHEN** the user activates the break-supervision toggle and activates "Tallenna" without changing the pre-filled supervision start/duration fields
- **THEN** the lesson cell shows a supervision indicator using the lesson's end time and the slot's break duration

#### Scenario: Activate supervision with a custom time
- **WHEN** the user activates the break-supervision toggle, changes the supervision start time and/or duration fields, and activates "Tallenna"
- **THEN** the lesson cell shows a supervision indicator using the custom start time and duration instead of the break's own time

#### Scenario: Deactivate supervision
- **WHEN** the user deactivates the break-supervision toggle for a slot that previously had supervision set and activates "Tallenna"
- **THEN** no supervision indicator appears in the lesson cell for that slot, and the supervision time fields are cleared

#### Scenario: Manually force lunch before break
- **WHEN** the user activates the "🔀 Ruokailu ennen välkkää" toggle for a slot and activates "Tallenna"
- **THEN** the lesson cell shows the lunch indicator before the break/supervision indicator regardless of their actual chronological order

## ADDED Requirements

### Requirement: Break, lunch, and supervision indicator order
When a lesson cell shows both a break-related indicator (regular break and/or break-supervision) and a lunch indicator, the system SHALL order them within the cell. By default the order SHALL be chronological: if the lunch's effective start time is earlier than the lesson slot's end time (i.e., the lunch begins before the break), the lunch indicator SHALL be displayed before the break/supervision indicator; otherwise the break/supervision indicator SHALL be displayed first. A per-slot manual override, set via the popup's indicator-order toggle, SHALL take precedence over the automatic chronological order whenever it is active for that slot.

The break-supervision indicator, when shown, SHALL display its effective start time and duration in the format "🏃 Välkkävalvonta HH:MM (Xmin)", using the slot's explicit supervision start/duration if set, or the break's own start time (the lesson's end time) and duration otherwise.

#### Scenario: Automatic order shows lunch first when it starts earlier
- **WHEN** a lesson cell has both a break and an effective lunch, no manual order override is set for that slot, and the lunch's start time is earlier than the lesson's end time
- **THEN** the lunch indicator appears above the break/supervision indicator in the cell

#### Scenario: Automatic order shows break first by default
- **WHEN** a lesson cell has both a break and an effective lunch, no manual order override is set for that slot, and the lunch's start time is not earlier than the lesson's end time
- **THEN** the break/supervision indicator appears above the lunch indicator in the cell

#### Scenario: Manual override forces lunch first
- **WHEN** a lesson cell has both a break and an effective lunch, and the slot has the manual indicator-order override active
- **THEN** the lunch indicator appears above the break/supervision indicator in the cell, regardless of chronological order

#### Scenario: Supervision indicator shows its effective time
- **WHEN** a lesson cell has break supervision active for its slot
- **THEN** the cell shows a supervision indicator reading "🏃 Välkkävalvonta HH:MM (Xmin)" using the slot's custom supervision time if set, or the break's own time otherwise
