const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format, styletext } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");

// BMB
const s = {
    PREFIXE: "!",
    NOM_OWNER: "Mr. BMB",
    NUM_OWNER: "+255 711 782 669",
    MODE_PUBLIC: "oui" // Change to "non" if mode is private
};

zokou({ nomCom: "menu9", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = s.MODE_PUBLIC === "oui" ? "public" : "private";
    var emoji = { 
        "Général": "🌐", 
        "Logo": "🎨", 
        "hentai": "🔥", 
        "weeb": "🌸", 
        "Recherche": "🔍", 
        "conversion": "🌟", 
        "groupe": "♻️",
        "Téléchargement": "💾" 
    };
    
    cm.map(async (com) => { 
        if (!coms[com.categorie]) coms[com.categorie] = []; 
        coms[com.categorie].push(com.nomCom); 
    });

    const temps = moment(moment()).format("HH:MM:SS");
    moment.tz.setDefault('Africa/Dar es salaam').locale("id");
    const date = moment.tz("Africa/Dar es salaam").format("DD/MM/YYYY");
    console.log("date" + date);
    console.log("temps " + temps);

    let menuMsg = "  ═══ *B.M.B✨MD* ═══\n\n";
    menuMsg += `
╔════---------
║    Préfix : ${s.PREFIXE}
║    Owner : ${s.NOM_OWNER} (${s.NUM_OWNER})
║    Mode : ${mode}
║    Plugins : ${cm.length}
║    Date : ${date}
║    Time : ${temps}
║    Memory : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║    Platform : ${os.platform()}
╚════--------------- \n\n`;

    for (const cat in coms) {
        if (!emoji[cat]) {
            emoji[cat] = "🔋";
        }
        menuMsg += `${emoji[cat]} ══ *${cat}* ══ ${emoji[cat]}\n`;
        for (const cmd of coms[cat]) {
            menuMsg += "\t  ║ " + cmd + " \n";
        }
    }

    var link = "https://files.catbox.moe/lyd2y0.jpg";
    try {
        zk.sendMessage(dest, { image: { url: link }, caption: menuMsg, footer: "© B.M.B MD" }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
