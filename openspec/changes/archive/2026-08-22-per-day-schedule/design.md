## Context

See proposal.md for motivation. All code is in `public/index.html`. Currently the app has a single shared `schedule` array (lessons and breaks interleaved) and a `recalc()` function that recomputes absolute start/end times from a fixed 08:00 base. Per-day rhythms shift all times uniformly via `slotTimeForDay()`. There is no mechanism to configure breaks per day or to record an override time for a specific lesson slot.

## Goals / Non-Goals

**Goals:**
- Replace shared `schedule` with `dayBreaks[5]`: five independent arrays of `{afterLesson, duration}` break configs
- Keep the grid as a 7-row table (no structural layout change)
- Popup gains editable start/end time `<input type="time">` fields; override stored in `weekData`
- Backward-compatible migration from legacy `config.json`

**Non-Goals:**
- Variable lesson count per day (always 7)
- Per-lesson duration override (lessons always 45 min)
- Multi-week break config history

## Decisions

### D1: Remove `schedule` array; replace with `dayBreaks[5]` + constant `LESSON_COUNT`
`dayBreaks[d]` = `[{afterLesson: number, duration: number}]` — zero or more break entries per day.  
Lesson timing: `computeDaySlotTime(dayIdx, slotIdx)` sums 45 min per lesson + break durations before `slotIdx` from `dayBreaks[dayIdx]`, added to `rhythms[dayRhythms[dayIdx]].startMinutes`.

**Rationale:** Eliminates the interleaved lesson/break array model that required `recalc()` every time a break changed, and unblocks per-day variance.

**Removes:** `schedule`, `recalc()`, `lessonSlots()`, `slotTimeForDay()`, break rows in `renderGrid()`.

### D2: Break rows become cell-bottom indicators
Each lesson cell checks `dayBreaks[d].find(b => b.afterLesson === li)`. If found, a `<div class="cell-break">` badge is appended showing the duration. No table rows used for breaks.

**Rationale:** Table rows spanning 1 of 5 columns are not supported in HTML without `colspan` tricks. Cell-internal indicators are simpler and align with the existing inline content model.

### D3: Välitauot editor — horizontal timeline per day
In edit mode, a new `#breaksSection` panel below `#rhythmsSection` renders one row per day. Each row is a flex container: `T1 [+] T2 [+15min ×] T3 [+] ...` where `[+]` adds a break after that slot and `[15min ×]` shows an existing break with duration controls and delete.

**Rationale:** Compact visual overview. Each day's breaks visible at once without scrolling through the grid.

### D4: Time override stored in weekData per slot
`weekData[key][day][slotIdx].startOverride` and `.endOverride` (optional, minutes from midnight). `getCellTime(dayIdx, slotIdx, weekKey)` returns override if present, else `computeDaySlotTime`. The popup pre-fills time inputs with `getCellTime`; on close, if values differ from computed, stores them; if equal, clears override. "Palauta oletusaika" button explicitly clears both fields.

**Rationale:** Override is week-scoped (saved in `viikko_*.json`), not config-scoped, since it represents an actual event, not a structural preference.

### D5: Migration from legacy `config.json`
`loadConfig()` checks for `dayBreaks`; if absent but `schedule` present, extracts breaks from `schedule` (entries with `type === 'break'`) into a shared structure, then copies it to all 5 days. If neither exists, initialises with default breaks (15 min after every lesson except last).

## Risks / Trade-offs

- **All tasks done but break editor is more visual** → The timeline editor (D3) is the most complex UI piece. If it becomes unwieldy, a simpler list-per-day fallback still satisfies the spec.
- **Grid cells grow with break badges** → Break badges add height to cells with breaks. Cells without breaks remain compact. Rows stay aligned (HTML table behaviour). No mitigation needed.
- **Override survives rhythm change** → If the teacher changes a rhythm after setting an override, the override time remains. This is intentional: the override represents what actually happened, not what the schedule would compute.

## Migration Plan

1. `loadConfig()` migrates `schedule` → `dayBreaks` transparently on first load with new code.
2. `saveConfig()` writes only `dayBreaks` (no `schedule`). Old code reading `schedule` will see an absent field and fall back (backward compat not required since app is local, single-user).
3. No server-side migration needed.
