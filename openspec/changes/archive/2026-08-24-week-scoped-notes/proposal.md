## Why

Muistiinpanot ja tehtävälista ovat tällä hetkellä globaaleja — ne eivät vaihdu viikolta toiselle navigoidessa. Opettaja tekee viikkokohtaisia muistiinpanoja, joten ne kuuluvat kyseisen viikon tietoihin.

## What Changes

- Muistiinpanot (`notes`) ja tehtävälista (`todos`) siirretään pois globaalista `localStorage`-tallennuksesta viikkokohtaiseen `weekData`-rakenteeseen
- Muistiinpanot tallennetaan osana `viikko_YYYY_WNN.json`-tiedostoa samalla 💾-napilla kuin tuntidatakin
- Muistiinpanot ladataan samalla `📂 Avaa viikko` -toiminnolla kuin tuntidatakin
- Kun käyttäjä navigoi viikolta toiselle, muistiinpanot ja tehtävälista vaihtuvat sen viikon tietoihin
- **BREAKING**: Aiemmin globaalissa `localStorage`-muistissa (`cp_notes`, `cp_todos`) olevat muistiinpanot eivät siirry automaattisesti — ne hylätään
- Pohja-toiminto (`📋 Pohja`) voi sisältää muistiinpanot pohjana (toteutusyksityiskohta, ei pakollinen)

## Capabilities

### New Capabilities

_(ei uusia capabilities-kokonaisuuksia)_

### Modified Capabilities

- `week-planner`: Muistiinpanojen ja tehtävälistan tallennuslogiikka sekä lataus- ja navigointikäyttäytyminen muuttuvat; ne ovat nyt viikkokohtaisia

## Impact

- `public/index.html` — ainoa muutoskohde
- `localStorage`-avaimet `cp_notes` ja `cp_todos` poistuvat käytöstä
- `viikko_YYYY_WNN.json` -tiedostorakenne laajenee kentillä `notes` ja `todos`
- `saveWeek()` ja `loadWeek()` päivitetään sisältämään muistiinpanot
- `navigate()` renderöi muistiinpanot uudelleen viikon vaihdon yhteydessä
