// ==========================
// START OCH SNABBVAL
// ==========================

Object.assign(guide, {
    start: {
        title: "Vilken typ av problem har du?",
        text: "Välj det alternativ som bäst motsvarar situationen.",
        choices: [
            ["Uppstartsproblem", "dmi_boot_check"],
            ["Problem under körning", "problem_during_run"],
            ["Vanliga fel / snabbval", "common_faults"]
        ]
    },
  
    common_faults: {
        title: "Vanliga fel / snabbval",
        text: "Välj ett vanligt fel för att hoppa direkt till rätt felsökningssteg.",
        choices: [
            ["Ingen kontakt med ATP", "atp_switch_on"],
            ["ETCS-fel", "warn_etcs_fel"],
            ["Kommunikationsfel / Ingen radioförbindelse möjlig", "warn_no_rbc_connection"],
            ["Tillsätt broms!", "warn_apply_brake"],
            ["ETCS driftbroms inte tillgänglig", "dmi_sb_not_avail"],
            ["Traction cut-off inte tillgänglig", "warn_traction_cutoff"],
            ["JRU registrerar inte", "jru_not_recording"],
            ["BTM-test misslyckades", "btm_test_failed"],
            ["Rullningsvakt / bromsning direkt vid start", "run_brake_start"],
            ["Nödstopp från RBC", "eb_from_rbc"]
        ]
    }
});
