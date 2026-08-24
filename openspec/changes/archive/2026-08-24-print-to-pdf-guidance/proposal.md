## Why

Käyttäjä haluaa lähettää viikkosuunnitelman muistiinpanoineen sähköpostin liitteenä PDF-tiedostona. Tulostusnappi on olemassa mutta ei ohjaa käyttäjää tallentamaan PDF:nä selaimen tulostusikkunassa — käyttäjä ei välttämättä tiedä valita "Tallenna PDF:nä" kohteen sijasta tulostinta.

## What Changes

- Tulostusnappi (🖨️) nimetään uudelleen ja sen tooltip tai ohjeviestiä parannetaan PDF-tallennusta varten
- Nappia klikkaamalla aukeaa lyhyt ohjeteksti ennen tulostusikkunaa (esim. tooltip tai pieni inforuutu): "Valitse kohteeksi 'Tallenna PDF:nä' tallentaaksesi tiedoston"
- Vaihtoehto: nappi muutetaan muotoon "🖨️ Tulosta / 📥 PDF" jolloin aikomus on selkeämpi

## Capabilities

### New Capabilities

_(ei uusia capabilities-kokonaisuuksia)_

### Modified Capabilities

- `week-planner`: Tulostustoiminnon käyttöliittymä laajenee ohjaamaan käyttäjää PDF-tallennukseen

## Impact

- `public/index.html` — ainoa muutoskohde
- Ei muutoksia tallennusformaattiin, dataan tai kirjastoihin
- Ei ulkoisia riippuvuuksia
