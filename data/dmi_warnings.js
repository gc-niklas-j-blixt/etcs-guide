// ==========================
// DMI-VARNINGAR OCH STATUSMEDDELANDEN
// ==========================

Object.assign(guide, {

    // ---- Övriga varningar ----

    warn_apply_brake: {
        title: "Meddelandet 'Tillsätt broms!' visas på DMI",
        text:
            "Meddelandet visas när fordonets retardation är otillräcklig. Du måste själv tillsätta broms tills fordonet står stilla.\n\n" +
            "När fordonet står stilla måste du kvittera meddelandet 'Tillsätt broms!' samt det efterföljande meddelandet 'Nödbromsfel'.\n\n" +
            "Utför därefter omstart av systemet. Om meddelandet kvarstår efter omstart ska fordonet felanmälas enligt gällande rutin.",
        choices: []
    },

    warn_etcs_fel: {
        title: "Meddelandet 'ETCS-fel' visas på DMI",
        text:
            "Tågskyddssystemet informerar när ett stoppande ETCS‑fel har inträffat.\n\n" +
            "Om felet kvarstår när fordonet står stilla antar systemet driftläge 'Systemfel (SF)'.\n\n" +
            "Prova att starta om systemet. Om felet kvarstår ska du följa ordinarie rutin för felrapportering.",
        choices: []
    },
  
    warn_traction_cutoff: {
        title: "ETCS – Traction cut‑off inte tillgänglig",
        image: "assets/images/TCO_not_avail.png",
        text:
            "ETCS kan inte aktivera traction cut‑off i detta läge. Detta är vanligtvis inte ett stoppande fel.\n\n" +
            "Vanliga orsaker:\n" +
            "• Pågående bromstest\n" +
            "• Tågdata inte fullständigt bekräftade\n" +
            "• Start of Mission inte avslutad\n" +
            "• Systembyte eller knappvalssekvens\n\n" +
            "Meddelandet försvinner vanligtvis när bromstest är klart och systemet är redo.\n\n" +
            "Om meddelandet ligger kvar efter korrekt genomfört bromstest bör felet felanmälas.",
        choices: [
      
        ]
    },
   
    btm_test_failed: {
        title: "BTM-test misslyckades",
        image: "assets/images/btm_test_failed.png",
        text: "Fordonet får inte stå med balisantennen över en balis eller massivt metallobjekt (t.ex en järnbro) under uppstarstproceduren. När förarhytten är aktiverad utför tågskyddsystemet automatiskt testa av balistransmissionen. Om fordonet står olämpligt placerat kan detta fel uppstå.\nOm du ser meddelndet ovan på DMI måste du:\n\n1) Stänga av tågskyddsystemet/alternativ isolera det\n\n2) Flytta fordonet\n\n3) Starta upp/starta om systemet på nytt.\n\n\nStartproceduren kan inte avslutas innan transmissionstestet är slutfört.",
        choices: [],
    },

    dmi_sb_not_avail: {
        title: "ETCS driftbroms inte tillgänglig",
        image: "assets/images/dmi_sb_not_avail.png",
        text: "Detta meddelande indikerar på att tågskyddsystemet inte kan aktivera driftbroms. Meddelandet ska försvinna efter att du har genomfört ett bromstest. Detta är inte stoppande men du ska rapprotera in felet enligt gällande rutin om meddelandet inte försvinner efter att du genomfört ett godkänt bromstest",
        choices: [],
    },

    jru_not_recording: {
        title: "Juridical Recording Unit(JRU) registrerar inte",
        image: "assets/images/jru_not_recording.png",
        text: "Detta indikerar på att JRU-enheten inte kan spela in för tillfället. Normalt ska detta meddelande försvinna av sig själv efter några sekunder. Om det inte gör det ska detta felanmälas enligt gällande rutin.",
        choices: []
    }
  
});