// ==========================
// BROMSTEST
// ==========================

Object.assign(guide, {

    // ======== BROMSTEST ========

    dmi_brake_test: {
        title: "Utför bromstest",
        image: "assets/images/Utför Bromstest.png",
        text: "Tryck på 'JA' eller inom den gula rutan om alternativen 'JA/NEJ' inte visas.",
        choices: [
            ["ETCS-bromstest lyckades", "dmi_level"],
            ["Bromstestet misslyckades, utöför nytt bromstest.", "check_sifa_valves"],
            ["ETCS-bromstest lyckades, men 'ETCS – traction cut off inte tillgänglig' visas", "warn_traction_cutoff"],
            ["Går inte att starta bromstest", "check_brake_handle"]
        ]
    },



    check_brake_handle: {
        title: "Kontrollera huvudbromskontroll och HL",
        text: "Säkerställ 5 bar i HL och att huvudbromskontrollen ligger i läge 'Gångläge'.",
        choices: [
            ["Nu är huvudbromskontrollen i gångläge (5 bar i HL)", "dmi_brake_test"],
            ["Huvudbromskontroll i gångläge (5 bar i HL) men bromstest startar inte", "brake_release_push"]
        ]
    },

    brake_release_push: {
        title: "Har du gjort en loss stöt?",
        text: "Testa att göra en lossstöt manöver med huvudbromskontrollen.",
        choices: [
            ["Ja, men bromstestet startar ändå inte", "dmi_brake_test_failure"],
            ["Bromstestet startade efter losstöt", "dmi_brake_test"]
        ]
  
    },

    check_sifa_valves: {
        title: "Kontrollera SIFA-ventiler",
        text: "Kontrollera att båda SIFA-ventilerna står i läge 'TILL/1'.",
        choices: [
            ["Båda SIFA-ventilerna är redan i rätt läge", "dmi_brake_test_failure"],
            ["Nu är båda SIFA-ventilerna i rätt läge", "dmi_brake_test"]
        ]
    },

    dmi_brake_test_failure: {
        title: "Felanmäl: Bromstest startar ej/misslyckas",
        text: "Felanmäl enligt gällande rutin.",
        choices: []
    }
  
});