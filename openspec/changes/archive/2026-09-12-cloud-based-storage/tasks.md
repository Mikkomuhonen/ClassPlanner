## 1. Firebase Project Setup

- [x] 1.1 Create a new Firebase project in the Firebase console dedicated to ClassPlanner, and verify it appears in the console's project list
- [x] 1.2 Register a new Web App within the project and record the Firebase config (apiKey, authDomain, projectId, etc.), and verify the config snippet is available in project settings
- [x] 1.3 Enable Google as a sign-in provider in Firebase Authentication, and verify it shows as "Enabled" in the Authentication > Sign-in method console tab
- [x] 1.4 Create a Cloud Firestore database in production mode (choose a region), and verify the empty database is visible in the console

## 2. Firestore Security Rules

- [x] 2.1 Write Firestore Security Rules restricting all reads/writes under `users/{uid}/**` to `request.auth != null && request.auth.uid == uid`, and verify the rule denies all other paths by default
- [x] 2.2 Deploy the security rules to the Firestore database, and verify deployment succeeds with no syntax errors in the console
- [x] 2.3 Verify cross-user isolation using the Firebase console's Rules Playground/simulator: a read/write attempt with a different `uid` than the target path is denied, and a matching `uid` is allowed

## 3. SDK Integration & Authentication

- [x] 3.1 Add the Firebase SDK (Auth + Firestore) to `docs/index.html` via script includes, initialized with the recorded project config, and verify the app loads with no console errors referencing Firebase
- [x] 3.2 Implement a sign-in control that triggers the Google Sign-In popup/redirect flow, and verify clicking it opens the Google account chooser
- [x] 3.3 Implement a sign-out control that ends the Firebase Auth session, and verify activating it returns the app to the signed-out state
- [x] 3.4 Gate the existing planner grid, notes, todos, and subject registry UI behind the signed-in auth state, showing only the sign-in control when signed out, and verify by loading the app in a fresh/incognito session
- [x] 3.5 Implement an auth state listener that automatically restores a previously signed-in session on page load without user action, and verify by reloading the page while signed in
- [x] 3.6 Implement sign-in error handling (popup cancelled, provider error) that keeps the app on the sign-in prompt with a visible error message, and verify by cancelling the Google popup mid-flow

## 4. Replace Local Folder Storage with Firestore (Weekly Plan Data)

- [x] 4.1 Replace `saveWeek()` to write the current week's slots, notes, and todos to `users/{uid}/weeks/{weekKey}` in Firestore instead of a local file, and verify a save while signed in produces a document visible in the Firestore console
- [x] 4.2 Replace `loadWeek()` to read `users/{uid}/weeks/{weekKey}` from Firestore instead of a local file, and verify navigating to a previously saved week repopulates the grid, notes, and todos
- [x] 4.3 Handle the "no data for this week" case by rendering empty notes/todos and applying the template if present, matching current backward-compatible behavior, and verify by loading a week with no saved document
- [x] 4.4 Replace `saveConfig()`/`loadConfig()` (dayBreaks, registry, rhythms, dayRhythms) to read/write a `users/{uid}/config` document in Firestore instead of `config.json`, and verify edit-mode config changes persist across reload
- [x] 4.5 Remove `saveTemplate()`/`applyTemplate()` local-file logic and reimplement template storage against Firestore under the user's path, and verify saving and applying a template works signed in

## 5. Remove Local Folder Picker & Restore-Handle Flow

- [x] 5.1 Remove the folder picker button, `selectFolder()`, and all `showDirectoryPicker` usage from `docs/index.html`, and verify no folder-picker UI element remains in the toolbar
- [x] 5.2 Remove `openDB()`, `saveHandleToDB()`, `loadHandleFromDB()`, `tryRestoreHandle()`, `checkForStoredHandle()`, and the restore button element, and verify no IndexedDB folder-handle code remains and no restore button renders on load
- [x] 5.3 Verify the automatic session-based restore (task 3.5) fully replaces the removed restore-button flow by reloading the app while signed in and confirming current week data loads without any manual step

## 6. Replace Subject Registry Storage with Firestore

- [x] 6.1 Replace `loadSubjects()`/`saveSubjects()` (`localStorage`-based) with Firestore reads/writes under `users/{uid}/subjects`, and verify a subject added in edit mode is persisted to that Firestore path
- [x] 6.2 Add an `onSnapshot` listener on the subjects document so registry changes reflect in real time in the current session, and verify by editing subjects in one tab and observing the update in another tab signed in as the same user
- [x] 6.3 Verify subject registry behavior (add, edit, delete, duplicate-code rejection, on-the-fly creation from popup) is unchanged from the user's perspective, per the subject-registry spec scenarios

## 7. Real-Time Sync for Weekly Data

- [x] 7.1 Add an `onSnapshot` listener on the current week's Firestore document so edits from another of the same user's active sessions/devices update the grid live, and verify by opening the same week in two tabs signed in as the same user and editing in one
- [x] 7.2 Add an `onSnapshot` listener on the config document for the same real-time behavior, and verify by changing a rhythm/break setting in one tab and observing the update in another

## 8. Error Handling & Connectivity

- [x] 8.1 Add explicit error feedback when a save or load Firestore call fails (e.g., no network), replacing the current silent-success assumption, and verify by simulating an offline network condition in devtools and attempting a save

## 9. Manual Verification Pass

- [x] 9.1 Verify end-to-end flow: sign in, edit and save a week, sign out, sign back in, and confirm the same data loads
- [x] 9.2 Verify two different Google accounts each see only their own weekly plans, notes, todos, and subjects, with no cross-visibility
- [x] 9.3 Verify printing still works correctly against Firestore-loaded data, matching the existing week-planner print requirement
