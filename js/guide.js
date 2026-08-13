// guide.js (rensad/standardiserad)
// Uppbyggnad: title (sträng), text (valfri), image (valfri), choices (array av [label, target])

const guide = {



  // ======== BROMSNING UNDER KÖRNING ========





  

 
  

  


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

