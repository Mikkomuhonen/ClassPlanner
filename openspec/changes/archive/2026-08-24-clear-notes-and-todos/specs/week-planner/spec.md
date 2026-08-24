## ADDED Requirements

### Requirement: Clear notes with confirmation and undo
The notes panel SHALL provide a clear control. When the user activates the clear control, the system SHALL display a confirmation dialog. If the user confirms, all notes for the current week SHALL be removed and rendered empty. After clearing, a temporary undo control SHALL appear in the notes panel header for five seconds. Activating the undo control within that window SHALL restore the notes to their state before the clear. The undo control SHALL disappear when the five-second window expires or when the user navigates to a different week.

#### Scenario: Clear notes with confirmation
- **WHEN** the user activates the clear control in the notes panel
- **THEN** a confirmation dialog appears asking the user to confirm the action

#### Scenario: Confirmation cancelled
- **WHEN** the user dismisses the confirmation dialog
- **THEN** the notes remain unchanged

#### Scenario: Confirmation accepted
- **WHEN** the user confirms the clear action
- **THEN** all notes for the current week are removed and the notes panel shows empty

#### Scenario: Undo clears notes restoration
- **WHEN** the user activates the undo control within five seconds of clearing
- **THEN** all notes are restored to their state before the clear

#### Scenario: Undo expires
- **WHEN** five seconds elapse after clearing without the user activating undo
- **THEN** the undo control disappears and the clear is permanent for this session

### Requirement: Clear todos with confirmation and undo
The to-do list panel SHALL provide a clear control. When the user activates the clear control, the system SHALL display a confirmation dialog. If the user confirms, all to-do items for the current week SHALL be removed and the list rendered empty. After clearing, a temporary undo control SHALL appear in the to-do panel header for five seconds. Activating the undo control within that window SHALL restore the to-do items to their state before the clear. The undo control SHALL disappear when the five-second window expires or when the user navigates to a different week.

#### Scenario: Clear todos with confirmation
- **WHEN** the user activates the clear control in the to-do panel
- **THEN** a confirmation dialog appears asking the user to confirm the action

#### Scenario: Todo confirmation cancelled
- **WHEN** the user dismisses the confirmation dialog
- **THEN** the to-do list remains unchanged

#### Scenario: Todo confirmation accepted
- **WHEN** the user confirms the clear action
- **THEN** all to-do items for the current week are removed and the panel shows empty

#### Scenario: Undo todo restoration
- **WHEN** the user activates the undo control within five seconds of clearing
- **THEN** all to-do items are restored to their state before the clear

#### Scenario: Todo undo expires
- **WHEN** five seconds elapse after clearing without the user activating undo
- **THEN** the undo control disappears and the clear is permanent for this session
