## Why

ClassPlanner currently persists weekly plans only through the browser's File System Access API, saving JSON files to a folder on the user's own device. This only works in Chromium-based browsers, ties each teacher's data to a single machine, and gives no way to access plans from another device. Moving storage to the cloud removes this dependency and lets each teacher's schedule follow them across devices and browsers.

## What Changes

- Add Google Sign-In (Firebase Authentication) as the way teachers identify themselves. No local sign-up form; the user picks a Google account via the standard Firebase Auth popup/redirect flow.
- Add Cloud Firestore as the persistence layer, replacing the local folder/File System Access API and the IndexedDB folder-handle bookkeeping used to restore it.
- Each signed-in teacher's weekly plans, notes, todos, and subject registry are stored under a per-user path in Firestore, scoped to their own account (`users/{uid}/...`). No sharing between teachers in this change.
- Data updates sync in real time across a teacher's own open tabs/devices using Firestore's live listeners (`onSnapshot`), replacing the current "save to file, reload to see changes" model.
- The app requires an active internet connection and a signed-in Google account to load or save plans; the previous no-login, work-then-pick-a-folder flow is removed. **BREAKING**: existing local `viikko_YYYY_WNN.json` files are not imported — there is no data to migrate today, so no import path is built.
- Remove the folder picker, the "restore last folder" IndexedDB flow, and the `localStorage`-based subject storage, replacing them with Firestore-backed equivalents.
- Add a new Firebase project (separate from any other existing Firebase project) dedicated to ClassPlanner, with Firestore security rules restricting each user's documents to their own `uid`.

## Capabilities

### New Capabilities
- `cloud-auth`: Google Sign-In based authentication using Firebase Auth; signed-in state gates access to the planner and identifies which user's data to load.
- `cloud-sync`: Cloud Firestore-backed storage of weekly plans, notes, todos, and the subject registry, scoped per authenticated user, with real-time sync across that user's own sessions/devices.

### Modified Capabilities
- `week-planner`: The existing requirement describing local folder selection and `viikko_YYYY_WNN.json` file save/load, and the requirement describing restoring a previously selected folder from IndexedDB, are replaced by cloud-based save/load tied to the signed-in user's account instead of a local folder.
- `subject-registry`: Subject storage moves from `localStorage` to the per-user Firestore document; behavior of creating/selecting subjects is unchanged, only the persistence location changes.

## Impact

- `docs/index.html`: remove `showDirectoryPicker`, folder-handle IndexedDB logic, and `localStorage` subject persistence; add Firebase SDK initialization, Google Sign-In UI/flow, and Firestore read/write/listener calls for weeks, notes, todos, and subjects.
- New dependency: Firebase (Firebase Authentication + Cloud Firestore), loaded via SDK in the static page; no custom backend server introduced.
- New Firebase project setup (console project, registered web app, Firestore database, security rules) required before this change can be used end-to-end — tracked as setup tasks.
- Hosting continues on GitHub Pages (static file); Firebase is used only as a backend service, not for hosting.
- Deployment/config: the app needs Firebase project configuration (API key, project id, etc.) embedded or injected at build/deploy time.
