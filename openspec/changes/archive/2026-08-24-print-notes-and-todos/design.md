## Context

The application is a single HTML file. The existing print flow is a plain `window.print()` call wired to the print button. `#notesArea` is currently in the `@media print` hidden list. Notes use `<textarea>` elements for input; to-do items use `<input type="checkbox">` and `<input type="text">`.

## Goals / Non-Goals

**Goals:**
- Show notes and todos on a second print page when content exists
- Preserve note card background colors in print
- Guarantee note text renders in print (textarea workaround)
- Hide action-only UI from print (delete buttons, add buttons, color pickers)

**Non-Goals:**
- Separate "Print notes" button
- Changing the existing grid print layout
- Printing notes from previous weeks (only current session notes print)

## Decisions

### 1. Textarea → div before print, restore after

`<textarea>` rendering in print is browser-dependent. Before calling `window.print()`, iterate all note card textareas and inject a sibling `<div class="note-print-text">` with the same text content. After `window.print()` returns, remove the injected divs.

```
beforePrint():
  for each .note-card textarea:
    create <div class="note-print-text">textarea.value</div>
    insert after textarea

afterPrint():
  remove all .note-print-text elements
```

`@media print` hides textareas inside `.note-card` and shows `.note-print-text`.

### 2. Conditional second page via body class

Before `window.print()`, check `notes.length > 0 || todos.length > 0`. If true, add `body.classList.add('print-has-notes')`. Remove the class in `afterPrint()`.

`@media print` shows `#notesArea` only when `body.print-has-notes` is present:

```css
@media print {
  body:not(.print-has-notes) #notesArea { display: none !important; }
  body.print-has-notes #notesArea { display: block; }
}
```

### 3. Page break between grid and notes

```css
@media print {
  #notesArea { page-break-before: always; }
}
```

### 4. Hide action UI in print

```css
@media print {
  .note-del, #addNoteBtn, .notes-color-btns,
  #addTodoBtn, .todo-del { display: none !important; }
}
```

### 5. Note card layout in print

Screen layout uses `display: flex; flex-wrap: wrap` with fixed 160px card width. In print this is fine — cards flow naturally across the page. Color is preserved via the existing `-webkit-print-color-adjust: exact` rule already in `@media print`.

### 6. To-do checkboxes in print

`<input type="checkbox">` prints natively in Chrome with correct checked state. No special handling needed.

## Risks / Trade-offs

- **`afterPrint` timing:** `window.onafterprint` fires reliably in Chrome/Edge but may not fire if the user dismisses the print dialog quickly. Mitigation: also clean up in the next `window.onfocus` event as a fallback.
- **Colors in non-Chrome browsers:** `-webkit-print-color-adjust: exact` is already in place. Firefox needs `print-color-adjust: exact` as well — add both for completeness.

## Migration Plan

No data migration. The change is purely presentational — existing notes/todos are unaffected. The print button's `onclick` is replaced with a wrapper function; the old `window.print()` call is removed.
