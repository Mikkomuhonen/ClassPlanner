## Context

See proposal.md for motivation. The project has no existing UI layer — `src/index.js` is a plain JS class with no dependencies. Node.js is available via the existing `package.json`. The target runtime is Chrome or Edge on a local Windows machine.

## Goals / Non-Goals

**Goals:**
- Single self-contained `public/index.html` with all HTML, CSS, and JavaScript inline — no build tools, no bundler, no npm install required for the UI
- Local HTTP server launched via `npm start` so the page runs on `localhost` and the File System Access API is available
- Two persistent JSON files in the user-selected folder: `config.json` (break schedule + participant registry) and per-week `viikko_YYYY_WNN.json` files

**Non-Goals:**
- Server-side logic (no Express, no API routes)
- Multi-user or sync support
- Framework adoption (React, Vue, etc.) — vanilla JS only
- Mobile / touch optimisation

## Decisions

### D1: Single HTML file, no build step
All CSS and JavaScript live inline in `public/index.html`. No bundler, no transpiler, no `node_modules` for the UI.

**Rationale:** The spec requires zero installation beyond Node.js. A single file is trivially portable — drop it in any folder and `npx serve` serves it. The added complexity of a build pipeline is not justified for a single-user local tool.

**Alternative considered:** Vite + component files. Rejected — adds tooling overhead and makes the deliverable depend on `npm install`.

### D2: `npx serve public` as the start command
`package.json` `start` script becomes `npx serve public`. No additional dependency is installed; `npx` downloads `serve` on first run.

**Rationale:** The File System Access API (`showDirectoryPicker`) is blocked on `file://` URLs but works on `localhost`. A one-command local server is the simplest path to a secure context.

**Alternative considered:** A minimal Node.js `http.createServer` script in `src/`. Rejected — `npx serve` is less code to maintain and handles edge cases (MIME types, caching headers).

### D3: Grid built as a dynamic HTML table from the break schedule
The week grid is rendered by JavaScript from a `schedule` data structure (array of `{type: 'lesson'|'break', start, end, duration?}` entries). Changing the break schedule in edit mode mutates this array and re-renders the table.

**Rationale:** A static HTML table cannot accommodate variable break positions. A JS-driven render loop keeps the schedule the single source of truth and makes time recalculation trivial.

### D4: File System Access API with session-scoped directory handle
`showDirectoryPicker()` is called once per session. The returned `FileSystemDirectoryHandle` is held in a module-level variable. Save and load operations use this handle directly.

**Rationale:** The handle cannot be persisted across page loads without the Storage Access API (which requires additional permissions). Session scope is sufficient for the single-teacher, single-session use pattern.

**Note:** The user must re-select the folder after a page reload. This is a known browser security constraint.

### D5: `config.json` for schedule structure and participant registry
Both the break schedule array and the participant registry (groups + names) are serialised into a single `config.json`. Weekly plan data is separate (`viikko_YYYY_WNN.json`) to keep config stable across weeks.

**Rationale:** Separating config from data avoids accidental overwrites when navigating between weeks. Loading on startup only requires reading one file.

### D6: Popup (modal) for lesson slot editing
Clicking a lesson cell opens a modal overlay containing the participant panel and the free-text area.

**Rationale:** Keeps the grid undisturbed while editing. A side panel would compress the five-column grid on narrower screens. Closing on outside-click is a familiar UX pattern.

### D7: `@media print` CSS for print layout
`window.print()` is called from a print button. CSS hides all controls and adjusts the table to A4 landscape. No third-party PDF library needed.

## Risks / Trade-offs

- **File System Access API availability** → Chrome/Edge only. Firefox support is partial (no `showDirectoryPicker` as of writing). Mitigation: document the browser requirement; fall back to a plain download prompt if the API is absent.
- **No auto-save** → Data is lost if the user closes the tab without saving. Mitigation: warn on `beforeunload` if there are unsaved changes.
- **Folder re-selection on reload** → Browser security prevents persisting the directory handle. Mitigation: clearly label the folder selector and indicate when no folder is selected.
- **Large participant lists** → Popups may become tall with many names. Mitigation: cap popup height and make the participant list scrollable.
