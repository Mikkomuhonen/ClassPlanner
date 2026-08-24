## 1. Button label

- [x] 1.1 Change the print button text in the HTML from `"🖨️ Tulosta"` to `"🖨️ Tulosta / PDF"`; verify the updated label is visible in the toolbar

## 2. PDF toast

- [x] 2.1 Add CSS for `#pdfToast`: yellow background (`#fef9c3`), border (`1px solid #fde047`), dark amber text (`#713f12`), small font (`0.82em`), centered padding (`6px 16px`), full width; verify the style rule is present; also add `#pdfToast { display: none; }` to `@media print` so it never appears in the printed output
- [x] 2.2 Add a `showPdfToast()` function that: checks if `#pdfToast` already exists (skip if so), creates a `<div id="pdfToast">` with the guidance text `'💡 Valitse kohteeksi "Tallenna PDF:nä" tallentaaksesi tiedostoksi'`, inserts it before `<main>`, and removes it after 4 seconds; verify that calling the function inserts the element into the DOM
- [x] 2.3 In `printPage()`, call `showPdfToast()` before calling `beforePrint()`; verify the toast element is present in the DOM immediately after `printPage()` is called (before `window.print()` runs)
