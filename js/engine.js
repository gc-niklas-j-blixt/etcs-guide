// ==========================
// ETCS GUIDE ENGINE
// ==========================

// Historikstack för navigation
let history = [];
let currentStep = null;

// ==========================
// Visa ett steg i guiden
// ==========================
function show(step, addToHistory = true) {

    // Säkerhetskontroll – finns steget i guide.js?
    const node = guide[step];
    if (!node) {
        console.error(`Steget '${step}' saknas i guide.js`);
        document.getElementById("title").innerText = "Fel i guiden";
        document.getElementById("text").innerText =
            `Steget '${step}' hittades inte i datan.`;
        document.getElementById("choices").innerHTML = "";
        return;
    }

  // Spara aktuellt steg
  currentStep = step;
  
  // Visa sökfunktionen endast på startsidan
const searchPanel = document.querySelector(".search-panel");

if (searchPanel) {
  searchPanel.style.display = step === "start" ? "" : "none";
}

// Lägg till steget i historiken
if (addToHistory && history[history.length - 1] !== step) {
  history.push(step);
}

    // Uppdatera breadcrumbs
    updateBreadcrumbs();

    // Uppdatera titel
    document.getElementById("title").innerText = node.title || "";

    // Uppdatera bildfält
    const imageDiv = document.getElementById("image");
    imageDiv.innerHTML = "";
    if (node.image) {
        const img = document.createElement("img");
        img.src = node.image;
        img.className = "guide";
        img.alt = "Illustration";
        imageDiv.appendChild(img);
    }

    // Uppdatera brödtext
    document.getElementById("text").innerText = node.text || "";

    // Uppdatera valknappar
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (node.choices && node.choices.length > 0) {
        node.choices.forEach(choice => {
            const [label, nextStep] = choice;

            const btn = document.createElement("button");
            btn.innerText = label;

            btn.onclick = () => {
                if (!nextStep) {
                    console.error(`Valet '${label}' saknar nextStep.`);
                    return;
                }
                show(nextStep);
            };

            choicesDiv.appendChild(btn);
        });
    }

    updateReportButton(node);
}

// ==========================
// Tillbaka-knappen
// ==========================
document.getElementById("back").onclick = () => {
  // Ta bort aktuellt steg
  history.pop();

  const prev = history[history.length - 1];

  if (prev) {
    show(prev, false);
  } else {
    history = [];
    show("start");
  }

  updateBreadcrumbs();
};
// ==========================
// Start-knapp
// ==========================
document.getElementById("home").onclick = () => {
    history = [];     // töm historiken
    show("start");    // börja om
    updateBreadcrumbs();
};


// ==========================
// Dynamisk Breadcrumbs (mobil = 2 steg, desktop = 3 steg)
// ==========================
function updateBreadcrumbs() {
    const bcEl = document.getElementById("breadcrumbs");
    bcEl.innerHTML = "";

    // Automatisk responsiv längd
    const maxSteps = window.innerWidth < 600 ? 2 : 3;

    const visibleHistory = history.slice(-maxSteps);
    let path = visibleHistory.map(id => guide[id]?.title || id);

    // Visa "…" om vi döljer tidigare steg
    if (history.length > visibleHistory.length) {
        path.unshift("…");
    }

    // Rendera breadcrumbs
    path.forEach((title, index) => {
        const span = document.createElement("span");
        span.textContent = title;
        bcEl.appendChild(span);

        if (index < path.length - 1) {
            const sep = document.createElement("span");
            sep.textContent = "›";
            sep.className = "sep";
            bcEl.appendChild(sep);
        }
    });
}

// ==========================
// Sökfunktion
// ==========================

function setupSearch() {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  if (!input || !results) {
    return;
  }

  input.addEventListener("input", () => {
    renderSearchResults(input.value.trim().toLowerCase());
  });
}

function renderSearchResults(query) {
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  if (query.length < 2) {
    return;
  }

  const matches = Object.entries(guide)
    .filter(([id, node]) => {
      const choiceText = (node.choices || [])
        .map(choice => choice[0])
        .join(" ");

     const keywordText = Array.isArray(node.keywords)
  ? node.keywords.join(" ")
  : "";

const searchableText = `
  ${id}
  ${node.title || ""}
  ${node.text || ""}
  ${choiceText}
  ${keywordText}
`.toLowerCase();
      
 const normalizedQuery = query.replace(/[-–—_/]+/g, " ");

const queryWords = normalizedQuery
  .split(/\s+/)
  .filter(Boolean);

return queryWords.every(word => searchableText.includes(word));
    })
    .slice(0, 8);

  if (matches.length === 0) {
    results.innerHTML = "<p>Inga träffar.</p>";
    return;
  }

  matches.forEach(([id, node]) => {
    const btn = document.createElement("button");
    btn.className = "search-result-button";
    btn.innerText = node.title || id;

    btn.onclick = () => {
      document.getElementById("searchInput").value = "";
      results.innerHTML = "";
      show(id);
    };

    results.appendChild(btn);
  });
}

// ==========================
// Kopiera felrapport
// ==========================

function setupCopyReport() {
  const btn = document.getElementById("copyReport");

  if (!btn) {
    return;
  }

  btn.onclick = () => {
    const node = guide[currentStep];

    if (!node) {
      return;
    }

    const report = buildReportText(currentStep, node);

    copyTextToClipboard(report)
      .then(() => {
        const status = document.getElementById("copyStatus");
        if (status) {
          status.innerText = "Felrapport kopierad.";
        }
      })
      .catch(() => {
        const status = document.getElementById("copyStatus");
        if (status) {
          status.innerText = "Kunde inte kopiera automatiskt.";
        }
      });
  };
}

function updateReportButton(node) {
  const btn = document.getElementById("copyReport");
  const status = document.getElementById("copyStatus");

  if (!btn) {
    return;
  }

  const isEndNode = !node.choices || node.choices.length === 0;

  btn.style.display = isEndNode ? "block" : "none";

  if (status) {
    status.innerText = "";
  }
}

function buildReportText(stepId, node) {
  const path = history
    .map(id => guide[id]?.title || id)
    .join(" > ");

  const generatedAt = new Date().toLocaleString("sv-SE");
  const pageUrl = window.location.href;
  const guideVersion = getGuideVersionText();

  return `ETCS Första Hjälpen – felrapport

Rapport skapad:
${generatedAt}

Guideversion:
${guideVersion}

Sida:
${pageUrl}

Vald felsökningsväg:
${path}

Slutsteg:
${node.title || stepId}

Rekommenderad information/åtgärd:
${node.text || "Ingen ytterligare text angiven i guiden."}

Uppgifter att komplettera:
- Loknummer:
- Datum/tid för felet:
- Plats:
- DMI-meddelande:
- Driftläge på DMI:
- ETCS-nivå:
- Omstart utförd: Ja/Nej
- Felet kvarstår efter omstart: Ja/Nej
- Övriga observationer:
`;
}

function getGuideVersionText() {
  const footer = document.querySelector("footer");

  if (footer && footer.innerText.trim()) {
    return footer.innerText.trim();
  }

  return "Versionsinformation kunde inte läsas.";
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  document.execCommand("copy");
  document.body.removeChild(textarea);

  return Promise.resolve();
}

setupSearch();
setupCopyReport();

// ==========================
// Starta guiden
// ==========================
show("start");