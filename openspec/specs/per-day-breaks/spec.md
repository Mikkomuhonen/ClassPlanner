# per-day-breaks Specification

## Purpose

Allows the teacher to configure break positions and durations independently for each weekday, so that the break schedule on Monday does not have to match Tuesday's, and so on. Each day's break configuration is persisted in the application configuration and applies to all weeks.

## Requirements

### Requirement: Per-day break configuration
The system SHALL maintain a separate break configuration for each of the five weekdays. Each configuration SHALL be an ordered list of break entries, where each entry specifies which lesson slot the break follows and the break duration in minutes. All five configurations MAY differ from each other. A day with no entries in its configuration has no breaks between any lessons.

#### Scenario: Days with different break positions
- **WHEN** the teacher has configured Monday with a break after lesson 1 and Tuesday with a break after lesson 2
- **THEN** the time labels for Monday lesson 2 reflect the Monday break, and the time labels for Tuesday lesson 2 reflect no break (starting immediately after lesson 1)

### Requirement: Break editor panel in edit mode
The system SHALL display a "Välitauot" editor section in edit mode. The section SHALL show each weekday as a separate row. Each row SHALL display the day's current breaks as a visual timeline of lesson slots and break entries. The teacher SHALL be able to add a break after any lesson slot, set its duration (15–30 minutes), and remove any break. Changes SHALL cause the day's computed lesson times to update immediately.

#### Scenario: Add a break to a day
- **WHEN** the teacher activates the add-break control for a specific lesson slot on a specific day
- **THEN** a break entry is added for that day after that slot, with a default duration of 15 minutes, and the lesson times for that day update

#### Scenario: Remove a break from a day
- **WHEN** the teacher activates the remove control on a break entry for a specific day
- **THEN** the break is removed and the lesson times for that day update

#### Scenario: Change break duration
- **WHEN** the teacher changes the duration of a break on a specific day
- **THEN** the lesson times for that day update immediately to reflect the new duration

### Requirement: Break indicator in lesson cell
The system SHALL render a visual break indicator at the bottom of a lesson cell when that day has a break after the lesson represented by that cell. The indicator SHALL display the break duration. No indicator SHALL appear for lesson cells where that day has no break after that lesson.

#### Scenario: Break indicator visible
- **WHEN** a lesson cell's day has a break configured after that lesson slot
- **THEN** the cell shows a break duration badge at its bottom

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
The system SHALL provide a control in the Välitauot editor panel (edit mode) that allows the teacher to copy one day's structural configuration to another day. Copying SHALL transfer the source day's break entries (`dayBreaks`) and rhythm assignment (`dayRhythms`) to the target day, replacing the target's existing settings. The source and target days SHALL each be selected from a dropdown listing the five weekdays. The teacher SHALL not be able to copy a day to itself.

#### Scenario: Copy day settings to another day
- **WHEN** the teacher selects a source day, a different target day, and activates the copy control
- **THEN** the target day's break entries and rhythm assignment are replaced with those of the source day, the breaks editor re-renders to reflect the change, and the week grid updates immediately

#### Scenario: Prevent copy to same day
- **WHEN** the teacher selects the same day as both source and target
- **THEN** the copy control is disabled or produces no effect
