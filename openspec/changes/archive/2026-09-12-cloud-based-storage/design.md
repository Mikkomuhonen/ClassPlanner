## Context

ClassPlanner today is a single static HTML file (`docs/index.html`) hosted on GitHub Pages, with no backend. Persistence relies on the browser's File System Access API (folder picker, `viikko_YYYY_WNN.json` per week, `config.json`), an IndexedDB store holding only the last-used folder handle, and `localStorage` for the subject registry. See proposal.md - Why for the motivation to move off this model.

This design introduces a new Firebase project (Authentication + Cloud Firestore) as the backend, called directly from the existing static page. No custom server is introduced; GitHub Pages continues to serve the static assets.

## Goals / Non-Goals

**Goals:**
- Google Sign-In gates all planner functionality; the signed-in user's `uid` is the sole key for their data.
- Firestore stores weekly plan data, notes, todos, and the subject registry per user, replacing File System Access API, IndexedDB handle storage, and `localStorage` subject storage.
- Real-time listeners (`onSnapshot`) keep a user's own open sessions/devices in sync automatically.
- Firestore security rules enforce per-user data isolation at the backend, not just in client code.

**Non-Goals:**
- No sharing of data between different users/teachers (single-owner data model only).
- No import of existing local `viikko_YYYY_WNN.json` files (none exist yet, per proposal).
- No offline support; the app requires connectivity to load/save.
- No custom backend server or API layer; Firebase SDKs are called directly from the client.

## Decisions

### Data model: per-user document tree
```
firestore/
  users/{uid}/
      subjects: { registry: [...] }              // replaces localStorage subject registry
      weeks/{weekKey}/                            // weekKey format matches existing viikko_YYYY_WNN naming, e.g. "2026_W03"
          slots: { Monday: {...}, ... }
          notes: [...]
          todos: [...]
      config/{singleton}                          // dayBreaks, rhythms, dayRhythms (replaces config.json)
```
Rationale: this mirrors the existing local-file shape almost exactly (one JSON blob per week, one config blob), minimizing changes to the in-memory data structures and rendering code in `docs/index.html`. Alternative considered: a single large per-user document holding all weeks — rejected because Firestore documents have a 1 MiB size limit and per-week documents scale better as history grows.

### Real-time sync via Firestore `onSnapshot` listeners
Rationale: Firestore's snapshot listeners deliver live updates with no additional infrastructure, satisfying the multi-device sync requirement at effectively no extra engineering cost over a one-time `get()`. Alternative considered: manual polling — rejected as unnecessary complexity given `onSnapshot` is built in and free-tier friendly.

### Authentication: Firebase Authentication with Google provider only
Rationale: zero password/account management burden, matches the confirmed decision to use Google Sign-In. Alternative considered: email/password — rejected as unnecessary extra UI and account-recovery burden for this use case.

### Security enforcement: Firestore Security Rules keyed on `request.auth.uid`
Rationale: enforces per-user isolation at the database layer regardless of client bugs, satisfying the "Data access restricted by authentication" requirement in cloud-sync. Rule shape: reads/writes under `users/{uid}/**` require `request.auth != null && request.auth.uid == uid`.

### No offline persistence enabled
Rationale: matches the confirmed "always connected" decision; keeps the client logic simpler (no need to reconcile offline queued writes). Firestore's default online-only client behavior is used as-is (no `enableIndexedDbPersistence` call).

### Single new dedicated Firebase project
Rationale: matches the user's decision to create a new Firebase project rather than reuse an existing one, keeping quotas, billing, and security rules isolated to ClassPlanner.

## Risks / Trade-offs

- [Firebase config (API key, project id) is embedded in the public static page] → Mitigation: Firebase web API keys are not secret; actual access control is enforced by Firestore Security Rules keyed on authenticated `uid`, not by hiding the config.
- [No data import path for future local-file users] → Mitigation: none needed now per confirmed scope (no existing local usage); revisit if local usage begins before this ships.
- [Always-online requirement removes offline usability the local-file version had] → Mitigation: explicitly accepted as out of scope for this change; the save/load controls surface a clear error when the network is unavailable rather than failing silently.
- [Firestore free-tier quota exceeded under future growth beyond ~10 users] → Mitigation: current usage pattern (a handful of teachers, infrequent saves) is far under the free Spark tier's daily quota; revisit only if usage grows substantially.
- [Removing the folder restore button changes a previously visible UI element] → Mitigation: intentional per proposal; automatic session restore replaces it with an equivalent (or better) user experience.

## Migration Plan

1. Create the new Firebase project; enable Authentication (Google provider) and Cloud Firestore.
2. Write and deploy Firestore Security Rules restricting `users/{uid}/**` access to the matching authenticated user.
3. Add the Firebase SDK and initialization/config to `docs/index.html`.
4. Implement sign-in/sign-out UI and gate the existing planner UI behind an authenticated state.
5. Replace File System Access API calls (`selectFolder`, `saveWeek`, `loadWeek`, `saveConfig`, `loadConfig`) with equivalent Firestore reads/writes under the signed-in user's path.
6. Replace the IndexedDB folder-handle restore flow (`openDB`, `saveHandleToDB`, `loadHandleFromDB`, `tryRestoreHandle`, `checkForStoredHandle`) with an auth-state-based auto-load on session restore.
7. Replace `localStorage` subject registry calls with Firestore reads/writes under the signed-in user's `subjects` document, adding `onSnapshot` listeners for real-time updates.
8. Remove the folder picker button, restore button, and related UI elements from the toolbar; add sign-in/sign-out controls in their place.
9. Manually verify: sign-in, save/load a week, real-time sync across two tabs, sign-out, and that Firestore rules reject cross-user access (e.g., via the Firebase console rules simulator).

No automated rollback is needed beyond reverting the deployed static page and Firestore rules, since GitHub Pages serves a single static artifact and Firestore data for a not-yet-launched feature carries no prior production data to roll back.
