// ==========================
// HYTTAKTIVERING
// ==========================

Object.assign(guide, {

  cab_activation: {
    title: "Aktivera förarhytten",
    keywords: [
  "förarhytt inte aktiv",
  "hytt inte aktiv",
  "hytten inte aktiv",
  "förarhytt ej aktiv",
  "aktivera hytt",
  "hyttaktivering",
  "DMI hytt inte aktiv"
],
    text: "Aktivera hytten enligt rutin och invänta DMI-reaktion.",
    choices: [
      ["Hytten är aktiverad men DMI reagerar inte", "cab_activation_failure"],
      ["Nu har jag aktiverat hytten", "dmi_display_check"]
    ]
  },

  cab_activation_failure: {
    title: "Felanmäl: Hyttaktivering fungerar inte",
    text: "Felanmäl enligt gällande rutin.",
    choices: []
  },

});