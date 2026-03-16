# Changelog – ETCS Första Hjälpen

Alla noterade förändringar i projektet. Formatet följer SemVer (MAJOR.MINOR.PATCH).

## [1.5.1] – 2026-03-16

### Changed

- Temporärt dolt ej implementerade val i körningsflödet (DMI-varningar och bromsgren) för enklare test och renare UI.

## [1.5.0] – 2026-03-13

### Changed

- Global Back-navigation införts som enda återgångsfunktion.
- Samtliga lokala `Tillbaka`-val borttagna ur guide.js.
- guide.js strukturerat om för enhetlighet och framtida expansion.

### Fixed

- Rättat syntaxfel och målreferenser i guide.js.
- Förhindrat duplicerade åter-knappar i gränssnittet.

## [1.4.0] – 2026-03-13

### Added

- Ny gren i felsökningen: _Tåget bromsar oväntat_.
- Nytt steg: _Direkt när jag börjar köra_.
- Ny fråga: _Visas meddelandet 'Rullningsvakt aktiverad'?_
- Ny informationsnod om att felet inte är stoppande och när felanmälan ska göras.

### Changed

- Förbättrad struktur för felsökning under körning.
- Förtydligad logik och text i bromsnoder.

### Fixed

- Förbättrade formuleringar och klarspråk för användaren.

## [1.3.0] – 2026-03-13

### Added

- Dynamisk breadcrumbs (2 steg på mobil, 3 på desktop).

### Changed

- Ny förbättrad engine.js med tydligare struktur.
- Justerat UI för bättre mobilanpassning.

### Fixed

- Mindre justeringar i HTML för hjälp-knapp och hjälp-ruta.
- Rättat stavfel "Förareidnetiet" -> "Föraridentitet"

## [1.2.0] – 2026-03-12

### Added

- Breadcrumbs (automatisk stigvisning baserat på navigation).
- "Start"-knapp för snabb återgång till huvudmenyn.

### Changed

- Uppdaterad och responsiv style.css (mobil, surfplatta, förbättrade knappar).
- Förbättrad layoutstruktur och spacing i main‑sektionen.

### Fixed

- Justerad navigationslogik i engine.js för att stödja start-knapp och breadcrumbs.

## [1.1.0] – 2026-03-12

### Added

- Standardiserad `guide.js` med konsekventa fält för alla steg (title, text, image, choices).
- Möjlighet att visa version och datum i footern via version.json.
- Automatisk versionladdning via version.js.

### Changed

- Förbättrad index.html: semantisk struktur, korrekt footer, viewport-metatag, städning.
- Förbättrad engine.js: fixad back-funktion, robust felhantering, korrekt bildstöd.

### Fixed

- Trasiga steg-ID i guide.js (felstavningar, saknade mål, dubletter).
- Fel typ i `level_ntc_start_of_mission.title` (array → sträng).
- Små stavfel och logiska inkonsekvenser i flödena.

## [1.0.0] – 2026-03-09

### Added

- Första fungerande versionen av felsökningsverktyget.
- Grundläggande HTML/CSS/JS-struktur.
- Initial felsökningsguide med enkla steg.
