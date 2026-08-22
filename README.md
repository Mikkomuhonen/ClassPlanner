# ClassPlanner — Viikkosuunnitelma

Selainpohjainen viikkosuunnitelmatyökalu opettajille. Toimii paikallisesti ilman internetyhteyttä tai asennuksia — käynnistät sen yhdellä komennolla ja tallennat tiedostot suoraan omalle koneellesi.

---

## Ominaisuudet

**Viikkoruudukko** — Ma–Pe -sarakkeet, 7 oppituntiriviä (T1–T7). Jokaisen tunnin aika ja sisältö näkyy suoraan solussa ilman erikseen avaamista.

**Päivärytmit** — Jokaiselle viikonpäivälle voidaan asettaa oma aloitusaika (esim. Ma 08:00, Ti 09:00). Rytmit hallitaan muokkaustilassa.

**Välitauot** — Välkät asetetaan per päivä — eri päivillä voi olla erilaiset välkkarakenteet. Aikayli-kirjaus: yksittäisen tunnin aika voidaan merkitä poikkeavaksi. Kellonajat kaskadoituvat automaattisesti.

**Osallistujat** — Osallistujarekisteri ryhmillä ja nimillä. Klikkaa nimiä valitaksesi tunnille; koko ryhmän voi lisätä kerralla.

**Kopiointi ja peruutus** — Kopioi yhden päivän asetukset toiselle tai kaikille päiville. Kumoa-painike palauttaa edellisen tilan.

**Ruokailumerkintä** — Merkitse ruokailun alkuaika ja kesto oppitunnin sisällä. Näkyy solussa oranssina merkintänä 🍽️.

**Tallennus** — Tallentaa `config.json` ja `viikko_YYYY_WNN.json` valitsemaasi kansioon. Kansio muistetaan sivulatauksien välillä (IndexedDB). OneDrive-kansioita ei suositella.

**Tulostus** — A4 vaaka, koko sisältö näkyy tulosteessa ilman UI-elementtejä.

---

## Vaatimukset

- **Node.js v18+**: https://nodejs.org/
- **Selain**: Chrome tai Edge (File System Access API vaaditaan)

---

## Käynnistys

```powershell
npm start
```

Avaa selaimessa: **http://localhost:3000**

---

## Ensimmäinen käyttökerta

1. Klikkaa **📁 Valitse kansio** ja valitse kansio johon tiedostot tallentuvat
2. Klikkaa **✏️ Muokkaa rakennetta** ja lisää ryhmät, nimet, välkät ja rytmit
3. Klikkaa **✓ Valmis** — rakenne tallentuu `config.json`-tiedostoon
4. Klikkaa oppituntisolua ja merkitse osallistujat ja tunnin sisältö
5. Klikkaa **💾 Tallenna** — viikkodata tallentuu `viikko_2026_WNN.json`

---

## Projektirakenne

```
ClassPlanner/
├── public/index.html   ← Koko sovellus (HTML + CSS + JS, ei buildtooleja)
├── package.json        ← npm start käynnistää: npx serve public
├── openspec/           ← Kehitysdokumentaatio (muutokset ja speksit)
└── README.md           ← Tämä tiedosto
```

---

## Kehitys

Projekti käyttää [OpenSpec](https://github.com/fission-ai/openspec)-työnkulkua muutosten suunnitteluun ja dokumentointiin.

```powershell
npm install -g @fission-ai/openspec@latest
openspec --version
```
