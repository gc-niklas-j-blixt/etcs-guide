// ==========================
// NIVÅ NTC / ATC-2
// ==========================

Object.assign(guide, {

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
  
    level_ntc_start_of_mission_ok: {
        title: "Startproceduren för ATC-2 är nu klar",
        image: "assets/images/Nivå_NTC.png",
        text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
        choices: []
    }
     
});
