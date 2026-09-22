# per-day-breaks Specification

## Purpose

Allows the teacher to configure break positions and durations independently for each weekday, so that the break schedule on Monday does not have to match Tuesday's, and so on. Each day's break configuration is persisted in the application configuration and applies to all weeks.

## Requirements

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

### Requirement: Break configuration persistence
The system SHALL save the per-day break configurations to `config.json` when the teacher exits edit mode. The configurations SHALL be restored from `config.json` on page load. When loading a `config.json` that contains a legacy `schedule` array and no `dayBreaks` field, the system SHALL derive `dayBreaks` from the `schedule` array by copying the same break structure to all five days.

#### Scenario: Config saved with dayBreaks
- **WHEN** the teacher exits edit mode
- **THEN** `config.json` contains a `dayBreaks` field with all five day configurations

#### Scenario: Migration from legacy config
- **WHEN** the application loads a `config.json` that has a `schedule` array but no `dayBreaks` field
- **THEN** the break structure is extracted from `schedule` and applied equally to all five days

### Requirement: Day settings copy
The system SHALL provide a control in the Välitauot editor panel (edit mode) that allows the teacher to copy one day's structural configuration to another day. Copying SHALL transfer the source day's break entries (`dayBreaks`), rhythm assignment (`dayRhythms`), and default lunch configuration to the target day, replacing the target's existing settings. The source and target days SHALL each be selected from a dropdown listing the five weekdays. The teacher SHALL not be able to copy a day to itself.

#### Scenario: Copy day settings to another day
- **WHEN** the teacher selects a source day, a different target day, and activates the copy control
- **THEN** the target day's break entries, rhythm assignment, and default lunch configuration are replaced with those of the source day, the breaks editor re-renders to reflect the change, and the week grid updates immediately

#### Scenario: Prevent copy to same day
- **WHEN** the teacher selects the same day as both source and target
- **THEN** the copy control is disabled or produces no effect

#### Scenario: Copying a day with no default lunch clears the target's default lunch
- **WHEN** the teacher copies a source day that has no default lunch configured onto a target day that does have one
- **THEN** the target day's default lunch is removed, matching the source day's absence of a default lunch

#### Scenario: Undo restores the target day's previous default lunch
- **WHEN** the teacher copies day settings (including default lunch) to one or more target days and then activates the undo control before it expires
- **THEN** each affected target day's default lunch (as well as its breaks and rhythm) reverts to what it was before the copy

### Requirement: Per-day default lunch configuration
The system SHALL allow the teacher to configure, in the "Välitauot" editor section (edit mode), a default lunch for each weekday, independent of the day's break entries. A day's default lunch, when configured, SHALL specify which lesson slot it is attached to, a start time, and a duration (15 or 20 minutes). Each weekday MAY have at most one default lunch, or none. The default lunch SHALL apply automatically to every week's grid and lesson slot popup for the slot it is attached to, unless a per-week override or suppression exists for that slot (see week-planner capability).

The editor SHALL provide a control to add a default lunch to a day with none configured, pre-filled with a reasonable default slot, start time, and duration. Once configured, the editor SHALL allow changing the attached lesson slot, the start time, and the duration inline, and SHALL provide a control to remove the day's default lunch entirely.

#### Scenario: Add a default lunch to a day
- **WHEN** the teacher activates the add-default-lunch control for a day that has none configured
- **THEN** a default lunch is created for that day with a pre-filled slot, start time, and duration, and the editor shows it as editable

#### Scenario: Edit a day's default lunch
- **WHEN** the teacher changes the attached lesson slot, start time, or duration of a day's configured default lunch
- **THEN** the change is stored immediately and the week grid updates to reflect the new default lunch position, time, or duration for weeks that have no per-week override for that slot

#### Scenario: Remove a day's default lunch
- **WHEN** the teacher activates the remove control on a day's configured default lunch
- **THEN** the default lunch is removed from that day, and the week grid no longer shows a lunch indicator for that day's slot unless a per-week override exists

#### Scenario: At most one default lunch per day
- **WHEN** a day already has a default lunch configured
- **THEN** the editor does not offer to add a second default lunch for that day; the teacher edits or removes the existing one instead

### Requirement: Default lunch configuration persistence
The system SHALL save each day's default lunch configuration together with the rest of the schedule structure (rhythms, breaks) when the teacher exits edit mode, and SHALL restore it on load, alongside the existing per-day break and rhythm configuration.

#### Scenario: Default lunch persisted on exiting edit mode
- **WHEN** the teacher configures a default lunch for a day and exits edit mode
- **THEN** the configuration is saved such that reloading the application restores the same default lunch for that day

#### Scenario: No default lunch configured
- **WHEN** a day has never had a default lunch configured
- **THEN** the saved configuration for that day has no default lunch, and no lunch indicator appears for any of that day's slots unless a per-week override exists
