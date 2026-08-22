## Context

All code in `public/index.html`. `dayBreaks[5]` and `dayRhythms[5]` hold the structural day config. Lesson slot content lives in `weekData[weekKey][dayAbbr][slotIdx]`. The popup opens via `openPopup(dayIdx, slotIdx)` and reads `popupState` on close.

## Goals / Non-Goals

**Goals:**
- Day copy form at the bottom of `#breaksSection` (edit mode)
- Lesson copy row inside the popup, with day and slot dropdowns

**Non-Goals:**
- Cross-week copying
- Undo functionality
- Copy multiple slots at once

## Decisions

### D1: Day copy — deep-clone breaks, copy rhythm index
`dayBreaks[tgt] = dayBreaks[src].map(b => ({...b}))` and `dayRhythms[tgt] = dayRhythms[src]`. Simple spread-clone avoids shared references.

### D2: Lesson copy — operate directly on weekData
`copyLessonSlot(srcDay, srcSlot, tgtDay, tgtSlot, weekKey)` reads the source slot object from `weekData`, deep-clones it (spread), and writes it to the target path. If the source slot is empty (no content), the copy writes an empty object (clearing the target). Re-renders grid without closing the popup.

### D3: Day copy form placement
Appended after the last day row in `renderBreaksEditor()`. Always visible in edit mode; does not require a separate section.

### D4: Lesson copy row placement
Added as a fixed bottom row in the popup (below the textarea). Uses the same `popup-time-row` styling pattern for visual consistency.
