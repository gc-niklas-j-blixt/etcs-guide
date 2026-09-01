// ==========================
// UPPSTART OCH ATP
// ==========================

Object.assign(guide, {

    atp_switch_on: {
    title: "Kontrollera ETCS-huvudströmställare",

    keywords: [
        "ingen kontakt med ATP",
        "ingen ATP",
        "ATP svarar inte",
        "ETCS startar inte",
        "ingen kontakt med ETCS",
        "huvudströmställare",
        "ETCS huvudström"
    ],

    text: "Kontrollera så att 'ETCS-huvudströmställeren är i läge TILL/ON.",
    choices: [
        ["ETCS-huvudströmställare är i läge TILL/ON", "atp_restart"],
        ["Nu har jag satt ETCS-strömställaren i läge TILL/ON", "dmi_boot_check"],
    ],
},
    atp_restart: {
        title: "Har du provat start om systemet?",
        keywords: [
  "ETCS startar inte trots ström",
  "ATP startar inte trots ström",
  "huvudströmställare är till",
  "huvudströmställare i rätt läge",
  "ETCS huvudströmställare till",
  "starta om ETCS",
  "starta om ATP",
  "ETCS omstart",
  "ATP omstart",
  "omstart ETCS"
],
        text: "Prova att starta om systemet genom att göra följande\n\n1).Vrid huvudströmställaren till läge FRÅN/OFF.\n\n2).Vänta minst 10 sekunder innan du slår på systemet igen.\n\n3).Vrid huvudströmställaren till läge TILL/ON\n\n4).Gå tillbaka till hytten och kontrollera DMI.(Det tar 120 sekunder för systemet att start upp).",
        choices: [
            ["Jag har redan provat starta utan framgång", "atp_boot_failure"],
            ["Nu har jag provat starta om", "dmi_boot_check"],
        ]
    },

    atp_boot_failure: {
        title: "Felanmäl",
        text: "Felanmäl att systemet inte startar enligt gällande rutin",
        choices: [],
    }
});