## Why

Opettajalla ei ole käytettävissä paikallisesti toimivaa viikkosuunnitelmapohjaa, johon voi merkitä oppitunnit, osallistujat ja tunnin sisällön. Nykyinen `src/index.js` on pelkkä JS-luokka ilman käyttöliittymää. Nyt tarvitaan konkreettinen, selainpohjainen työkalu päivittäiseen käyttöön.

## What Changes

- Uusi `public/index.html` — koko sovellus yhdessä HTML-tiedostossa (HTML + CSS + Vanilla JS, ei buildtooleja)
- `package.json` `start`-skripti päivitetään käynnistämään paikallinen HTTP-palvelin (`npx serve public`), jotta File System Access API toimii `localhost`-kontekstissa
- Sovellus tallentaa kahteen tiedostoon käyttäjän valitsemaan kansioon:
  - `config.json` — päivän tuntirakenne (välkät) ja osallistujarekisteri (ryhmät + nimet)
  - `viikko_YYYY_WNN.json` — kunkin viikon suunnitelmadata

## Capabilities

### New Capabilities

- `week-planner`: Viikoittainen tuntisuunnitelmaruudukko (ma–pe, 08:00–15:00). Sisältää muokattavat välkät, tunnin solujen popup-muokkauksen (vapaa teksti), viikkonavigaation, tallennuksen File System Access API:lla sekä tulostustuen (`@media print`).
- `participant-registry`: Osallistujarekisterin hallinta. Opettaja voi luoda nimiä ja ryhmiä, joita klikataan tunnin soluun. Ryhmän pikavalinta korvaa aiemman valinnan. Rekisteriä muokataan saman sivun muokkaustilassa (edit mode toggle).

### Modified Capabilities

_(ei muutoksia olemassaoleviin spesifikaatioihin)_

## Impact

- `public/index.html` — uusi tiedosto, koko sovelluksen toteutus
- `package.json` — `start`-skriptin muutos (`node src/index.js` → `npx serve public`)
- `src/index.js` — ei muutoksia tässä vaiheessa
- Ei ulkoisia riippuvuuksia, ei build-prosessia
- Vaatii Chrome- tai Edge-selaimen (File System Access API)
