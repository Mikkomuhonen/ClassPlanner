## Context

`tryRestoreHandle()` kutsutaan `window.addEventListener('load', ...)` -kohdassa ilman käyttäjägestuuria. File System Access API:n `requestPermission()` vaatii gesturin – ilman sitä Chrome palauttaa `'prompt'` eikä `'granted'`, jolloin `dirHandle` jää null:ksi.

## Goals / Non-Goals

**Goals:**
- Kansio palautuu edellisestä istunnosta napin klikkauksella
- Automaattinen (gestuuriton) palautusyritys poistetaan

**Non-Goals:**
- Ei muuteta tiedostojen tallennuksen tai latauksen logiikkaa
- Ei lisätä muita IndexedDB-ominaisuuksia

## Decisions

**Restore-nappi työkalupalkkiin** (vaihtoehto: erillinen banner)

Kun sivun latautuessa IndexedDB:ssä on tallennettu kansiohandle, näytetään toolbar-rivillä `"↩ Jatka: [kansio]"` -nappi. Klikkaaminen kutsuu `tryRestoreHandle()`, joka nyt saa gesturin ja `requestPermission()` onnistuu.

Vaihtoehto (banner/modal) hylättiin: toolbar-nappi on vähemmän tunkeileva ja johdonmukainen olemassa olevien toolbar-kontrollien kanssa.

**`tryRestoreHandle()` ei enää kutsu itseään automaattisesti sivun ladatessa** – ainoastaan nappi käynnistää sen.

## Risks / Trade-offs

- [Käyttäjä ei huomaa nappia] → Nappi on näkyvä, mutta vaatii yhden ylimääräisen klikkauksen
- [IndexedDB-handle voi vanhentua] → `requestPermission` epäonnistuu armollisesti, nappi poistetaan näkyvistä
