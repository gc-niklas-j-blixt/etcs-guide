// ==========================
// ATP-ISOLERING
// ==========================

Object.assign(guide, {

    dmi_atp_isolated: {
        title: "ETCS förbikopplat",
        image: "assets/images/dmi_atp_isolated.png",
        text: "Om du ser ovanstående meddelande på DMI behöver du kontrollera att tågskyddsystemets isoleringsbrytare står i rätt läge.\n\nHar du kontrollerat att isoleringsrbrytaren står i rätt läge?",
        choices: [
            ["Ja, isoleringsbrytaren är i rätt läge", "atp_reboot"],
            ["Nej, jag har inte kontrollerat isoleringsbrytaren", "atp_isolation_switch_check"],
        ],
    },

    atp_isolation_switch_check: {
        title: "Kontrollera isoleringsbrytaren",
        text: "Kontrollera att isoleringsbrytaren står i läge 'Inkopplat'.",
        choices: [
            ["Isoleringsbrytaren är i rätt läge", "atp_reboot"],
            ["Isoleringsrbytren var i fel läge, nu är den i rätt läge", "atp_reboot"],
        ],
    },

    atp_reboot: {
        title: "Isoleringbrytaren är i rätt läge",
        text: "Prova att starta om tågskyddsystemet genom att:\n\n1)Vrida huvuströmställaren till läge FRÅN/OFF\n\n2)Vänta minst 10 sekunder\n\n3)Vrid huvudströmställaren till läge TILL/ON\n\n4)Gå tillbaka till hytten för att kontrollera om systmet startar.(OBS, det tar 120 sekunder för systemet att start upp helt).",
        choices: [
            ["Jag har startat om men det gör ingen skillnad", "atp_isolation_switch_on"],
            ["Systemet ser ut att starta", "dmi_display_check"],
        ],
    },

    atp_isolation_switch_on: {
        title: "ETCS Förbikopplat - (efter omstart)",
        text: "Om meddelandet 'ETCS förbikopplat' inte försvinner efter att du har testat att starta om systemet, ska du felanmäla fordonet enligt gällande rutin",
        choices: [],
    }
  
});