## 1. Toolbar-nappi

- [x] 1.1 Lisää `<button id="restoreBtn">` toolbar-HTML:ään (piilotettu oletuksena `display:none`), ja tyylit olemassa olevien toolbar-nappien mukaisesti; tarkista että nappi näkyy oikein Chrome-developertyökaluilla muuttamalla display manuaalisesti
- [x] 1.2 Lisää `restoreBtn`-referenssi JS-koodiin ja click-handler joka kutsuu `tryRestoreHandle()`; tarkista että klikkaus käynnistää funktion (console.log tai debuggeri)

## 2. Kansion palautuslogiikka

- [x] 2.1 Muokkaa `tryRestoreHandle()` siten että se ei enää kutsu `requestPermission()` automaattisesti sivun latauksen yhteydessä – siirretään kutsu napin click-handleriin; tarkista ettei konsolissa näy lupavirhettä sivun latauksessa
- [x] 2.2 Lisää `checkForStoredHandle()` -funktio joka kutsutaan sivun latautuessa: lukee handlein IndexedDB:stä ja jos löytyy, näyttää restore-napin kansion nimellä ("↩ Jatka: [nimi]"); tarkista että nappi ilmestyy kun IndexedDB:ssä on handle
- [x] 2.3 Varmista että restore-nappi piilotetaan kun `requestPermission` ei myönnä lupaa tai handle on vanhentunut; tarkista selaimessa kieltämällä lupa

## 3. Integraatiotestaus

- [x] 3.1 Valitse kansio → tallenna viikko → lataa sivu uudelleen → restore-nappi näkyy → klikkaa → kansio palautuu ja viikon data latautuu; tarkista koko flow selaimessa
