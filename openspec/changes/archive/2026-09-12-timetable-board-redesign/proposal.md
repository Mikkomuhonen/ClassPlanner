## Why

ClassPlanner's current visual design (navy admin-panel toolbar, cold gray background, ad-hoc status colors accumulated feature-by-feature, no defined type scale) reads as a generic dashboard rather than a purpose-built teacher's timetable tool. A deliberate visual system will make the weekly grid faster to scan at a glance (especially "what's today, what's a break, what's supervision") without changing any existing behavior.

## What Changes

- Introduce a small set of named design tokens (ink/paper/chalk-blue/marker-amber/signal-green) replacing the current ad-hoc hex values scattered through `docs/index.html`'s `<style>` block.
- Replace `system-ui` with a single deliberately chosen sans-serif (e.g. Inter or IBM Plex Sans) loaded from a CDN, with a defined type scale replacing one-off `em` sizes.
- Restyle the toolbar: flatten the navy pill-button-on-dark look into a quieter, higher-contrast bar.
- Change page background from cold gray (`#f0f2f5`) to a warmer off-white paper tone.
- Replace full-cell background-wash status coding (has-content yellow, lunch amber, supervision blue) with a unified left-edge accent-bar + label system, using the three distinct signal colors (blue = lesson, amber = break/lunch, green = supervision).
- Add a single deliberate highlight treatment for the current day's column.
- Redesign the sign-out overlay/sign-in screen as one deliberate "first thing you see" moment.
- Unify the several near-duplicate amber hex values into the single `--marker-amber` token.

This is a **presentation-only** change: no data model, storage, auth, or interaction behavior changes. All existing requirements (subject badge colors from the registry, print color preservation, etc.) remain exactly as specified today — only the surrounding chrome, base palette, and typography change.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None — this change does not alter any spec-level requirement or user-observable behavior described in `openspec/specs/`. It only restyles presentation (colors, fonts, borders) around existing, unchanged functionality. See `.openspec.yaml` `skip_specs: true`._

## Impact

- `docs/index.html`: `<style>` block (toolbar, grid, cell status styling, breaks section, sign-in overlay) — CSS-only changes plus possibly small class-name additions to support the new accent-bar status system. No JavaScript logic changes expected; if any class-name changes are needed on rendered elements, the render functions (`renderGrid`, etc.) get updated to add classes but not change what they render.
- No changes to Firebase, Firestore, data model, or any existing spec requirements.
- Risk is low: purely visual, easily reverted via git if a change reads worse than intended once built.
