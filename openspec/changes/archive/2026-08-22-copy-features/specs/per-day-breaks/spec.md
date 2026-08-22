## ADDED Requirements

### Requirement: Day settings copy
The system SHALL provide a control in the Välitauot editor panel (edit mode) that allows the teacher to copy one day's structural configuration to another day. Copying SHALL transfer the source day's break entries (`dayBreaks`) and rhythm assignment (`dayRhythms`) to the target day, replacing the target's existing settings. The source and target days SHALL each be selected from a dropdown listing the five weekdays. The teacher SHALL not be able to copy a day to itself.

#### Scenario: Copy day settings to another day
- **WHEN** the teacher selects a source day, a different target day, and activates the copy control
- **THEN** the target day's break entries and rhythm assignment are replaced with those of the source day, the breaks editor re-renders to reflect the change, and the week grid updates immediately

#### Scenario: Prevent copy to same day
- **WHEN** the teacher selects the same day as both source and target
- **THEN** the copy control is disabled or produces no effect
