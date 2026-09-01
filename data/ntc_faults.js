// ==========================
// NTC / ATC-2 – FELSÖKNING
// ==========================

Object.assign(guide, {

  dmi_ntc_visible: {
    title: "NTC visas på DMI",
    keywords: [
      "NTC visas på DMI",
      "NTC på DMI",
      "NTC fel",
      "fastnar i NTC",
      "står i NTC",
      "ATC-2 fel",
      "STM fel",
      "oväntat NTC"
    ],
    text: "Om NTC visas på förarens DMI är detta ett fel. Fortsätt felsökningen för att kontrollera orsaken.",
    choices: [
      ["Fortsätt", "ntc_atc2_cb_check"]
    ]
  },

  ntc_atc2_cb_check: {
    title: "Kontrollera dvärgbrytare ATC-2",
    text: "Kontrollera dvärgbrytaren märkt 'ATC-2'.",
    choices: [
      ["ATC-2 är kontrollerad", "ntc_restart"]
    ]
  },

ntc_restart: {
  title: "Starta om tågskyddssystemet",
  text: "Prova att starta om tågskyddssystemet och kontrollera därefter förarens DMI.",
  choices: [
    ["NTC står kvar på DMI", "ntc_failure"],
    ["NTC står inte längre på DMI", "dmi_boot_check"]
  ]
    },



  ntc_failure: {
    title: "Felanmäl: NTC visas fortfarande",
    text: "Om NTC fortfarande visas efter kontroll av dvärgbrytare ATC-2 och omstart av tågskyddssystemet ska fordonet felanmälas enligt gällande rutin.",
    choices: []
  }

});