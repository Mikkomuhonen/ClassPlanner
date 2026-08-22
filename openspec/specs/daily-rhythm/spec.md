# daily-rhythm Specification

## Purpose

Manages named daily rhythm profiles that each define a lesson start time, enabling individual weekdays to use different time schedules while sharing the same break structure.

## Requirements

### Requirement: Rhythm management
The system SHALL allow the teacher to create, rename, and delete named daily rhythm profiles in edit mode. Each rhythm SHALL have a name (e.g., "A", "B") and a configurable start time. At least one rhythm SHALL always exist. The system SHALL initialise with four default rhythms (A 08:00, B 08:30, C 09:00, D 09:30) on first use.

#### Scenario: Create a new rhythm
- **WHEN** the user activates the add rhythm control in edit mode
- **THEN** a new rhythm entry is created with an editable name and a start-time field

#### Scenario: Change a rhythm's start time
- **WHEN** the user changes the start time of a rhythm in edit mode
- **THEN** the time input accepts a valid HH:MM value and the rhythm is updated immediately

#### Scenario: Delete a rhythm
- **WHEN** the user activates the delete control on a rhythm that is not the only rhythm
- **THEN** the rhythm is removed; any day that was using it falls back to the first available rhythm

### Requirement: Per-day rhythm assignment
The system SHALL allow the teacher to assign a rhythm to each of the five weekdays. The assigned rhythm determines the start time used when computing and displaying lesson slot times for that day. In normal view mode the assigned rhythm name SHALL be visible in each day's column header. In edit mode each column header SHALL display a dropdown to change the day's assigned rhythm.

#### Scenario: Assign rhythm to a day in edit mode
- **WHEN** the user selects a rhythm from the dropdown in a day's column header while in edit mode
- **THEN** that day's rhythm assignment is updated and the column header reflects the new rhythm name

#### Scenario: Rhythm name shown in normal view
- **WHEN** the application is in normal view mode
- **THEN** each day column header shows the day name and the name of its currently assigned rhythm (e.g., "Maanantai (A)")

### Requirement: Rhythm persistence
The system SHALL save the rhythms array and the per-day rhythm assignments to `config.json` when the user exits edit mode. The system SHALL restore rhythms and assignments from `config.json` on page load when a folder is selected and the file exists.

#### Scenario: Rhythms saved on exit from edit mode
- **WHEN** the user deactivates the edit mode toggle
- **THEN** `config.json` is updated to include the current rhythms and dayRhythms values

#### Scenario: Rhythms restored on load
- **WHEN** the application loads and reads a valid `config.json`
- **THEN** the rhythms array and per-day assignments are restored from the file
