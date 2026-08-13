// ==========================
// NIVÅ 0
// ==========================

Object.assign(guide, {

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
  
  
    level_0_start_of_mission_ok: {
        title: "Startproceduren för Nivå 0 är nu klar",
        image: "assets/images/Nivå 0.png",
        text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
        choices: []
    },
});