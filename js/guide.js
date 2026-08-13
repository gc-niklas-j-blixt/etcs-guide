// guide.js (rensad/standardiserad)
// Uppbyggnad: title (sträng), text (valfri), image (valfri), choices (array av [label, target])

const guide = {


  problem_during_run: {
    title: "Vad är det som händer under körning?",
    text: "Välj det alternativ som bäst beskriver situationen.",
    choices: [
      ["En varning visas på DMI", "run_dmi_warning"],
      ["Tåget bromsar oväntat", "run_brake_issue"]
      // (Tillfälligt borttagna: Radio/RBC, ATC/NTC, Annat problem)
    ]
  },

  // ======== BROMSNING UNDER KÖRNING ========

  run_brake_issue: {
    title: "När sker den oväntade bromsningen?",
    text: "Välj det alternativ som bäst matchar situationen.",
    choices: [
      ["Direkt när jag börjar köra", "run_brake_start"],
      ["När jag kör som vanligt","run_brake_run"],
    ],
  },

  run_brake_run: {
    title: "Ser du något av följande meddelanden på DMI?",
    choices: [
      ["ETCS-fel","dmi_atp_failure"],
      ["Nödstopp från RBC", "eb_from_rbc"],
    ],
  },

  dmi_atp_failure: {
    title: "ETCS-fel",
    image: "assets/images/atp_failure.png",
    text: "Om ett stoppande fel i tågskyddsystemet inträffar under färd kommer systemet att aktivera driftbromsen. Om felet kvarstår under längre tid än 5 sekunder efter att fordonet stannat, växlar tågskyddsystemet till driftläge 'Systemefel (SF) och aktiverar nödbromsen",
    choices: [
      ["Fordonet står still och 'ETCS-fel' syns inte längre", "atp_failure_resolved"],
      ["Fordonet står still och nödbroms är aktiverad", "atp_failure"]
    ],
  },

  atp_failure: {
    title: "Driftläge 'Systemfel (SF)",
    image: "assets/images/atp_failure_sf.png",
    text: "Om systemet går in i driftläge 'Systemfel (SF), så kommer nödbromsen att aktiveras samt symbolen för 'Systemfel (SF)' kommer visas på DMI (Se bild ovan).\n\nBromsarna kan inte lossas förrän du har gjort en lyckad omstart eller förbikoppling av tågskyddsystemet.\n\nOm det inte går att starta om tågskyddsystemet framgångsrikt så ska du felanmäla fordonet enligt gällande rutin.",
    choices: [],
  },

  atp_failure_resolved: {
    title: "'ETCS-fel' syns inte längre på DMI",
    text: "Om meddelandet 'ETCS-fel' försvinner och du inte har några andra felmeddelanden på DMI, så kan du fortsätta din tågfärd enligt gällande tekniska körbesked.",
    choices:[],
  },

  eb_from_rbc:{
    title: "Nödstopp från RBC (Broms begärd)",
    image: "assets/images/eb_from_RBC.png",
    text: "Tågskyddsystemet har mottagit en ovilkorlig Nödbromsorder från RBC.\n1) Låt fordonet stanna.\n2) Följ operativa regler för nödstoppsmeddelanden från RBC",
    choices:[],
  },

  run_brake_start: {
    title: "Bromsning direkt när du börjar köra (”Rullningsvakt”)",
    image: "assets/images/roll_away_protection.png",
    text:
      "ETCS kan begära broms (”Rullningsvakt”) direkt vid start om systemet inte är redo att ge körbesked.\n\n" +
      "Vanliga orsaker:\n" +
      "• Start of Mission inte slutförd (t.ex. ‘Start’-knappen ej tryckt i slutet av uppstartsproceduren)\n" +
      "• Tågdata ej bekräftade\n" +
      "• Bromstest ej avslutat\n" +
      "• Radio/RBC inte ansluten\n" +
      "• Systemet saknar korrekt position",
    choices: []
  },

  // ======== DMI-VARNINGAR ========

  run_dmi_warning: {
    title: "Vilken typ av varning visas på DMI?",
    text: "Välj det alternativ som bäst matchar det du ser på skärmen.",
    choices: [
      ["Kommunikationsfel/Ingen radioförbindelse möjlig", "warn_no_rbc_connection"],
      ["ETCS-fel", "warn_etcs_fel"],
      ["Tillsätt broms!", "warn_apply_brake"],
      ["ETCS – Traction cut‑off inte tillgänglig", "warn_traction_cutoff"],
      ["Juridical Recording inte tillgänglig,", "jru_not_recording"],
    ],
  },

  

  


  dmi_driver_id: {
    title: "Mata in och bekräfta föraridentitet",
    image: "assets/images/Föraridentitet.png",
    text: "Bilden på din DMI ska se ut ungefär som bilden ovan.Fyll i uppgifter enligt instruktion på DMI och bekräfta.",
    choices: [
      ["Föraridentitet inmatat","dmi_brake_test"],
    ],
  },

 



  // ======== GENERELL FELSIDA ========

  
   


  
    


  

  dmi_display_check: {
    title: "Ser du något på DMI?",
    text: "Titta efter menyer/symboler som visas på DMI.",
    choices: [
      ["ETCS Förbikopplat", "dmi_atp_isolated"],
      ["Förarhytt inte aktiv", "cab_activation"],
      ["DMI visar menyn 'Föraridentitet'", "dmi_driver_id"],
      ["BTM-test misslyckades", "btm_test_failed"],
      ["ETCS driftbroms inte tillgänglig", "dmi_sb_not_avail"],
      ["ETCS – Traction cut‑off inte tillgänglig", "warn_traction_cutoff"],
      ["Juridical Recording inte tillgängligt", "jru_not_recording"],
      ["Ingen kontakt med ATP", "atp_switch_on"],
      
    ],
  },
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
      ["Systemet ser ut att starta","dmi_display_check"],
    ],
  },

  atp_isolation_switch_on: {
    title: "ETCS Förbikopplat - (efter omstart)",
    text: "Om meddelandet 'ETCS förbikopplat' inte försvinner efter att du har testat att starta om systemet, ska du felanmäla fordonet enligt gällande rutin",
    choices:[],
  },

  



  cab_activation: {
    title: "Aktivera förarhytten",
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

  // ======== BROMSTEST ========

  dmi_brake_test: {
    title: "Utför bromstest",
    image:"assets/images/Utför Bromstest.png",
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
  },

  // ======== NIVÅVAL ========

  dmi_level: {
    title: "Välj Utrustningsnivå",
    image: "assets/images/Meny Nivå.png",
    text: "Välj och kvittera vilken nivå du vill köra.",
    choices: [
      ["Nivå 0", "level_0_dmi_main_menu"],
      ["Nivå 1", "level_1_dmi_main_menu"],
      ["Nivå 2", "level_2_dmi_menu_rbc_contact"],
      ["Nivå NTC (ATC-2)", "level_ntc_dmi_main_menu"]
    ]
  },

 
  

  

 

  

  // ======== SLUT ========



   
   
    
 
};

