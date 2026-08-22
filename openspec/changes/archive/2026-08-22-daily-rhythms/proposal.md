## Why

Opettajalla on 4 erilaista päivärytmiä, joissa oppituntien aloitusaika vaihtelee. Nykyinen sovellus käyttää yhtä kiinteää aloitusaikaa (08:00) kaikille päiville, eikä rytmejä voi määritellä tai vaihtaa. Lisäksi tunnin soluissa näkyy tällä hetkellä vain yksi tekstirivi — opettaja ei voi tarkastella koko viikon suunnitelmaa yhdellä silmäyksellä ilman klikkailua, eikä tulostus näytä kaikkea sisältöä.

## What Changes

- Lisätään `rhythms`-tietorakenne: nimetyt päivärytmit, joista jokaisella on oma aloitusaika
- Lisätään päiväkohtainen rytminvalinta: käyttäjä voi valita kullekin viikonpäivälle oman rytmin
- Muokkausnäkymään uusi "Päivärytmit"-paneeli, jossa rytmit luodaan, nimetään ja poistetaan
- Viikkoruudukon sarakeotsikoissa näkyy kullekin päivälle valittu rytmi; kellonaika näkyy popupissa
- `config.json` laajenee sisältämään `rhythms`-taulukon ja `dayRhythms`-arvoihin
- Tunnin solut näyttävät koko sisällön ilman katkaisua: kaikki osallistujat ja koko teksti ovat näkyvissä suunnitelmapohjassa ilman erikseen avaamista; solun korkeus skaalautuu sisällön mukaan
- Tulostus näyttää soluissa olevan koko tekstin (poistetaan yhden rivin katkaisu)

**BREAKING**: Nykyinen `schedule`-rakenne (absoluuttiset minuutit kiinteästä 08:00-aloituksesta) muutetaan offset-pohjaiseksi (minuutit päivän alusta), jotta rytmit voivat jakaa saman perusrakenteen.

## Capabilities

### New Capabilities

- `daily-rhythm`: Päivärytmien hallinta — rytmien luonti, nimeäminen, aloitusajan asetus sekä rytmin liittäminen viikonpäivään.

### Modified Capabilities

- `week-planner`: Viikkoruudukko laajenee tukemaan päiväkohtaisia rytmejä. Sarakeotsikot näyttävät valitun rytmin, ja tunnin popup laskee kellonajan päivän rytmin aloitusajan perusteella. Lisäksi solujen sisältö (osallistujat + teksti) näkyy kokonaan ilman katkaisua — solun korkeus mukautuu sisältöön sekä selaimessa että tulosteessa.

## Impact

- `public/index.html` — kaikki muutokset tähän tiedostoon:
  - Uusi `rhythms`-tila ja `dayRhythms`-taulukko
  - `recalc(startMinutes)`-parametrisointi
  - Ruudukon sarakeotsikoihin rytmiSelector (edit-tilassa dropdown, normaalitilassa label)
  - "Päivärytmit"-paneeli edit-tilaan
  - Popup-otsikko käyttää päivän rytmin aloitusaikaa
- `config.json` (tallennusformaatti) — lisätään `rhythms` ja `dayRhythms`
