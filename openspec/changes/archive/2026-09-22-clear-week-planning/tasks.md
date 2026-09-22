## 1. Clear all cells (current week)

- [x] 1.1 Add "🗑 Tyhjennä kaikki solut" button to the Välitauot editor panel, below the day-copy row, and verify it renders in edit mode
- [x] 1.2 Implement click handler: detect whether the current week has any day with lesson-slot data and verify it shows "Ei tyhjennettävää sisältöä" feedback (no confirm dialog) when there is none
- [x] 1.3 Implement clearing by deleting only the known day-abbreviation keys from `weekData[key]` (preserving `notes`/`todos`) after user confirms, and verify notes/todos remain in the UI after clearing
- [x] 1.4 Set `dirty = true` and re-render the grid after clearing, and verify all lesson cells for the current week show as empty immediately
- [x] 1.5 Verify other weeks' `weekData` entries are unaffected by switching to another week and confirming their content is intact

## 2. Clear all breaks and default lunches (all weekdays)

- [x] 2.1 Add "🗑 Tyhjennä viikon välitauot ja ruokailut" button to the Välitauot editor panel, below the clear-all-cells button, and verify it renders in edit mode
- [x] 2.2 Implement click handler: detect whether any weekday has break entries or a default lunch configured, and verify it shows "Ei tyhjennettävää" feedback (no confirm dialog) when none exist
- [x] 2.3 Show a confirmation dialog that explicitly states the action affects all weeks, and verify cancelling leaves `dayBreaks`/`dayLunch` unchanged
- [x] 2.4 On confirm, reset `dayBreaks[d] = []` and `dayLunch[d] = null` for all five weekdays, set `dirty = true`, and re-render the breaks editor and grid; verify all day rows show no break/lunch entries and all "+"/add-lunch controls reappear
- [x] 2.5 Verify persistence: exit edit mode (triggers `saveConfig()`) and reload the app, confirming breaks and default lunches remain cleared for every weekday
