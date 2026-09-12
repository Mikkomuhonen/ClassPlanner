## MODIFIED Requirements

### Requirement: File persistence via File System Access API
The system SHALL require the user to be signed in with a Google account (see cloud-auth capability) before saving or loading weekly data. The system SHALL save the current week's data to that signed-in user's cloud storage (see cloud-sync capability) when the user activates the save control. The system SHALL allow loading a previously saved week's data from the same signed-in user's cloud storage.

The stored week data SHALL include the week's notes and to-do items alongside lesson slot data. When the user saves, notes and todos for the current week are written to cloud storage. When the user loads a week, notes and todos are read from cloud storage and displayed.

#### Scenario: Select folder and save week
- **WHEN** a signed-in user activates the save control
- **THEN** the current week's data, notes, and todos are written to that user's cloud storage; no local folder selector is presented or required

#### Scenario: Load saved week
- **WHEN** the user activates the load control and the signed-in user's cloud storage contains data for the displayed week
- **THEN** the grid populates with the saved lesson slot data, and the notes and todos for that week are displayed

#### Scenario: Load week with no notes in file
- **WHEN** a saved week's cloud data contains no notes or todos
- **THEN** the notes panel and to-do list are displayed empty (backward compatible)

### Requirement: Folder restore button across sessions
When the application loads and the user has an active authenticated session (see cloud-auth capability), the system SHALL automatically restore that session and load the current week's config and data from cloud storage, without requiring the user to take any additional action such as picking a folder or restoring a handle. The system SHALL NOT display a folder restore button or perform any local folder/handle restoration; there is no concept of a "stored folder handle" in the cloud-based model.

#### Scenario: Restore button appears when handle is stored
- **WHEN** the application loads
- **THEN** no folder restore button is ever shown, because folder handles are no longer used; a signed-in user's data loads automatically instead

#### Scenario: Clicking restore button restores the folder
- **WHEN** the application has an active authenticated session on load
- **THEN** the system restores that session automatically and loads the current week's config and data, with no restore button to click

#### Scenario: Restore button hidden when permission denied
- **WHEN** the application loads without a valid authenticated session
- **THEN** no restore button or folder-permission prompt is shown; the sign-in prompt is displayed instead

#### Scenario: No restore button when no stored handle
- **WHEN** the application loads
- **THEN** the system never displays a folder restore button, regardless of session state

#### Scenario: No automatic permission request on load
- **WHEN** the application loads
- **THEN** the system does not call any local filesystem permission API; it relies solely on the authentication session to restore data
