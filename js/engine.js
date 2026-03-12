// Historikstack för steg
let history = [];

function updateBreadcrumbs() {
  const bcEl = document.getElementById("breadcrumbs");
  bcEl.innerHTML = "";

  // Visa endast breadcrumbs från historiken
  const path = history.map(id => guide[id]?.title || id);

  // Bygg HTML
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

/**
 * Visar ett steg från guide.js
 */ 
function show(step) {

    // Säkerhetskontroll
    const node = guide[step];
    if (!node) {
        console.error(`Steg '${step}' saknas i guide.js`);
        document.getElementById("title").innerText = "Fel i felsökningsguiden";
        document.getElementById("text").innerText =
            `Steget '${step}' hittades inte. Kontakta support eller kontrollera guide.js.`;
        document.getElementById("choices").innerHTML = "";
        return;
    }

    // Lägg till i historiken
    history.push(step);

    
// uppdatera breadcrumbs
updateBreadcrumbs();


    // Visa titel
    document.getElementById("title").innerText = node.title || "";

    // Visa bild om den finns
    const imageDiv = document.getElementById("image");
    imageDiv.innerHTML = "";
    if (node.image) {
        const img = document.createElement("img");
        img.src = node.image;
        img.className = "guide";
        img.alt = "Illustration";
        imageDiv.appendChild(img);
    }

    // Visa text
    document.getElementById("text").innerText = node.text || "";

    // Visa val-knappar
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (node.choices && node.choices.length > 0) {
        node.choices.forEach(choice => {
            const [label, nextStep] = choice;

            const btn = document.createElement("button");
            btn.innerText = label;

            btn.onclick = () => {
                if (!nextStep) {
                    console.error(`Valet '${label}' saknar nextStep i guide.js`);
                    return;
                }
                show(nextStep);
            };

            choicesDiv.appendChild(btn);
        });
    }
}

/**
 * Backa ett steg
 */
document.getElementById("back").onclick = () => {

    document.getElementById("home").onclick = () => {
  history = [];           // nollställ historiken
  show("start");          // hoppa till startsidan
  updateBreadcrumbs();    // uppdatera stigen direkt
};
    // Ta bort aktuellt steg
    history.pop();

    const prev = history[history.length - 1];

    if (prev) {
        show(prev);
    } else {
        // Om ingen historik finns → gå till start
        show("start");
    }
};

// Starta guiden
show("start");