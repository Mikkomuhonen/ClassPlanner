# subject-registry Specification

## Purpose

Ylläpitää pysyvää rekisteriä oppiaineista. Jokaisella oppiaineella on lyhyt koodi, valinnainen koko nimi ja väri. Rekisteriä hallitaan muokkaustilassa, ja uusia aineita voi luoda suoraan oppitunnin muokkausnäkymästä.

## Requirements

### Requirement: Subject registry storage
The system SHALL persist the subject registry in `localStorage` under a dedicated key. Each subject entry SHALL have a unique code (1–10 characters), an optional display name, and a color value. The registry SHALL survive page reloads.

#### Scenario: Registry persists across reload
- **WHEN** the user adds a subject and reloads the page
- **THEN** the subject still appears in the registry

### Requirement: Subject registry management in edit mode
In edit mode the system SHALL display the full subject registry and allow the user to: add a new subject by entering a code; edit an existing subject's code, name, and color; delete a subject; and reorder subjects. The system SHALL prevent saving a subject with a code that duplicates an existing entry.

#### Scenario: Add subject in edit mode
- **WHEN** the user enters a new code and confirms in edit mode
- **THEN** the subject appears in the registry with a default color and empty name

#### Scenario: Duplicate code rejected
- **WHEN** the user attempts to save a subject whose code matches an existing entry
- **THEN** the system rejects the input and shows an error

#### Scenario: Delete subject
- **WHEN** the user deletes a subject from the registry
- **THEN** the subject is removed from the registry; existing lesson slots that referenced that code retain the stored code value but the badge renders without a resolved color

#### Scenario: Edit subject color
- **WHEN** the user changes a subject's color in edit mode
- **THEN** all lesson cells that reference that subject code immediately reflect the new color

### Requirement: On-the-fly subject creation from popup
When the user types a code in the subject selection section of the lesson popup and that code does not exist in the registry, the system SHALL create a new registry entry with that code, an empty name, and a default color, then select it for the current slot.

#### Scenario: New code created from popup
- **WHEN** the user types a code not in the registry and confirms it in the popup
- **THEN** the code is added to the registry with default values and selected for the current lesson slot
