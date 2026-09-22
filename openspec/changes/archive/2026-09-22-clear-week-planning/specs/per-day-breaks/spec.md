## MODIFIED Requirements

### Requirement: Break editor panel in edit mode
The system SHALL display a "Välitauot" editor section in edit mode. The section SHALL show each weekday as a separate row. Each row SHALL display the day's current breaks as a visual timeline of lesson slots and break entries. The teacher SHALL be able to add a regular break after any lesson slot and add a lunch break after any lesson slot. The teacher SHALL be able to set a break's duration (15–30 minutes), and remove any break. Changes SHALL cause the day's computed lesson times to update immediately.

The section SHALL also provide a "Tyhjennä viikon välitauot ja ruokailut" (Clear breaks & lunches) control that clears the break entries and default lunch configuration for all five weekdays at once. Because break entries and default lunch configuration are structural settings shared by every week rather than per-week data, activating this control SHALL affect all weeks, and the confirmation prompt SHALL state this explicitly before any data is cleared. If no weekday has any break entries or a default lunch configured, activating the control SHALL show feedback that there is nothing to clear instead of silently doing nothing.

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

#### Scenario: Clear all breaks and default lunches
- **WHEN** the teacher activates "Tyhjennä viikon välitauot ja ruokailut" while at least one weekday has a break entry or a default lunch configured, and confirms the action after being told it affects all weeks
- **THEN** all break entries and default lunch configurations are removed for all five weekdays, the editor re-renders showing no breaks or default lunches for any day, and the week grid updates to reflect no breaks or default lunch indicators

#### Scenario: Clear all breaks and default lunches with nothing to clear
- **WHEN** the teacher activates "Tyhjennä viikon välitauot ja ruokailut" while no weekday has any break entries or a default lunch configured
- **THEN** the system shows feedback that there is nothing to clear and does not prompt for confirmation

#### Scenario: Clearing breaks and lunches affects every week
- **WHEN** the teacher clears all breaks and default lunches
- **THEN** every week's grid — not only the currently displayed week — stops showing the removed break and default lunch indicators, since break and default lunch configuration is shared across all weeks
