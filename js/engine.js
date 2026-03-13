// ==========================
// ETCS GUIDE ENGINE
// ==========================

// Historikstack för navigation
let history = [];

// ==========================
// Visa ett steg i guiden
// ==========================
function show(step) {

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

    // Lägg till steget i historiken
    history.push(step);

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
}


// ==========================
// Tillbaka-knappen
// ==========================
document.getElementById("back").onclick = () => {

    // Ta bort aktuellt steg
    history.pop();

    const prev = history[history.length - 1];

    if (prev) {
        show(prev);
    } else {
        // Om historiken är tom → börja om
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
// Starta guiden
// ==========================
show("start");