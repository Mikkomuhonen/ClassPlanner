## 1. Kansion uudelleennimeäminen

- [ ] 1.1 Nimeä `public/`-kansio uudelleen `docs/`:ksi git-komennolla (`git mv public docs`); verifioi että `docs/index.html` on olemassa ja `public/`-kansiota ei enää ole
- [ ] 1.2 Päivitä `package.json` skripti: muuta `"start": "npx serve public"` → `"start": "npx serve docs"`; verifioi että `npm start` käynnistää palvelimen oikein `docs/`-kansiosta

## 2. Git-push

- [ ] 2.1 Lisää muutokset versionhallintaan (`git add -A`) ja tee commit (`git commit -m "chore: rename public to docs for GitHub Pages"`); verifioi commit näkyy `git log --oneline -1`
- [ ] 2.2 Pushaa muutokset GitHubiin (`git push origin main`); verifioi push onnistui

## 3. GitHub Pages -aktivointi (manuaalinen askel)

- [ ] 3.1 Avaa `github.com/Mikkomuhonen/ClassPlanner` → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main**, Folder: **/docs** → **Save**; verifioi että GitHub Pages -asetus tallennetaan ja sivun URL näkyy asetuksissa

## 4. Toimivuuden tarkistus

- [ ] 4.1 Odota ~1 minuutti ja avaa `https://mikkomuhonen.github.io/ClassPlanner/` selaimessa; verifioi että ClassPlanner latautuu ja **📁 Valitse kansio** -toiminto toimii (vaatii Chromen tai Edgen)
