## Context

All code in `public/index.html`. `defaultDayBreaks()` currently returns 6 breaks per day. Break objects are `{afterLesson, duration}`. `renderBreaksEditor()` renders a timeline with `[+]` (add break) and `[×]` (delete) per position. `renderGrid()` renders `cell-break` indicators from `dayBreaks`.

## Goals / Non-Goals

**Goals:**
- Empty default break configuration
- `type: 'lunch'` on break objects; one lunch per day enforced
- Distinct cell indicator for lunch breaks
- `[🍽️]` button in break editor; hidden when lunch already exists for the day

**Non-Goals:**
- Changing lunch duration range from 15–30 (reuses existing inc/dec controls)
- Removing the popup-based `lunchStart` annotation (kept for clock time detail)

## Decisions

### D1: `type` field on break object
Add optional `type?: 'lunch'` to `{afterLesson, duration}`. No other types needed. Absence of `type` means regular break.

### D2: Enforce one lunch per day in `renderBreaksEditor()`
`const hasLunch = (dayBreaks[d] || []).some(b => b.type === 'lunch')`. If `hasLunch`, skip rendering `[🍽️]` buttons for that day.

### D3: Lunch indicator in cell
Check `brk.type === 'lunch'` in `renderGrid()`. If true, use `cell-lunch-break` class and text `🍽️ Ruokailu ${brk.duration}min` instead of `░ ${brk.duration} min ░`.

### D4: `defaultDayBreaks()` returns empty arrays
`return Array.from({ length: 5 }, () => [])`. Migration: existing `config.json` with the old 6-break default will load the saved value; only new/reset configs start empty.
