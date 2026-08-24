## Context

The print button currently triggers `printPage()` which calls `beforePrint()`, `window.print()`, and `afterPrint()`. The toolbar button is labelled "🖨️ Tulosta". There is no guidance about saving as PDF. The toolbar is a flex row with dark blue background; buttons are white ghost-style.

## Goals / Non-Goals

**Goals:**
- Rename the print button to signal that PDF saving is also possible
- Show a brief, non-blocking hint guiding the user to "Tallenna PDF:nä" before the print dialog opens
- Keep the implementation simple — no modal, no external library

**Non-Goals:**
- Automatically generating a PDF without the print dialog
- Adding a separate download button
- Changing the print layout or content

## Decisions

### 1. Button label

Change from `"🖨️ Tulosta"` to `"🖨️ Tulosta / PDF"`.

This communicates the dual purpose without requiring any help text.

### 2. Brief notification before the print dialog

`window.print()` is synchronous and blocks the tab until the dialog closes. A tooltip or modal shown *before* the call will be visible for the split second while the dialog is loading — but the dialog covers the page so the user may miss it.

Better approach: show a **small, timed toast** that appears for 3 seconds. It appears first, then the print dialog opens. The toast is still visible alongside or behind the dialog as a reminder.

```
[Valitse "Tallenna PDF:nä" kohteeksi jos haluat tallentaa tiedoston]
                              ← toast (3 s) →
                                              → window.print()
```

The toast appears at the bottom of the toolbar or top of the page (inside normal flow, above `main`). It is styled simply — small, yellow background, no close button.

### 3. Toast lifecycle

```js
function showPdfToast() {
  const toast = document.createElement('div');
  toast.id = 'pdfToast';
  toast.textContent = '💡 Valitse kohteeksi "Tallenna PDF:nä" tallentaaksesi tiedostoksi';
  // insert before main
  document.querySelector('main').before(toast);
  setTimeout(() => toast.remove(), 4000);
}
```

`printPage()` calls `showPdfToast()` then immediately `beforePrint()` + `window.print()`. After `window.print()` returns, `afterPrint()` runs and the toast auto-removes after 4 s regardless.

### 4. CSS

```css
#pdfToast {
  background: #fef9c3; border: 1px solid #fde047; color: #713f12;
  font-size: 0.82em; padding: 6px 16px; text-align: center;
}
```

No animation needed — simplest approach.

## Risks / Trade-offs

- **Print dialog timing**: On some systems the dialog opens almost instantly; the toast will be barely visible. On others there is a render delay and the toast is clearly seen. This is acceptable — the button label alone already communicates the PDF option.
- **Toast on repeated clicks**: If the user clicks print multiple times quickly, multiple toasts could stack. Mitigation: check for existing toast before creating a new one.
