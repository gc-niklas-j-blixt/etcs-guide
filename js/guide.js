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
      ["Tåget bromsar oväntat", "run_brake_issue"],
      ["Radio / RBC-problem", "under_uppbyggnad"],
      ["ATC / NTC övergångsproblem", "under_uppbyggnad"],
      ["Annat problem", "under_uppbyggnad"]
    ]
  },

  // ======== BROMSNING UNDER KÖRNING ========

  run_brake_issue: {
    title: "När sker den oväntade bromsningen?",
    text: "Välj det alternativ som bäst matchar situationen.",
    choices: [
      ["Direkt när jag börjar köra", "run_brake_start"],
      ["I samband med balis/passagemarkering", "under_uppbyggnad"],
      ["Plötsligt under färd (utan tydlig händelse)", "under_uppbyggnad"],
      ["När hastighetsgräns sänks eller vid tavla", "under_uppbyggnad"]
    ]
  },

  run_brake_start: {
    title: "Bromsning direkt när du börjar köra",
    text: "ETCS kan begära broms direkt vid start om systemet inte är redo för att ge körbesked.",
    help: "Vanliga orsaker:\n\n• 'Start of Mission' inte slutförd\n• Tågdata ej bekräftade\n• Bromstest ej avslutat\n• Radio/RBC inte ansluten\n• Systemet saknar korrekt position",
    choices: [
      ["Kontrollera om 'Rullningsvakt aktiverad' visas", "run_brake_start_rollningsvakt_q"]
    ]
  },

  run_brake_start_rollningsvakt_q: {
    title: "Visas meddelandet 'Rullningsvakt aktiverad'?",
    text: "Titta på DMI efter start och bekräfta om meddelandet visas.",
    choices: [
      ["Ja, 'Rullningsvakt aktiverad' visas", "run_brake_start_rollningsvakt_info"],
      ["Nej, jag ser inte detta meddelande", "under_uppbyggnad"]
    ]
  },

  run_brake_start_rollningsvakt_info: {
    title: "Rullningsvakt aktiverad",
    text: "Detta kan visas vid start när systemet säkrar att fordonet inte rullar oavsiktligt.",
    help: "Viktigt:\n\n• Inte ett stoppande fel.\n• Försvinner vanligtvis när bromstest och systemets initiala kontroller är slutförda.\n• Om meddelandet kvarstår efter korrekt bromstest bör felet felanmälas.",
    choices: []
  },

  // ======== DMI-VARNINGAR ========

  run_dmi_warning: {
    title: "Vilken typ av varning visas på DMI?",
    text: "Välj det alternativ som bäst matchar det du ser på skärmen.",
    choices: [
      ["ETCS – Traction cut‑off inte tillgänglig", "warn_traction_cutoff"],
      ["Annat textmeddelande", "under_uppbyggnad"]
    ]
  },

  warn_traction_cutoff: {
    title: "ETCS – Traction cut‑off inte tillgänglig",
    text: "ETCS kan inte aktivera traction cut‑off i detta läge. Detta är vanligtvis inte ett stoppande fel.",
    help: "Vanliga orsaker:\n\n• Pågående bromstest\n• Tågdata inte fullständigt bekräftade\n• SoM inte avslutad\n• Systembyte eller knappvalssekvens\n\nMeddelandet brukar försvinna när systemet är klart.",
    choices: [
      ["Mer information", "warn_traction_cutoff_info"]
    ]
  },

  warn_traction_cutoff_info: {
    title: "Information om felet",
    text: "Detta är normalt inte ett stoppande fel. Du kan oftast fortsätta proceduren som vanligt.",
    help: "Meddelandet försvinner vanligtvis när bromstest är klart och systemet är redo.\n\nOm meddelandet ligger kvar efter korrekt genomfört bromstest bör felet felanmälas.",
    choices: []
  },

  // ======== GENERELL FELSIDA ========

  driving_failure: {
    title: "Felanmäl enligt gällande rutin",
    text: "Detta steg avslutar guiden. Följ er ordinarie felanmälningsprocess.",
    choices: []
  },

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
      ["DMI visar 'ETCS – traction cut off inte tillgänglig' och menyn 'Föraridentitet'", "dmi_driver_identity"],
      ["Förarhytt inte aktiv", "cab_activation"],
      ["Ingen kontakt med ATP", "driving_failure"],
      ["Inget av ovanstående", "driving_failure"]
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