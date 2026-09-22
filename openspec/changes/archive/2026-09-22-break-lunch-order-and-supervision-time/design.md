## Context

`docs/index.html` is a single-file app; all break/lunch/supervision rendering lives in `renderGrid()`, and all per-slot editing lives in the `openPopup()`/`savePopup()` pair. See proposal.md for motivation. The existing `getEffectiveLunch(dayIdx, slotIdx, cell)` helper already resolves per-week lunch overrides/suppressions against a day's structural default lunch; `dayBreaks[d]` holds the structural regular-break entries per weekday.

## Goals / Non-Goals

**Goals:**
- Order the break/supervision and lunch indicators within a cell chronologically by default, with a per-slot manual override.
- Let supervision have its own optional start time/duration, defaulting to the break's own timing.
- Fix the corrupted indicator glyphs.

**Non-Goals:**
- Changing the structural (per-day) break/lunch configuration model in `per-day-breaks`.
- Supporting more than one supervision window per slot, or supervision independent of a slot having any break at all beyond the existing boolean gate.
- A day-level default for supervision timing (unlike lunch's `dayLunch` default) — supervision timing is per-week/per-slot only, consistent with the existing boolean flag's scope.

## Decisions

- **New `getEffectiveSupervision(cell, brk, lessonEndMin)` helper**, mirroring `getEffectiveLunch`'s shape (`{start, duration}` or `null`), so both the grid renderer and the popup compute the same effective time from the same inputs. Alternative considered: inlining the fallback logic at each call site — rejected to avoid duplicating the default-to-break-time rule in two places.
- **`cell.breakSupervision` stays a boolean gate**; `cell.supervisionStart`/`cell.supervisionDuration` are separate optional overrides only consulted when the gate is true. Alternative considered: folding everything into a single nullable object (like lunch's `lunchStart`) — rejected to avoid a breaking change to the existing boolean flag already used by "Clear all cells" and other requirements.
- **`cell.lunchBeforeBreak` is a simple boolean override**, checked first in `renderGrid()` before falling back to the `effLunch.start < t.end` chronological comparison already introduced for automatic ordering. This keeps manual and automatic ordering as a single ternary rather than two divergent code paths.
- **Break/supervision indicators are grouped into one `DocumentFragment` and lunch into another**, then appended in the decided order. This avoids conditionally interleaving individual `appendChild` calls across three possible indicators.
- **Fixing the corrupted emoji bytes required byte-level verification** (the file previously stored the U+FFFD replacement character instead of the intended emoji for two `textContent` assignments). Line-targeted rewrites were verified against the exact original bytes (via `git show`/`od`) before being replaced with correct UTF-8 emoji, to avoid re-introducing corruption through a text-editing tool that displays multi-byte characters ambiguously.

## Risks / Trade-offs

- [Risk] A slot with supervision active but no regular break configured (`brk` is falsy) has no natural default start time other than the lesson's end time, which is used as the fallback regardless. → Mitigation: this matches the pre-existing assumption that supervision conceptually happens around the break; the teacher can always set an explicit start time via the new fields if this default doesn't apply.
- [Risk] Existing saved cells with `breakSupervision: true` and no supervision start/duration will now render a time-qualified indicator ("🏃 Välkkävalvonta HH:MM (Xmin)") where previously it was a plain label with no time. → Mitigation: this is an intentional, backward-compatible enhancement (the shown time is derived, not stored, until the teacher explicitly overrides it), consistent with the proposal's intent.
