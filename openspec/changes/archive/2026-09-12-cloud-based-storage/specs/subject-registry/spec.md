## MODIFIED Requirements

### Requirement: Subject registry storage
The system SHALL persist the subject registry in the signed-in user's cloud storage (see cloud-sync capability) rather than in `localStorage`. Each subject entry SHALL have a unique code (1–10 characters), an optional display name, and a color value. The registry SHALL survive page reloads and be available to the same user across devices.

#### Scenario: Registry persists across reload
- **WHEN** the user adds a subject and reloads the page
- **THEN** the subject still appears in the registry, loaded from that user's cloud storage

#### Scenario: Registry persists across devices
- **WHEN** the user adds a subject while signed in on one device and later signs in on a different device
- **THEN** the subject appears in the registry on the second device
