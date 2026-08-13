// ==========================
// NIVÅ 2
// ==========================

Object.assign(guide, {

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
            ["Dvärgbrytarna är i rätt läge men uppkoppling funkar inte", "gsmr_failure"],
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
    
    level_2_start_of_mission_ok: {
        title: "Startproceduren för Nivå 2 är nu klar",
        image: "assets/images/Nivå 2.png",
        text: "Systemet är klart för körning om du ser symbolen på bilden ovan efter att du tryckt 'Start'",
        choices: []
    }
     
});