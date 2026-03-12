# Release-checklista – ETCS Första Hjälpen

Använd denna lista varje gång du ska höja versionen i version.json
och släppa en ny officiell version.

---

## ✔️ 1. Testa huvudflödena

Gå igenom följande manuellt:

- Start → Uppstartsproblem → DMI-svart → DMI-brytare (båda vägarna)
- Start → Uppstartsproblem → DMI visar menyer → Förareidentitet → Bromstest (alla tre val)
- Alla nivåval (0, 1, 2, NTC) hela vägen fram till “Startproceduren är nu klar”
- Kontrollera att Back-knappen fungerar i varje del av flödet

---

## ✔️ 2. Validera guide.js

(Om validate.js är aktiverat:)

- Öppna DevTools → Console
- Kontrollera att inga varningar visas
- Om varningar finns → fixa innan release

---

## ✔️ 3. Koden ska vara städad

- Inga TODO-kommentarer kvar
- Inga console.log som inte är debug/viktiga
- Inga tillfälliga felmeddelanden

---

## ✔️ 4. Uppdatera version.json

- Höj versionen enligt SemVer-regler:
  - PATCH för småfixar
  - MINOR för ny funktionalitet (vanligast)
  - MAJOR för stora brytande ändringar
- Uppdatera buildDate till dagens datum (YYYY-MM-DD)

---

## ✔️ 5. Uppdatera CHANGELOG.md

Lägg till en ny sektion högst upp:

- Ny version
- Datum
- Added / Changed / Fixed / Removed

---

## ✔️ 6. Snabb UI-kontroll

- Footern visar korrekt version och datum
- Inget “—” visas i fall version.js inte laddas
- Layouten ser korrekt ut på mobil (smal skärm)

---

## ✔️ 7. Publicera

När allt ovan är gjort:

1. Ladda upp den nya versionen
2. Testa online-versionen (om du publicerar internt eller externt)
3. Markera releasen som klar i CHANGELOG

---

## ✔️ 8. (Valfritt) Tagga versionen i Git

Om du använder Git kan du tagga releasen:
