// ==========================
// NIVÅ 1
// ==========================

Object.assign(guide, {

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
  
    level_1_start_of_mission_ok :{
        title: "Startproceduren för Nivå 1 är nu klar",
        image: "assets/images/Nivå 1.png",
        text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
        choices: []   }
 
});