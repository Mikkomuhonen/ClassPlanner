## ADDED Requirements

### Requirement: Lesson slot copy
The system SHALL provide a copy control in the lesson slot popup. The control SHALL allow the teacher to copy the current slot's content to any lesson slot on any weekday within the current week. The teacher SHALL select the target day and target lesson number (T1–T7) from dropdowns. Copying SHALL transfer participants, free-form text, and time override (if present) to the target slot, replacing its existing content. The source slot itself SHALL remain unchanged after the copy.

#### Scenario: Copy lesson to another day and slot
- **WHEN** the teacher selects a target day and target lesson number and activates the copy control in the popup
- **THEN** the target slot's participants, text, and time override are replaced with those of the current slot; the source slot's content is unchanged; the week grid updates to reflect the copied content

#### Scenario: Copy clears target's existing content
- **WHEN** the target slot already contains participants or text
- **THEN** the copy replaces the target's content entirely with the source's content

#### Scenario: Copy includes time override
- **WHEN** the source slot has a time override set
- **THEN** the copied slot also receives the same time override
