## Purpose

Identifies which teacher is using ClassPlanner via Google Sign-In, so the application knows whose cloud-stored plans, notes, todos, and subjects to load and save.

## ADDED Requirements

### Requirement: Google Sign-In required to use the planner
The system SHALL require the user to sign in with a Google account before the weekly planner grid, notes, todos, or subject registry are shown or editable. Before sign-in, the system SHALL display only a sign-in control.

#### Scenario: Unauthenticated user sees sign-in prompt
- **WHEN** a user opens the application without an active session
- **THEN** the system displays a "Sign in with Google" control and no planner data

#### Scenario: Successful sign-in loads the user's planner
- **WHEN** the user completes the Google Sign-In flow successfully
- **THEN** the system shows the planner grid and loads that user's weekly plans, notes, todos, and subjects

### Requirement: Session persistence across reloads
The system SHALL keep the user signed in across page reloads and browser restarts until the user explicitly signs out, using the authentication provider's persisted session.

#### Scenario: Reload keeps user signed in
- **WHEN** a signed-in user reloads the page
- **THEN** the system restores the session without requiring sign-in again and loads that user's data

### Requirement: Sign-out
The system SHALL provide a sign-out control. Activating it SHALL end the session and return the user to the signed-out state, hiding any previously loaded planner data.

#### Scenario: User signs out
- **WHEN** a signed-in user activates the sign-out control
- **THEN** the system ends the session and displays the sign-in prompt with no planner data visible

### Requirement: Sign-in failure handling
When the Google Sign-In flow fails or is cancelled by the user, the system SHALL remain in the signed-out state and display an error message, without crashing or showing partial planner data.

#### Scenario: User cancels the sign-in popup
- **WHEN** the user closes or cancels the Google Sign-In popup before completing it
- **THEN** the system remains on the sign-in prompt and shows no error requiring the user to retry silently

#### Scenario: Sign-in fails due to a provider error
- **WHEN** the authentication provider returns an error during sign-in
- **THEN** the system displays an error message and keeps the sign-in control available
