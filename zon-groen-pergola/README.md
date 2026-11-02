# Zon-groen pergola – 3D-rondleiding

Interactieve 3D-film en verkenmodus (HAN, Nijmegen). Alle inhoud komt uit het document "Zon-groen pergola – concept".

## Op GitHub Pages zetten
1. Maak een nieuwe repository op github.com (bijv. `zon-groen-pergola`).
2. Upload de **inhoud** van deze map (index.html, de mappen en bestanden, niet de zipmap zelf) naar de repository.
3. Ga naar Settings → Pages → Branch: `main`, map `/ (root)` → Save.
4. Na een minuut staat de site op `https://<jouw-gebruikersnaam>.github.io/zon-groen-pergola/`.

## Bestanden
- `index.html` – de pagina
- `pergola-film.js` – 3D-scène, film en bolletjes
- `three.min.js` – Three.js r147
- `support.js` – runtime van de pagina
- `vo_aac.mp4`, `vo_opus.webm` – voice-over van de film
- `pa/` – voice-over per informatiebolletje (mp4 + webm)

Opmerking: de site moet via een webserver (zoals GitHub Pages) draaien, niet door index.html te dubbelklikken. Lokaal testen kan met `python3 -m http.server`.
Lettertypen komen van Google Fonts (internet nodig).
