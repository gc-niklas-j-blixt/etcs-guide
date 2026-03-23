// guide.js (rensad/standardiserad)
// Uppbyggnad: title (sträng), text (valfri), image (valfri), choices (array av [label, target])

const guide = {

  // ======== START ========

  start: {
    title: "Vilken typ av problem har du?",
    text: "Välj det alternativ som bäst motsvarar situationen.",
    choices: [
      ["Uppstartsproblem", "dmi_boot_check"],
      ["Problem under körning", "problem_during_run"]
    ]
  },

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
      ["Nödstopp från RBC", "eb_from_rbc"],
    ],
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
      ["ETCS – Traction cut‑off inte tillgänglig", "warn_traction_cutoff"]
    ]
  },

  // ---- RBC / Radio ----

  warn_no_rbc_connection: {
    title: "Vilket av följande meddelanden ser du på DMI?",
    text: "Tryck på den knapp som stämmer med texten på din DMI.",
    choices: [
      ["Kommunikationsfel", "rbc_communication_error"],
      ["Ingen radioförbindelse möjlig", "rbc_no_radio_connection"]
    ]
  },

  rbc_communication_error: {
    title: "Hur reagerar tåget?",
    text:
      "Beroende på hur marksystemet är konfigurerat kan tågskyddssystemet göra något av följande:",
    choices: [
      ["Beordra broms och visa texten 'Kommunikationsfel'", "rbc_communication_error_brake"],
      ["Anta driftläge 'Nödstopp – TR' och visa texten 'Kommunikationsfel'", "rbc_communication_error_eb"]
    ]
  },

  rbc_communication_error_eb: {
    title: "Driftläge 'Nödstopp – TR'",
    image: "assets/images/no_rbc.png",
    text:
      "Tågskyddssystemet har gått in i driftläge 'Nödstopp – TR'.\n\n" +
      "1) Systemet försöker automatiskt återupprätta radioförbindelsen.\n" +
      "2) Om radioförbindelse inte återupprättas inom 45 sekunder visas symbolen ovan på DMI.\n" +
      "3) Försöket att återupprätta radioförbindelsen avslutas efter 5 minuter. Om det sker ska du följa operativa regler för förlust av radioförbindelse.\n" +
      "4) Om återupprättelse lyckas: följ anvisningarna i gällande förarmanual (t.ex. kapitel om återstart/återgång).",
    choices: []
  },

  rbc_communication_error_brake: {
    title: "Kommunikationsfel – broms begärd",
    image: "assets/images/no_rbc.png",
    text:
      "När fordonet har bromsats till stillastående händer följande:\n\n" +
      "1) Det tekniska körtillståndet har avkortats till fordonets front och bromsarna lossas.\n" +
      "2) Vänta tills radioförbindelse återupprättas (sker automatiskt, ingen åtgärd krävs).\n" +
      "3) Om radioförbindelse inte återupprättas inom 35 sekunder efter att den bröts visas symbolen ovan på DMI.\n" +
      "4) Försöket att återupprätta radioförbindelsen avslutas efter 5 minuter. Om det sker ska du följa operativa regler för förlust av radioförbindelse.",
    choices: []
  },

  rbc_no_radio_connection: {
    title: "Ingen radioförbindelse möjlig",
    image: "assets/images/no_rbc.png",
    text:
      "Systemet meddelar att radioförbindelse inte är möjlig.\n\n" +
      "• Kontrollera GSM‑R‑status/täckning om möjligt.\n" +
      "• Avvakta automatisk återupprättelse.\n" +
      "• Följ operativa regler för förlust av radioförbindelse om status kvarstår.",
    choices: []
  },

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

  warn_atp_no_connection: {
    title: "Ingen kontakt med ATP",
    text: "Om detta felmeddelande visas ska du säkerställa att tågskyddsystemet är påslaget korrekt. Du kan prova att starta om systmet genom att:\n\n1)Vrida huvudströmställaren till läge 'OFF'\n\n2)Vänta minst 10 sekunder.\n\n3)Slå på tågskyddsystemet genom att vrida huvudströmställaren till läge 'ON'.\n\n4)Observera att uppstarten av systemet tar 120 sekunder. Om systemet startar upp korrekt så ska DMI visa något utav följande:",
    choices: [
      ["Menyn 'Föraridentitet", "dmi_driver_id"],
      ['Förarhytt inte aktiv',"cab_activation"],
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
   
  driving_failure: {
    title: "Felanmäl enligt gällande rutin",
    text: "Detta steg avslutar guiden. Följ er ordinarie felanmälningsprocess.",
    choices: []
  },

  atp_switch_on: {
    title: "Kontrollera ETCS-huvudströmställare",
    text: "Kontrollera så att 'ETCS-huvudströmställeren är i läge TILL/ON.",
    choices: [
      ["ETCS-huvudströmställare är i läge TILL/ON", "atp_restart"],
      ["Nu har jag satt ETCS-strömställaren i läge TILL/ON","dmi_boot_check"],
    ]
  },

  atp_restart: {
    title: "Har du provat start om systemet?",
      text:"Prova att starta om systemet genom att göra följande\n\n1).Vrid huvudströmställaren till läge FRÅN/OFF.\n\n2).Vänta minst 10 sekunder innan du slår på systemet igen.\n\n3).Vrid huvudströmställaren till läge TILL/ON\n\n4).Gå tillbaka till hytten och kontrollera DMI.(Det tar 120 sekunder för systemet att start upp).",
    choices: [
      ["Jag har redan provat starta utan framgång","atp_boot_failure"],
      ["Nu har jag provat starta om", "dmi_boot_check"],
    ]
  },

  atp_boot_failure: {
    title: "Felanmäl",
    text: "Felanmäl att systemet inte startar enligt gällande rutin",
    choices:[],
  },
    
  // Behåller noden om du vill länka till den senare
  under_uppbyggnad: {
    title: "Denna del av guiden är under uppbyggnad",
    text: "Det här steget är inte färdigt ännu. Funktionen kommer att läggas in i kommande version.",
    help: "Detta är en testversion av verktyget. Fler steg och funktioner läggs in löpande.",
    choices: []
  },

  // ======== DMI UPPSTART ========

  dmi_boot_check: {
    title: "Startar DMI?",
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
  },

  dmi_display_check: {
    title: "Ser du något på DMI?",
    text: "Titta efter menyer/symboler som visas på DMI.",
    choices: [
      ["Förarhytt inte aktiv", "cab_activation"],
      ["DMI visar menyn 'Föraridentitet'", "dmi_driver_id"],
      ["ETCS driftbroms inte tillgänglig", "dmi_sb_not_avail"],
      ["ETCS – Traction cut‑off inte tillgänglig", "warn_traction_cutoff"],
      ["Juridical Recording inte tillgängligt", "jru_not_recording"],
      ["Ingen kontakt med ATP", "atp_switch_on"],
      
    ]
  },

  dmi_sb_not_avail: {
    title: "ETCS driftbroms inte tillgänglig",
    image: "assets/images/dmi_sb_not_avail.png",
    text: "Detta meddelande indikerar på att tågskyddsystemet inte kan aktivera driftbroms. Meddelandet ska försvinna efter att du har genomfört ett bromstest. Detta är inte stoppande men du ska rapprotera in felet enligt gällande rutin om meddelandet inte försvinner efter att du genomfört ett godkänt bromstest",
    choices:[],
  },

  jru_not_recording: {
    title: "Juridical Recording Unit(JRU) registrerar inte",
    image: "assets/images/jru_not_recording.png",
    text: "Detta indikerar på att JRU-enheten inte kan spela in för tillfället. Normalt ska detta meddelande försvinna av sig själv efter några sekunder. Om det inte gör det ska detta felanmälas enligt gällande rutin.",
    choices:[]
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
      ["ETCS-bromstest lyckades, men 'ETCS – traction cut off inte tillgänglig' visas", "warn_traction_cutoff"],
      ["Går inte att starta bromstest", "check_brake_handle"]
    ]
  },

 

  check_brake_handle: {
    title: "Kontrollera huvudbromskontroll och HL",
    text: "Säkerställ 5 bar i HL och att huvudbromskontrollen ligger i läge 'Gångläge'.",
    choices: [
      ["Nu är huvudbromskontrollen i gångläge (5 bar i HL)", "dmi_brake_test"],
      ["Huvudbromskontroll i gångläge (5 bar i HL) men bromstest startar inte", "check_sifa_valves"]
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

  // ----- Nivå 0 -----
  level_0_dmi_main_menu: {
    title: "Huvudmeny visas (Nivå 0)",
    image: "assets/images/Huvudmeny Tågdata.png",
    text: "Tryck på knappen 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_0_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_0_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata(Nivå 0)",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_0_dmi_confirm_traindata_summary_etcs"],
    ]
  },

  level_0_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata (Nivå 0)",
    image: "assets/images/Bekräfta tågdata ETCS.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_0_dmi_select_atc"]
    ]
  },

  level_0_dmi_select_atc: {
    title: "Välj ATC SE/NO(Nivå 0)",
    text: "Tryck på knappen ATC SE/NO.",
    choices: [
      ["Fortsätt", "level_0_dmi_traindata_entry_atc"]
    ]
  },

  level_0_dmi_traindata_entry_atc: {
    title: "Ange ATC SE/NO tågdata (Nivå 0)",
    image: "assets/images/ATC tågdata.png",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [
      ["Fortsätt", "level_0_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_0_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata(Nivå 0)",
    image: "assets/images/Sammanfattning ATC tågdata.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_0_dmi_train_id"]
    ]
  },

  level_0_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer(Nivå 0)",
    image: "assets/images/Tågnummer.png",
    choices: [
      ["Fortsätt", "level_0_dmi_main_menu_start_btn"],
    ]
  },

  level_0_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'(Nivå 0)",
    text: "Tryck på knappen start.",
    choices: [
      ["Fortsätt", "level_0_confirm_sr_mode"],
      ["Det går inte att trycka på 'Start'", "level_0_dmi_main_menu"],
    ]
  },
  level_0_confirm_sr_mode: {
    title: "Kvittera symbolen 'Särskilt ansvar'(Nivå 0)",
    image: "assets/images/Kvittering särskilt ansvar.png",
    text: "Håll den intryckt i minst 2 sekunder.",
    choices: [
      ["Fortsätt", "level_0_start_of_mission_ok"],
    ]
  },
  

  // ----- Nivå 1 -----
  level_1_dmi_main_menu: {
    title: "Huvudmeny visas(Nivå 1)",
    image: "assets/images/Huvudmeny Tågdata.png",
    text: "Tryck på knappen 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_1_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_1_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata(Nivå 1)",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_1_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_1_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata(Nivå 1)",
    image: "assets/images/Bekräfta tågdata ETCS.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_1_dmi_select_atc"],
    ]
  },

  level_1_dmi_select_atc: {
    title: "Välj ATC SE/NO(Nivå 1)",
    text: "Tryck på knappen ATC SE/NO.",
    choices: [
      ["Fortsätt", "level_1_dmi_traindata_entry_atc"]
    ]
  },

  level_1_dmi_traindata_entry_atc: {
    title: "Ange ATC SE/NO tågdata(Nivå 1)",
    image: "assets/images/ATC tågdata.png",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [
      ["Fortsätt", "level_1_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_1_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata(Nivå 1)",
    image: "assets/images/Sammanfattning ATC tågdata.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_1_dmi_train_id"]
    ]
  },

  level_1_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer(Nivå 1)",
    image: "assets/images/Tågnummer.png",
    choices: [
      ["Fortsätt", "level_1_dmi_main_menu_start_btn"]
    ]
  },

  level_1_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'(Nivå 1)",
    text: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "level_1_start_of_mission"],
      ["Det går inte att trycka på 'Start'", "level_1_dmi_main_menu"]
    ]
  },

  level_1_start_of_mission: {
    title: "Kvittera symbolen 'Särskilt ansvar'(Nivå 1)",
    image: "assets/images/Kvittering särskilt ansvar.png",
    text: "Håll den intryckt i minst 2 sekunder.",
    choices: [
      ["Fortsätt", "level_1_start_of_mission_ok"]
    ]
  },

  // ----- Nivå 2 -----
  level_2_dmi_menu_rbc_contact: {
    title: "RBC kontakt",
    image: "assets/images/Meny RBC Kontakt.png",
    text: "Efter att du valt nivå visas menyn 'RBC kontakt'. Tryck på 'Ange RBC-data'.",
    choices: [
      ["Fortsätt", "level_2_dmi_menu_rbc_data"]
    ]
  },

  level_2_dmi_menu_rbc_data: {
    title: "Ange RBC-data",
    image: "assets/images/RBC-data.png",
    text: "Knappa in 'RBC ID' och 'Telefonnummer' till RBC du ska koppla upp mot. Tryck sedan 'JA'.",
    choices: [
      ["RBC Data inmatat", "level_2_dmi_rbc_connection_check"]
    ]
  },

  level_2_dmi_rbc_connection_check: {
    title: "Kontroll av RBC-förbindelse",
    image: "assets/images/RBC kontakt OK.png",
    text: "DMI visar huvudmeny och symbol för 'RBC-förbindelse upprättad' om anslutningen lyckas(se bild ovan).",
    choices: [
      ["RBC-förbindelse upprättad", "level_2_dmi_main_menu"],
      ["Misslyckades", "gsmr_cb_check"]
    ]
  },

  gsmr_cb_check: {
    title: "Kontrollera dvärgbrytarna för GSM-R-modem",
    text: "Ska stå i läge 'TILL'.",
    choices: [
      ["Dvärgbrytarna är i rätt läge", "level_2_dmi_menu_rbc_data"],
      ["Dvärgbrytarna är i rätt läge men uppkoppling funkar inte","gsmr_failure"],
      ["Dvärgbrytarna är i fel läge och går inte att återställa", "gsmr_failure"]
    ]
  },

  gsmr_failure: {
    title: "Felanmäl: RBC-förbindelse / modem fungerar ej",
    text: "Felanmäl enligt gällande rutin.",
    choices: []
  },

  level_2_dmi_main_menu: {
    title: "Huvudmeny visas(Nivå 2)",
    image: "assets/images/Huvudmeny Tågdata.png",
    text: "Tryck på knappen 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_2_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_2_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata(Nivå 2)",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_2_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_2_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata(Nivå 2)",
    image: "assets/images/Bekräfta tågdata ETCS.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_2_dmi_select_atc"]
    ]
  },

  level_2_dmi_select_atc: {
    title: "Välj ATC SE/NO(Nivå 2)",
    text: "Tryck på knappen ATC SE/NO.",
    choices: [
      ["Fortsätt", "level_2_dmi_traindata_entry_atc"]
    ]
  },

  level_2_dmi_traindata_entry_atc: {
    title: "Ange ATC SE/NO tågdata(Nivå 2)",
    image: "assets/images/ATC tågdata.png",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [
      ["Fortsätt", "level_2_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_2_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata(Nivå 2)",
    image: "assets/images/Sammanfattning ATC tågdata.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_2_dmi_train_id"]
    ]
  },

  level_2_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer(Nivå 2)",
    image: "assets/images/Tågnummer.png",
    choices: [
      ["Fortsätt", "level_2_dmi_main_menu_start_btn"]
    ]
  },

  level_2_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'(Nivå 2)",
    text: "Tryck på knappen 'Start'.",
    choices: [
      ["Fortsätt", "level_2_confirm_sr_mode"],
      ["Det går inte att trycka på 'Start'", "level_2_dmi_main_menu"]
    ]
  },

    level_2_confirm_sr_mode: {
    title: "Kvittera symbolen 'Särskilt ansvar'(Nivå 2)",
    image: "assets/images/Kvittering särskilt ansvar.png",
    text: "Håll den intryckt i minst 2 sekunder.",
    choices: [
      ["Fortsätt", "level_2_start_of_mission_ok"],
    ]
  },

  // ======== NTC ========

  level_ntc_dmi_main_menu: {
    title: "Huvudmeny visas(ATC-2)",
    image: "assets/images/Huvudmeny Tågdata.png",
    text: "Tryck på 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_ntc_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata(ATC-2)",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_ntc_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata(ATC-2)",
    image: "assets/images/Bekräfta tågdata ETCS.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_select_atc"]
    ]
  },

  level_ntc_dmi_select_atc: {
    title: "Välj ATC SE/NO(ATC-2)",
    text: "Tryck på knappen ATC SE/NO.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_traindata_entry_atc"]
    ]
  },

  level_ntc_dmi_traindata_entry_atc: {
    title: "Ange ATC SE/NO tågdata(ATC-2)",
    image: "assets/images/ATC tågdata.png",
    text: "Tryck på varje fält för att bekräfta värdet.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_ntc_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata(ATC-2)",
    image: "assets/images/Sammanfattning ATC tågdata.png",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_train_id"]
    ]
  },

  level_ntc_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer(ATC-2)",
    image: "assets/images/Tågnummer.png",
    choices: [
      ["Fortsätt", "level_ntc_dmi_main_menu_start_btn"]
    ]
  },

  level_ntc_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'(ATC-2)",
    text: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "level_ntc_start_of_mission"],
      ["Det går inte att trycka på 'Start'", "level_ntc_dmi_main_menu"]
    ]
  },

  level_ntc_start_of_mission: {
    title: "Kvittera driftläge STM (ATC-2)",
    image: "assets/images/Kvittering_Level_NTC.png",
    text: "Tryck och håll in symolen för dritfläge STM(ATC-2)",
    choices: [
      ["Fortsätt", "level_ntc_start_of_mission_ok"],
    ]
  },

  // ======== SLUT ========

  level_0_start_of_mission_ok: {
    title: "Startproceduren för Nivå 0 är nu klar",
    image: "assets/images/Nivå 0.png",
    text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
    choices: []
  },

   level_1_start_of_mission_ok: {
      title: "Startproceduren för Nivå 1 är nu klar",
      image: "assets/images/Nivå 1.png",
      text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
      choices: []
  },
   
    level_2_start_of_mission_ok: {
      title: "Startproceduren för Nivå 2 är nu klar",
      image: "assets/images/Nivå 2.png",
      text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
      choices: []
  },
    
    level_ntc_start_of_mission_ok: {
    title: "Startproceduren för ATC-2 är nu klar",
    image: "assets/images/Nivå_NTC.png",
    text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
    choices: []
  },

};

