## Purpose

Maintains a persistent registry of participant names organised into named groups, enabling teachers to quickly assign participants to lesson slots without retyping names each time.

## ADDED Requirements

### Requirement: Group and name management
The system SHALL allow the teacher to create, rename, and delete participant groups and to add or remove individual names within each group. Group and name management SHALL be available in edit mode on the main page.

#### Scenario: Add a new group
- **WHEN** the user activates the "New group" control in edit mode
- **THEN** a new empty group is created and the user can enter a group name

#### Scenario: Add a name to a group
- **WHEN** the user activates the add-name control within a group in edit mode
- **THEN** a new name entry is created in that group and the user can type the participant's name

#### Scenario: Delete a group
- **WHEN** the user activates the delete control on a group in edit mode
- **THEN** the group and all its names are removed from the registry

### Requirement: Participant selection in lesson popup
The system SHALL display all groups and their names in the lesson slot popup. The user SHALL be able to toggle individual names on or off for the lesson slot by clicking them.

#### Scenario: Toggle individual participant
- **WHEN** the user clicks a participant name in the popup
- **THEN** the name is added to the lesson slot's participant list if it was not selected, or removed if it was already selected

### Requirement: Group quick-select
The system SHALL provide a quick-select control per group in the lesson popup. Activating it SHALL replace the current participant selection for that lesson slot with all members of the selected group.

#### Scenario: Quick-select a group
- **WHEN** the user activates the quick-select control for a group in the popup
- **THEN** the lesson slot's participant list is set to exactly the current members of that group, replacing any previous selection

### Requirement: Registry persistence
The participant registry (groups and names) SHALL be saved to `config.json` in the user's chosen folder whenever changes are made in edit mode. The registry SHALL be loaded from `config.json` at application startup if a folder has previously been selected and the file exists.

#### Scenario: Registry saved on edit
- **WHEN** the user exits edit mode after modifying the registry
- **THEN** the updated registry is written to `config.json` in the chosen folder

#### Scenario: Registry loaded on startup
- **WHEN** the application loads and a folder has been selected and `config.json` exists
- **THEN** the registry is populated with the groups and names from that file
