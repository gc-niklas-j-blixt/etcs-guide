// js/version.js
(function loadVersion() {
  const verEl = document.getElementById("app-version");
  const dateEl = document.getElementById("app-build-date");

  // Fallback-värden (används om version.json inte går att läsa)
  let fallback = { version: "1.1.0", buildDate: "2026-03-12" };

  // Försök läsa in data från version.json
  fetch("js/version.json")
    .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
    .then(({ version, buildDate }) => {
      verEl.textContent = version || fallback.version;
      dateEl.textContent = buildDate || fallback.buildDate;
    })
    .catch(() => {
      // Om fetch misslyckas (ex. file:// i vissa webbläsare)
      verEl.textContent = fallback.version;
      dateEl.textContent = fallback.buildDate;
    });
})();