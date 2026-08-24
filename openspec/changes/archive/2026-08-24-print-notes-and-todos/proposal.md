## Why

Muistiinpanot ja tehtävälista jäävät tällä hetkellä pois tulostuksesta kokonaan, vaikka opettajalla voi olla niihin kirjattuna viikkokohtaisia asioita, jotka olisi hyödyllinen saada paperille viikkoruudukon jatkoksi.

## What Changes

- Nykyinen 🖨️-nappi tulostaa muistiinpanot ja tehtävälistan viikkoruudukon jälkeen, mutta vain jos niissä on sisältöä
- Muistiinpanokortit tulostetaan sivun 2 alussa säilyttäen korttikohtaiset taustavärit
- Tehtävälistan kaikki tehtävät (sekä valmiit että avoimet) tulostetaan checkboxeineen
- Ennen `window.print()`-kutsua tekstialueiden (textarea) sisältö kopioidaan print-safe `<div>`-elementteihin, jotta teksti varmasti tulostuu
- Toimintaan liittymättömät UI-elementit (poistopainikkeet, lisäysnapit, värinvalintapainikkeet) piilotetaan tulostusnäkymässä

## Capabilities

### New Capabilities

_(ei uusia capabilities-kokonaisuuksia)_

### Modified Capabilities

- `week-planner`: Tulostustuki laajenee kattamaan muistiinpanot ja tehtävälistan; tulostuskäyttäytyminen muuttuu havaitun sisällön perusteella

## Impact

- `public/index.html` — ainoa muutoskohde
- `@media print` -säännöt päivitetään
- `window.print()` -kutsu korvataan funktiolla, joka valmistelee DOM:in ennen tulostusta ja siivoaa sen jälkeen
