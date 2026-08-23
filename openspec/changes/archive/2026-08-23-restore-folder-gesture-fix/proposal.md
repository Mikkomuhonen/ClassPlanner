## Why

Kun käyttäjä avaa sovelluksen uudelleen, kansion palautus IndexedDB:stä epäonnistuu hiljaisesti: `requestPermission()` vaatii käyttäjägestuuria, mutta `tryRestoreHandle()` kutsutaan sivun latauksen yhteydessä ilman sitä. Käyttäjä joutuu valitsemaan kansion joka kerta uudelleen.

## What Changes

- Poistetaan automaattinen `requestPermission()`-kutsu sivun latausvaiheessa
- Lisätään "↩ Jatka: [kansio]" -nappi työkalupalkkiin kun IndexedDB:ssä on tallennettu kansiohandle
- Napin klikkaus käynnistää `requestPermission()` käyttäjägestuureilla → lupa myönnetään, kansio palautuu

## Capabilities

### New Capabilities

_(ei uusia)_

### Modified Capabilities

- `week-planner`: Kansion palautus istuntojen välillä tapahtuu käyttäjän toimesta napin kautta, ei automaattisesti sivun latauksen yhteydessä

## Impact

- `public/index.html`: `tryRestoreHandle()`-logiikka ja toolbar-HTML
