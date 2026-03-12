// js/validate.js
// Enkel validator som körs vid sidladdning och rapporterar problem i guide.js till konsolen.
// Påverkar inte användarflödet, men hjälper dig fånga fel tidigt.

(function validateGuide(g) {
  if (!g || typeof g !== "object") {
    console.error("❌ guide.js saknas eller är ogiltig. Validatorn kan inte köras.");
    return;
  }

  const ids = new Set(Object.keys(g));
  const problems = {
    missingNode: [],
    malformedChoice: [],
    badTypes: [],
    duplicateLabels: [],
    emptyChoices: [],
  };

  for (const [id, node] of Object.entries(g)) {
    // ------- Typkontroller -------
    if (typeof node.title !== "string") {
      problems.badTypes.push(`${id}: 'title' ska vara sträng`);
    }
    if (node.text && typeof node.text !== "string") {
      problems.badTypes.push(`${id}: 'text' ska vara sträng (om den finns)`);
    }
    if (node.image && typeof node.image !== "string") {
      problems.badTypes.push(`${id}: 'image' ska vara sträng (om den finns)`);
    }
    if (!Array.isArray(node.choices)) {
      problems.badTypes.push(`${id}: 'choices' ska vara en array`);
      continue; // kan inte validera choices vidare
    }

    if (node.choices.length === 0) {
      // Avslutande steg är okej, men markera om du vill
      // problems.emptyChoices.push(`${id}: har tom 'choices' (kontrollera att detta är avsiktligt)`);
    }

    // ------- Choice-kontroller -------
    const seenLabels = new Set();
    for (const choice of node.choices) {
      if (!Array.isArray(choice)) {
        problems.malformedChoice.push(`${id}: choice är inte array -> ${JSON.stringify(choice)}`);
        continue;
      }
      if (choice.length < 2) {
        problems.malformedChoice.push(`${id}: choice saknar mål -> ${JSON.stringify(choice)}`);
        continue;
      }
      const [label, target] = choice;

      if (typeof label !== "string" || typeof target !== "string") {
        problems.malformedChoice.push(`${id}: choice-typer ogiltiga -> ${JSON.stringify(choice)}`);
        continue;
      }

      // Dublettkontroll av knapptexter (kan bli förvirrande i underhåll)
      if (seenLabels.has(label)) {
        problems.duplicateLabels.push(`${id}: duplicerad knapptext '${label}'`);
      } else {
        seenLabels.add(label);
      }

      // Länkad nod måste finnas
      if (!ids.has(target)) {
        problems.missingNode.push(`${id}: mål saknas '${target}' (från val '${label}')`);
      }
    }
  }

  // ------- Rapportering -------
  const total =
    problems.missingNode.length +
    problems.malformedChoice.length +
    problems.badTypes.length +
    problems.duplicateLabels.length +
    problems.emptyChoices.length;

  if (total === 0) {
    console.info("✅ guide.js är validerad – inga problem hittades.");
  } else {
    console.group("⚠️ Problem i guide.js");
    if (problems.badTypes.length) {
      console.group("Felaktiga typer:");
      problems.badTypes.forEach(x => console.warn(x));
      console.groupEnd();
    }
    if (problems.malformedChoice.length) {
      console.group("Felaktiga choices:");
      problems.malformedChoice.forEach(x => console.warn(x));
      console.groupEnd();
    }
    if (problems.missingNode.length) {
      console.group("Saknade målsteg:");
      problems.missingNode.forEach(x => console.warn(x));
      console.groupEnd();
    }
    if (problems.duplicateLabels.length) {
      console.group("Duplicerade knapptexter (kan vara förvirrande):");
      problems.duplicateLabels.forEach(x => console.warn(x));
      console.groupEnd();
    }
    if (problems.emptyChoices.length) {
      console.group("Tomma choices (kontrollera att det är meningen):");
      problems.emptyChoices.forEach(x => console.info(x));
      console.groupEnd();
    }
    console.groupEnd();
  }
})(typeof guide !== "undefined" ? guide : null);