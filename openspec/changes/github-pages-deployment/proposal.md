## Why

Sovellus toimii tällä hetkellä vain paikallisesti (`localhost`), joten sitä ei voi käyttää muilla koneilla eikä jakaa kollegoille ilman teknistä asennusta. GitHub Pages mahdollistaa julkaisun ilmaisen pysyvän URL:n kautta.

## What Changes

- Kansio `public/` nimetään uudelleen `docs/`:ksi — GitHub Pages julkaisee automaattisesti `/docs`-kansiosta
- `package.json` kehityspalvelimen komento päivitetään viittaamaan `docs/`-kansioon
- GitHub-repositorion Pages-asetus aktivoidaan (manuaalisesti GitHub-käyttöliittymässä)

Sovelluksen toiminnallisuus tai käyttöliittymä ei muutu mitenkään.

## Capabilities

### New Capabilities

_(ei uusia capabilities-kokonaisuuksia — muutos on puhtaasti infrastruktuuri)_

### Modified Capabilities

_(ei muutoksia sovellusvaatimuksiin — `skip_specs: true` asetettu `.openspec.yaml`-tiedostossa)_

## Impact

- `public/` → `docs/` (kansion uudelleennimeäminen)
- `package.json` → `"start"` -skripti
- GitHub repository Settings → Pages (manuaalinen askel)
- Tuleva URL: `https://mikkomuhonen.github.io/ClassPlanner/`
