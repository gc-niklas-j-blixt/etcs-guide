// guide.js (rensad/standardiserad)
// Uppbyggnad: title (sträng), text (valfri), image (valfri), choices (array av [label, target])

const guide = {
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
        ["En varning visas på DMI", "under_uppbyggnad"],
        ["Tåget bromsar oväntat", "under_uppbyggnad"],
        ["Radio / RBC-problem", "under_uppbyggnad"],
        ["ATC / NTC övergångsproblem", "under_uppbyggnad"],
        ["Annat problem", "under_uppbyggnad"]
    ]
},


  driving_failure: {
    title: "Felanmäl enligt gällande rutin",
    text: "Detta steg avslutar guiden. Följ er ordinarie felanmälningsprocess.",
    choices: []
  },

  
under_uppbyggnad: {
    title: "Denna del av guiden är under uppbyggnad",
    text: "Det här steget är inte färdigt ännu. Funktionen kommer att läggas in i kommande version.",
    help: "Detta är en testversion av verktyget. Fler steg och funktioner läggs in löpande.",
    choices: [
        ["Tillbaka", "start"]
    ]
},


  // ======== DMI Uppstart ========

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
      ["DMI visar 'ETCS – traction cut off inte tillgänglig' och menyn 'Föraridentitet'", "dmi_driver_identity"],
      ["Förarhytt inte aktiv", "cab_activation"],
      ["Ingen kontakt med ATP", "driving_failure"],            // tidigare saknade mål
      ["Inget av ovanstående", "driving_failure"]              // tidigare saknade mål
    ]
  },

  dmi_driver_identity: {
    title: "Mata in och bekräfta föraridentitet",
    text: "Fyll i uppgifter enligt instruktion på DMI och bekräfta.",
    choices: [
      ["Föraridentitet inmatad", "dmi_brake_test"]
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

  // ======== Bromstest ========

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

  // ======== Nivåval och tågdata (ETCS/ATC/NTC) ========

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
    choices: [["Fortsätt", "level_0_dmi_confirm_traindata_entry_etcs"]]
  },

  level_0_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [["Fortsätt", "level_0_dmi_confirm_traindata_summary_etcs"]]
  },

  level_0_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_0_dmi_select_atc"]]
  },

  level_0_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    text: "Välj ATC-variant enligt instruktionsbehov.",
    choices: [["Fortsätt", "level_0_dmi_traindata_entry_atc"]]
  },

  level_0_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [["Fortsätt", "level_0_dmi_confirm_traindata_entry_atc"]]
  },

  level_0_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_0_dmi_train_id"]]
  },

  level_0_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [["Fortsätt", "level_0_dmi_main_menu_start_btn"]]
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
    choices: [["Fortsätt", "level_1_dmi_confirm_traindata_entry_etcs"]]
  },

  level_1_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [["Fortsätt", "level_1_dmi_confirm_traindata_summary_etcs"]]
  },

  level_1_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_1_dmi_select_atc"]]
  },

  level_1_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    choices: [["Fortsätt", "level_1_dmi_traindata_entry_atc"]]
  },

  level_1_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [["Fortsätt", "level_1_dmi_confirm_traindata_entry_atc"]]
  },

  level_1_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_1_dmi_train_id"]]
  },

  level_1_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [["Fortsätt", "level_1_dmi_main_menu_start_btn"]]
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
    choices: [["Fortsätt", "start_of_mission_ok"]]
  },

  // ----- Nivå 2 -----
  level_2_dmi_menu_rbc_contact: {
    title: "RBC kontakt",
    text: "Efter att du valt nivå visas 'RBC kontakt'. Tryck 'Ange RBC-data'.",
    choices: [["Fortsätt", "level_2_dmi_menu_rbc_data"]]
  },

  level_2_dmi_menu_rbc_data: {
    title: "Ange RBC-data",
    text: "Knappa in 'RBC ID' och 'Telefonnummer' till RBC du ska koppla upp mot. Tryck 'JA'.",
    choices: [["RBC Data inmatat", "level_2_dmi_rbc_connection_check"]]
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
    choices: [["Fortsätt", "level_2_dmi_confirm_traindata_entry_etcs"]]
  },

  level_2_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [["Fortsätt", "level_2_dmi_confirm_traindata_summary_etcs"]]
  },

  level_2_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_2_dmi_select_atc"]]
  },

  level_2_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    choices: [["Fortsätt", "level_2_dmi_traindata_entry_atc"]]
  },

  level_2_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet, välj sedan 'JA'.",
    choices: [["Fortsätt", "level_2_dmi_confirm_traindata_entry_atc"]]
  },

  level_2_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_2_dmi_train_id"]]
  },

  level_2_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [["Fortsätt", "level_2_dmi_main_menu_start_btn"]]
  },

  level_2_dmi_main_menu_start_btn: {
    title: "Tryck på knappen 'Start'",
    choices: [
      ["Fortsätt", "start_of_mission_ok"],
      ["Det går inte att trycka på 'Start'", "level_2_dmi_main_menu"]
    ]
  },

  // ----- NTC -----
  level_ntc_dmi_main_menu: {
    title: "Huvudmeny visas",
    text: "Tryck på 'Tågdata'.",
    choices: [["Fortsätt", "level_ntc_dmi_confirm_traindata_entry_etcs"]]
  },

  level_ntc_dmi_confirm_traindata_entry_etcs: {
    title: "Godkänn ETCS-tågdata",
    text: "Säkerställ att grundinställningarna stämmer. Tryck 'JA'.",
    choices: [["Fortsätt", "level_ntc_dmi_confirm_traindata_summary_etcs"]]
  },

  level_ntc_dmi_confirm_traindata_summary_etcs: {
    title: "Bekräfta sammanfattning av ETCS-tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_ntc_dmi_select_atc"]]
  },

  level_ntc_dmi_select_atc: {
    title: "Välj ATC SE/NO",
    choices: [["Fortsätt", "level_ntc_dmi_traindata_entry_atc"]]
  },

  level_ntc_dmi_traindata_entry_atc: {
    title: "Godkänn ATC SE/NO tågdata",
    text: "Tryck på varje fält för att bekräfta värdet.",
    choices: [["Fortsätt", "level_ntc_dmi_confirm_traindata_entry_atc"]]
  },

  level_ntc_dmi_confirm_traindata_entry_atc: {
    title: "Bekräfta sammanfattningen av ATC SE/NO tågdata",
    text: "Tryck 'JA' för att bekräfta.",
    choices: [["Fortsätt", "level_ntc_dmi_train_id"]]
  },

  level_ntc_dmi_train_id: {
    title: "Ange och bekräfta Tågnummer",
    choices: [["Fortsätt", "level_ntc_dmi_main_menu_start_btn"]]
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
    choices: [["Fortsätt", "start_of_mission_ok"]]
  },

  // ----- Slutsteg -----
  start_of_mission_ok: {
    title: "Startproceduren är nu klar",
    text: "Systemet är klart för körning.",
    choices: []
  }
};
``