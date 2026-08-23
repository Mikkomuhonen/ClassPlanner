## ADDED Requirements

### Requirement: Folder restore button across sessions
When the application loads and a previously selected folder handle is stored in IndexedDB, the system SHALL display a restore button in the toolbar showing the stored folder's name (e.g., "↩ Jatka: viikkosuunnitelmat"). Clicking the restore button SHALL request filesystem permission and, if granted, restore the folder as the active session folder, loading the current week's config and data. If permission is not granted or the handle is no longer valid, the restore button SHALL be hidden. The restore button SHALL NOT be shown when no handle is stored in IndexedDB. The system SHALL NOT attempt to call `requestPermission()` automatically on page load without a user gesture.

#### Scenario: Restore button appears when handle is stored
- **WHEN** the application loads and IndexedDB contains a previously stored folder handle
- **THEN** a restore button showing the folder name is visible in the toolbar

#### Scenario: Clicking restore button restores the folder
- **WHEN** the user clicks the restore button and the browser grants permission
- **THEN** the folder is set as the active session folder, config is loaded, and the current week's data is loaded

#### Scenario: Restore button hidden when permission denied
- **WHEN** the user clicks the restore button and permission is not granted
- **THEN** the restore button is hidden and no folder is set as active

#### Scenario: No restore button when no stored handle
- **WHEN** the application loads and IndexedDB contains no folder handle
- **THEN** no restore button is shown in the toolbar

#### Scenario: No automatic permission request on load
- **WHEN** the application loads
- **THEN** the system does not call requestPermission() without a user gesture
