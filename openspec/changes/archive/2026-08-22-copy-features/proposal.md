## Why

Setting up per-day break configurations and lesson slot content is time-consuming when multiple days share similar structure. The teacher needs to be able to copy a fully configured day's structural settings to another day, and copy a specific lesson slot's content to any target slot on any day.

## What Changes

- Add a "Kopioi päivän asetukset" form in the Välitauot editor (edit mode): source and target day dropdowns plus a copy button. Copies `dayBreaks` and `dayRhythms` from source to target.
- Add a "Kopioi tämä tunti" row in the lesson slot popup: target day dropdown, target lesson number dropdown (T1–T7), and a copy button. Copies participants, text, and time override to the selected target slot.

## Capabilities

### New Capabilities

_(none — see Modified Capabilities below)_

### Modified Capabilities

- `per-day-breaks`: Day settings copy — teacher can copy one day's break configuration and rhythm assignment to another day from the edit-mode breaks panel.
- `week-planner`: Lesson slot copy — teacher can copy one lesson slot's content (participants, text, time override) to any target slot on any day via the popup editor.

## Impact

- `public/index.html` — all changes here:
  - `renderBreaksEditor()`: add copy form row below day rows
  - Popup HTML: add copy row with day and lesson dropdowns plus button
  - New JS functions: `copyDaySettings(src, tgt)`, `copyLessonSlot(srcDay, srcSlot, tgtDay, tgtSlot, weekKey)`
  - No new state; no changes to persistence format
