// ==========================
// RBC / RADIO – FEL UNDER KÖRNING
// ==========================

Object.assign(guide, {

    // ---- RBC / Radio ----

    warn_no_rbc_connection: {
        title: "Vilket av följande meddelanden ser du på DMI?",
        keywords: [
  "kommunikationsfel",
  "ingen radioförbindelse möjlig",
  "ingen radioförbindelse",
  "RBC kontakt saknas",
  "RBC ingen kontakt",
  "RBC kommunikationsfel",
  "radiofel",
  "GSM-R fel",
  "GSMR fel",
  "ingen kontakt med RBC"
],
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
    }
});