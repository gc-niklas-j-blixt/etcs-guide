// ==========================
// DMI-UPPSTART
// ==========================

Object.assign(guide, {

    // ======== DMI UPPSTART ========

    dmi_boot_check: {
        title: "Startar DMI?",
        keywords: [
  "DMI svart",
  "svart DMI",
  "DMI startar inte",
  "DMI tänds inte",
  "inget på DMI",
  "ingen bild på DMI",
  "DMI skärm svart",
  "DMI död",
  "display svart"
],
        text: "Observera DMI-skärmen vid uppstart.",
        choices: [
            ["Ja", "dmi_display_check"],
            ["Nej, DMI är svart", "dmi_cb_check"]
        ]
    },

    dmi_cb_check: {
        title: "Har du kontrollerat dvärgbrytarna för DMI?",
        text: "Kontrollera att dvärgbrytarna för båda lokets DMI:er är i läge 'TILL'.",
        choices: [
            ["Ja, men DMI är fortfarande svart", "dmi_boot_failure"],
            ["Nej, jag har inte kontrollerat dvärgbrytarna", "dmi_cb_reset"],
        ]
    },

    dmi_cb_reset: {
        title: "Kontrollera att dvärgbrytarna är i rätt läge",
        text: "Sätt dvärgbrytarna i rätt läge och prova igen.",
        choices: [
            ["Dvärgbrytarna var i rätt läge, men DMI är fortfarande svart", "dmi_boot_failure"],
            ["Dvärgbrytarna var i fel läge, nu är de återställda", "dmi_boot_check"],
        ]
    },

    dmi_boot_failure: {
        title: "Felanmäl: DMI startar inte",
        text: "Felanmäl enligt gällande rutin.",
        choices: []
    }
});