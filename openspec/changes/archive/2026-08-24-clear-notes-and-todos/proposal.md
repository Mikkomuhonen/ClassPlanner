## Why

Muistiinpanojen ja tehtävälistan tyhjentäminen yksitellen on hidasta, kun kaikki sisältö halutaan poistaa kerralla esimerkiksi viikon vaihtuessa tai uutta viikkoa aloitettaessa.

## What Changes

- Muistiinpanojen otsikkoriville lisätään "🗑 Tyhjennä" -nappi
- Tehtävälistan otsikkoriville lisätään "🗑 Tyhjennä" -nappi
- Kumpikin nappi pyytää vahvistuksen (`confirm`-dialogi) ennen tyhjennystä
- Onnistuneen tyhjennyksen jälkeen otsikkoriville ilmestyy "↺ Kumoa" -nappi 5 sekunnin ajaksi, joka palauttaa sisällön
- Undo-tila on vain muistissa: sivun uudelleenlataus tai viikon vaihto poistaa kumousmahdollisuuden

## Capabilities

### New Capabilities

_(ei uusia capabilities-kokonaisuuksia)_

### Modified Capabilities

- `week-planner`: Muistiinpanopaneeliin ja tehtävälistaan lisätään tyhjennyskontrolli vahvistuksella ja kumousmahdollisuudella

## Impact

- `public/index.html` — ainoa muutoskohde
- Ei muutoksia tallennusformaattiin tai `weekData`-rakenteeseen
