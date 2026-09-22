## ADDED Requirements

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

## MODIFIED Requirements

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
