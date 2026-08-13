# Guide-data

Den här mappen används för felsökningsinnehållet i ETCS Första Hjälpen.

Målet är att stegvis dela upp den tidigare stora `js/guide.js` i mindre logiska delar utan att förändra hur guiden fungerar för användaren.

Planerad struktur:

- `start.js` – startsida och snabbval
- `startup.js` – uppstart och ATP
- `dmi.js` – DMI-relaterade steg och varningar
- `brake.js` – bromstest och bromsrelaterad felsökning
- `rbc.js` – RBC/radio/GSM-R
- `levels.js` – nivå 0, 1, 2 och NTC

Filer flyttas hit stegvis och varje förändring ska kontrolleras med:

    py scripts/validate-guide.py

samt testas lokalt med:

    py scripts/dev-server.py
