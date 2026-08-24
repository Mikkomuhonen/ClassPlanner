## Why

Oppituntisoluihin ei voi merkitä oppiainetta, jolloin viikkosuunnitelmasta puuttuu keskeinen tieto siitä, mitä tunnilla opiskellaan. Oppiainetunnus tekee suunnitelmasta nopeammin luettavan ja mahdollistaa värikoodatun viikkonäkymän.

## What Changes

- Lisätään `subject-registry` — oppiainerekisteri, jossa jokaisella aineella on lyhennys (2–3 merkkiä), koko nimi ja väri
- Oppituntisoluun voi valita yhden tai useamman oppiaineen rekisteristä
- Uuden oppiaineen voi luoda lennosta suoraan tuntipohjasta kirjoittamalla lyhenteen
- Solussa oppiaineet näkyvät värikoodattuina badgeina aikaviivan yhteydessä, isommalla fontilla kuin osallistujat
- Oppiainerekisterin hallinta (lisäys, poisto, järjestys, värin valinta) sijaitsee muokkaustilassa
- Oppiainekoodit tallennetaan `cell.subjects[]`-arrayna viikkodataan

## Capabilities

### New Capabilities

- `subject-registry`: Oppiainerekisterin hallinta — koodit, nimet, värit, järjestys; lennosta luominen popup-näkymästä

### Modified Capabilities

- `week-planner`: Solun tietomalli laajenee (`subjects[]`-kenttä), popup saa oppiaineen valinnan osion, solussa renderöidään oppiainebadget

## Impact

- `public/index.html` — ainoa muutoskohde (koko sovellus on yhdessä tiedostossa)
- `localStorage` — uusi avain oppiainerekisterille
- Viikkodata (`viikko_YYYY_WNN.json`) — `cell.subjects[]` on uusi valinnainen kenttä; taaksepäin yhteensopiva
