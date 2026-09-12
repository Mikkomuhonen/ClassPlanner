## Purpose

Persists each signed-in teacher's weekly plans, notes, todos, and subject registry in Cloud Firestore, scoped to their own account, and keeps that data synchronized in real time across the teacher's own open sessions and devices.

## ADDED Requirements

### Requirement: Per-user cloud storage of weekly plan data
The system SHALL store each signed-in user's weekly plan data (lesson slots, participants, subjects, time overrides, lunch annotations) in a location scoped exclusively to that user's account. No user SHALL be able to read or write another user's data.

#### Scenario: Save writes to the signed-in user's own data
- **WHEN** a signed-in user edits and saves a week's plan
- **THEN** the changes are stored under that user's account and are not visible to any other user account

#### Scenario: Different users have independent data
- **WHEN** two different users are each signed in on their own sessions
- **THEN** each sees and edits only their own weekly plans, with no shared or overlapping data

### Requirement: Cloud storage of notes and todos
The system SHALL store each week's notes and to-do items as part of that user's cloud-stored week data, replacing the prior local-file-based storage.

#### Scenario: Notes and todos persist per week per user
- **WHEN** a signed-in user adds notes and to-do items to a week and later navigates away and back
- **THEN** the same notes and to-do items are shown, retrieved from that user's cloud storage

### Requirement: Cloud storage of subject registry
The system SHALL store each signed-in user's subject registry (codes, names, colors) in that user's cloud-stored data, replacing local-storage-based persistence.

#### Scenario: Subject registry persists across devices
- **WHEN** a signed-in user adds a subject on one device and later signs in on a different device
- **THEN** the same subject appears in the registry on the second device

### Requirement: Real-time sync across sessions
The system SHALL propagate changes to a user's weekly plan, notes, todos, and subject registry to all of that same user's other active sessions in real time, without requiring a manual reload.

#### Scenario: Change on one tab appears on another
- **WHEN** a signed-in user edits a lesson slot in one browser tab
- **THEN** another tab signed in as the same user reflects the change without the user manually reloading it

### Requirement: Always-online operation
The system SHALL require an active connection to the cloud storage backend to load or save planner data. The system is not required to support offline editing or offline data access in this change.

#### Scenario: No connection prevents save
- **WHEN** a signed-in user attempts to save a week's plan while the device has no network connection to the backend
- **THEN** the system indicates the save could not be completed rather than silently succeeding

### Requirement: Data access restricted by authentication
The system SHALL enforce, at the storage layer, that only the authenticated owner of a user's data can read or write it, independent of any client-side checks.

#### Scenario: Unauthenticated request is rejected
- **WHEN** a request to read or write a user's weekly plan data is made without a valid session for that user
- **THEN** the storage layer rejects the request
