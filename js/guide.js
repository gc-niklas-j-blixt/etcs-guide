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
      ["Direkt när jag börjar köra", "run_brake_start"]
    ],
  },

  run_brake_start: {
    title: "Bromsning direkt när du börjar köra (”Rullningsvakt”)",
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

  warn_atp_no_connction: {
    title: "Ingen kontakt med ATP",
    text: "Om detta felmeddelande viasas ska du säkerställa att tågskyddsystemet är påslaget korrekt. Du kan prova att starta om systmet genom att:\n\n1)Vrida huvudströmställaren till läge 'OFF'\n\n2)Vänta minst 10 sekunder.\n\n3)Slå på tågskyddsystemet genom att vrida huvudströmställaren till läge 'ON'.\n\n4)Observera att uppstarten av systemet tar 120 sekunder. Om systemet startar upp korrekt så ska DMI visa något utav följande:",
    choices: [
      ["Menyn 'Föraridentitet", "dmi_driver_id"],
      ['Förarhytt inte aktiv',"cab_activation"],
    ],
  },

  dmi_driver_id: {
    title: "Mata in och bekräfta föraridentitet",
    text: "Fyll i uppgifter enligt instruktion på DMI och bekräfta.",
    choices: [
      ["Föraridentitet inmatat","dmi_brake_test"],
    ],
  },

  warn_traction_cutoff: {
    title: "ETCS – Traction cut‑off inte tillgänglig",
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
      ["Mer information", "warn_traction_cutoff_info"]
    ]
  },

  warn_traction_cutoff_info: {
    title: "Information – Traction cut‑off",
    text:
      "Detta är normalt inte ett stoppande fel. Du kan oftast fortsätta proceduren som vanligt.\n\n" +
      "Om meddelandet kvarstår efter slutfört bromstest och färdigt SoM bör felet felanmälas enligt rutin.",
    choices: []
  },

  // ======== GENERELL FELSIDA ========

  driving_failure: {
    title: "Felanmäl enligt gällande rutin",
    text: "Detta steg avslutar guiden. Följ er ordinarie felanmälningsprocess.",
    choices: []
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
    text: "Kontrollera att dvärgbrytarna är i korrekt läge enligt fordonets instruktion.",
    choices: [
      ["Ja, men DMI är fortfarande svart", "dmi_boot_failure"],
      ["Nej, jag har inte kontrollerat dvärgbrytarna", "dmi_cb_reset"]
    ]
  },

  dmi_cb_reset: {
    title: "Kontrollera att dvärgbrytarna är i rätt läge",
    text: "Sätt dvärgbrytarna i rätt läge och prova igen.",
    choices: [
      ["Dvärgbrytarna var i rätt läge, men DMI är fortfarande svart", "dmi_boot_failure"],
      ["Dvärgbrytarna var i fel läge, nu är de återställda", "dmi_display_check"]
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
      ["DMI visar menyn 'Föraridentitet'", "dmi_driver_identity"],
      ["ETCS – Traction cut‑off inte tillgänglig", "warn_traction_cutoff"],
      ["Förarhytt inte aktiv", "cab_activation"],
      ["Ingen kontakt med ATP", "driving_failure"],
      
    ]
  },



  cab_activation: {
    title: "Aktivera förarhytten",
    text: "Aktivera hytten enligt rutin och invänta DMI-reaktion.",
    choices: [
      ["Hytten är aktiverad men DMI reagerar inte", "cab_activation_failure"],
      ["Nu har jag aktiverat hytten", "dmi_driver_identity"]
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
    text: "Tryck på 'JA' eller inom den gula rutan om alternativen 'JA/NEJ' inte visas.",
    choices: [
      ["ETCS-bromstest lyckades", "dmi_level"],
      ["ETCS-bromstest lyckades, men 'ETCS – traction cut off inte tillgänglig' visas", "traction_cut_off_failure"],
      ["Går inte att starta bromstest", "check_brake_handle"]
    ]
  },

  traction_cut_off_failure: {
    title: "Traction cut off – inte tillgänglig",
    text: "Felet är inte stoppande men behöver utredas. Felanmäl enligt gällande rutin och gå vidare.",
    choices: [
      ["Fortsätt", "dmi_level"]
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
    title: "Huvudmeny visas",
    text: "Tryck på knappen 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_0_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_0_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_0_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_0_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_0_dmi_select_atc"]
    ]
  },

  level_0_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    text: "Välj ATC-variant enligt instruktionsbehov.",
    choices: [
      ["Fortsätt", "level_0_dmi_traindata_entry_atc"]
    ]
  },

  level_0_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [
      ["Fortsätt", "level_0_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_0_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_0_dmi_train_id"]
    ]
  },

  level_0_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [
      ["Fortsätt", "level_0_dmi_main_menu_start_btn"]
    ]
  },

  level_0_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "start_of_mission_ok"],
      ["Det går inte att trycka på 'Start'", "level_0_dmi_main_menu"]
    ]
  },

  // ----- Nivå 1 -----
  level_1_dmi_main_menu: {
    title: "Huvudmeny visas",
    text: "Tryck på knappen 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_1_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_1_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_1_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_1_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_1_dmi_select_atc"]
    ]
  },

  level_1_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    choices: [
      ["Fortsätt", "level_1_dmi_traindata_entry_atc"]
    ]
  },

  level_1_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [
      ["Fortsätt", "level_1_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_1_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_1_dmi_train_id"]
    ]
  },

  level_1_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [
      ["Fortsätt", "level_1_dmi_main_menu_start_btn"]
    ]
  },

  level_1_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "level_1_start_of_mission"],
      ["Det går inte att trycka på 'Start'", "level_1_dmi_main_menu"]
    ]
  },

  level_1_start_of_mission: {
    title: "Kvittera symbolen 'Särskilt ansvar'",
    text: "Håll den intryckt i minst 2 sekunder.",
    choices: [
      ["Fortsätt", "start_of_mission_ok"]
    ]
  },

  // ----- Nivå 2 -----
  level_2_dmi_menu_rbc_contact: {
    title: "RBC kontakt",
    text: "Efter att du valt nivå visas 'RBC kontakt'. Tryck 'Ange RBC-data'.",
    choices: [
      ["Fortsätt", "level_2_dmi_menu_rbc_data"]
    ]
  },

  level_2_dmi_menu_rbc_data: {
    title: "Ange RBC-data",
    text: "Knappa in 'RBC ID' och 'Telefonnummer' till RBC du ska koppla upp mot. Tryck 'JA'.",
    choices: [
      ["RBC Data inmatat", "level_2_dmi_rbc_connection_check"]
    ]
  },

  level_2_dmi_rbc_connection_check: {
    title: "Kontroll av RBC-förbindelse",
    text: "DMI visar huvudmeny och symbol för 'RBC-förbindelse upprättad' om anslutningen lyckas.",
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
      ["Dvärgbrytarna är i fel läge och går inte att återställa", "gsmr_failure"]
    ]
  },

  gsmr_failure: {
    title: "Felanmäl: RBC-förbindelse / modem fungerar ej",
    text: "Felanmäl enligt gällande rutin.",
    choices: []
  },

  level_2_dmi_main_menu: {
    title: "Huvudmeny visas",
    text: "Tryck på 'Tågdata' och följ ordinarie process för Nivå 2.",
    choices: [
      ["Fortsätt", "level_2_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_2_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_2_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_2_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_2_dmi_select_atc"]
    ]
  },

  level_2_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    choices: [
      ["Fortsätt", "level_2_dmi_traindata_entry_atc"]
    ]
  },

  level_2_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [
      ["Fortsätt", "level_2_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_2_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_2_dmi_train_id"]
    ]
  },

  level_2_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [
      ["Fortsätt", "level_2_dmi_main_menu_start_btn"]
    ]
  },

  level_2_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "start_of_mission_ok"],
      ["Det går inte att trycka på 'Start'", "level_2_dmi_main_menu"]
    ]
  },

  // ======== NTC ========

  level_ntc_dmi_main_menu: {
    title: "Huvudmeny visas",
    text: "Tryck på 'Tågdata'.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_confirm_traindata_entry_etcs"]
    ]
  },

  level_ntc_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_confirm_traindata_summary_etcs"]
    ]
  },

  level_ntc_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_select_atc"]
    ]
  },

  level_ntc_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    choices: [
      ["Fortsätt", "level_ntc_dmi_traindata_entry_atc"]
    ]
  },

  level_ntc_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_confirm_traindata_entry_atc"]
    ]
  },

  level_ntc_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [
      ["Fortsätt", "level_ntc_dmi_train_id"]
    ]
  },

  level_ntc_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [
      ["Fortsätt", "level_ntc_dmi_main_menu_start_btn"]
    ]
  },

  level_ntc_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "level_ntc_start_of_mission"],
      ["Det går inte att trycka på 'Start'", "level_ntc_dmi_main_menu"]
    ]
  },

  level_ntc_start_of_mission: {
    title: "Start of Mission initieras",
    text: "Följ DMI-instruktioner tills SoM är klar.",
    choices: [
      ["Fortsätt", "start_of_mission_ok"]
    ]
  },

  // ======== SLUT ========

  start_of_mission_ok: {
    title: "Startproceduren är nu klar",
    text: "Systemet är klart för körning.",
    choices: []
  }
};