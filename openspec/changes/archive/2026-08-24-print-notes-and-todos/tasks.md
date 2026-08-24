## 1. Print CSS updates

- [x] 1.1 Add `print-color-adjust: exact` alongside the existing `-webkit-print-color-adjust: exact` rule in `@media print`; verify the rule is present for both properties
- [x] 1.2 Add `@media print` rule to hide action UI: `.note-del`, `#addNoteBtn`, `.notes-color-btns`, `#addTodoBtn`, `.todo-del`; verify these elements are absent in print preview
- [x] 1.3 Add `@media print` rule: `body:not(.print-has-notes) #notesArea { display: none !important; }` and `body.print-has-notes #notesArea { display: block; }`; verify `#notesArea` is hidden when `print-has-notes` is absent
- [x] 1.4 Add `@media print` rule: `#notesArea { page-break-before: always; }`; verify the notes section starts on a new page in print preview when shown
- [x] 1.5 Add `.note-print-text` CSS: visible in print, same font/size as the textarea; add `@media print { .note-card textarea { display: none; } .note-print-text { display: block; } }`; verify the rule compiles without error

## 2. Print wrapper function

- [x] 2.1 Replace the `window.print()` call in the print button event listener with a call to a new `printPage()` function; verify the print button still triggers the browser print dialog
- [x] 2.2 Implement `beforePrint()`: for each `.note-card textarea`, create a `<div class="note-print-text">` with `textarea.value`, insert it after the textarea; verify injected divs appear in the DOM before `window.print()` is called
- [x] 2.3 Implement `afterPrint()`: remove all `.note-print-text` elements and remove `print-has-notes` from `body`; verify no `.note-print-text` elements remain in the DOM after `afterPrint()` runs
- [x] 2.4 In `printPage()`: call `beforePrint()`, add `print-has-notes` to `body` when `notes.length > 0 || todos.length > 0`, call `window.print()`, then call `afterPrint()`; verify class is added when content exists and absent when it doesn't
- [x] 2.5 Wire `window.addEventListener('focus', afterPrint)` as a fallback cleanup; verify that `afterPrint()` running twice is safe (idempotent — removing non-existent elements does not throw)

## 3. Verification

- [x] 3.1 With no notes and no todos: activate print and verify `#notesArea` does not appear in print preview
- [x] 3.2 With at least one note: activate print and verify the note card appears on a second page with its background color and full text content visible
- [x] 3.3 With at least one todo: activate print and verify all todos appear with correct checkbox state and no delete/add buttons visible
- [x] 3.4 After closing print dialog: verify `.note-print-text` elements are gone from the DOM and `body` no longer has `print-has-notes`
