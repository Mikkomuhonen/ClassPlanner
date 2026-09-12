## Context

`docs/index.html` is a single static file with an inline `<style>` block (~150 lines of CSS) and inline JS render functions (`renderGrid`, etc.) that generate the weekly grid, toolbar, and breaks section. See `proposal.md` - Why/What Changes for motivation and full change list. Today, colors are hardcoded hex literals repeated across multiple rules (e.g. `#f59e0b`/`#d97706`/`#fcd34d` for the "lunch/amber" family), and typography relies on the browser's `system-ui` stack with ad-hoc `em` sizes per rule.

## Goals / Non-Goals

**Goals:**
- Centralize the palette as CSS custom properties (`:root { --ink: ...; }`) so the five signal colors are defined once and reused.
- Replace full-cell background-wash status coding with a left-edge accent-bar treatment, without changing what data each indicator represents.
- Introduce one webfont with a defined type scale (custom properties for font sizes), replacing one-off `em` values.
- Keep all changes CSS/markup-class-level; no changes to state, storage, or event-handling logic.

**Non-Goals:**
- No change to subject-registry badge colors (these remain user-configurable per the existing spec) or to print-output color preservation behavior — both stay exactly as currently specified.
- No new interactive behavior (no new buttons, no new user-facing settings for the theme itself).
- No dark mode / theming system — a single fixed palette, not a switchable one.

## Decisions

**1. CSS custom properties over a build step.**
The project has no bundler (`docs/index.html` is served as-is via GitHub Pages). Rather than introducing a CSS preprocessor or build tool, define tokens as `:root` custom properties directly in the existing `<style>` block. Alternative considered: Tailwind CDN — rejected, since it would replace the whole styling approach and increase risk/scope well beyond a presentation-only change.

**2. Webfont via CDN `<link>`, not self-hosted.**
Load Inter (or IBM Plex Sans) from Google Fonts CDN, same pattern already used for the Firebase SDK (CDN script tags, no bundler). Alternative considered: keep `system-ui` — rejected per the design goal of intentional typography instead of platform defaults, per the frontend-design skill guidance.

**3. Status indicators: left-edge accent bar + small label, not full-cell background wash.**
Implemented via a `box-shadow: inset 3px 0 0 var(--token)` or a thin `::before` bar, plus the existing small text labels (`.cell-lunch`, `.cell-supervision`, etc.) recolored to the new signal-color text instead of full background fills. This directly targets the proposal's "calm grid, boldness in one place" principle: the accent bar communicates status without competing with cell content for attention. Alternative considered: keep full-cell background wash but re-color it — rejected, since layered background washes (has-content yellow + lunch amber + supervision blue potentially overlapping in visual weight) are the actual noise problem being solved, not just the wrong hue.

**4. Today-column highlight: a single treatment, not per-cell hover-driven emphasis.**
Add one class (e.g. `.day-today`) applied to today's column header + cells via existing `renderGrid`/header-render logic (a small JS change to add the class conditionally, comparing rendered day against `new Date()`), styled with a subtle top-accent or header background shift — not scattered hover effects.

**5. Scope class-name additions minimally.**
Where new visual states need markup hooks not already exposed (e.g. `.day-today`), add a single new class in the relevant render function. No restructuring of existing DOM shape, ids, or data attributes, to avoid touching any code path that stores/reads/persists data (kept fully isolated from the Firebase/Firestore persistence work already shipped).

## Risks / Trade-offs

- [Risk] New palette colors chosen may still read as "another generic take" once implemented → [Mitigation] Take a screenshot after implementing and do the self-critique pass the frontend-design skill recommends before considering the change done; iterate on hex values if it still reads generic.
- [Risk] Webfont CDN adds an external network dependency/render-blocking request → [Mitigation] Use `display=swap` in the Google Fonts URL and keep `system-ui` as the CSS fallback stack so the app remains usable if the font fails to load.
- [Risk] Changing `.has-content`/`.cell-lunch-break`/`.cell-supervision` styling could visually regress print output (which currently also uses some of these classes/colors) → [Mitigation] Manually verify the print view (task in tasks.md) after the restyle, confirming the "note colors preserved" and "supervision/lunch markers visible" print requirements still hold, since those are unchanged spec requirements.
- [Trade-off] Purely CSS/token-based approach is simpler than adopting a design-system/CSS-in-JS approach, but means token reuse depends on developer discipline (no compiler enforcement) — acceptable given the small single-file scope of this app.

## Migration Plan

1. Add `:root` custom properties for the 5 signal colors + type scale to the existing `<style>` block.
2. Add the Google Fonts `<link>` tag and update `body { font-family }` to reference the new font stack with `system-ui` fallback.
3. Replace hardcoded hex values in toolbar, grid, cell-status, breaks-section rules with `var(--token)` references.
4. Replace full-cell background-wash rules for `.has-content`, `.cell-lunch-break`, `.cell-lunch`, `.cell-supervision` with the left-edge accent-bar treatment.
5. Add `.day-today` class logic in the grid-header render path and corresponding CSS.
6. Redesign `#signedOutOverlay` styling as the deliberate "hero" moment.
7. Manually verify: normal grid view, edit-mode view, sign-in overlay, and print output (Ctrl/Cmd+P) all look correct and no existing functionality (clicks, edit mode, save/load) is broken.
8. Commit on the `redesign-timetable-ui` branch; open for review before merging to `main` (no production deploy risk since GitHub Pages serves whatever is on `main`).

No rollback complexity beyond `git revert`/deleting the branch, since this is a static, stateless, CSS-level change with no data migration involved.
