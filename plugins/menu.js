const config = require('../config');
const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { runtime } = require('../lib/functions');

const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "ELLY XMD VERIFIED ✅",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:B.M.B VERIFIED ✅
ORG:B.M.B TECH BOT;
TEL;type=CELL;type=VOICE;waid=255767862457:+255767862457
END:VCARD`
    }
  }
};

cmd({
  pattern: "menu",
  alias: ["allmenu", "command"],
  use: '.menu',
  desc: "menu the bot",
  category: "menu",
  react: "🪀",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    const imagePath = path.join(__dirname, '..', 'plugins', `menu${randomIndex}.jpg`);
    const imageBuffer = fs.readFileSync(imagePath);

    // Panga commands kwa category
    const grouped = {};
    for (const c of commands) {
      if (!grouped[c.category]) grouped[c.category] = [];
      grouped[c.category].push(c);
    }

    // Tengeneza string ya commands zilizopangwa
    let commandsList = '';
    for (const cat in grouped) {
      commandsList += `\n╭━━〔 *${cat.toUpperCase()}* 〕━━⊷\n`;
      for (const c of grouped[cat]) {
        commandsList += `┃❒ ${config.PREFIX}${c.pattern}\n`;
      }
      commandsList += `╰━━━━━━━━━━━━━━━⊷\n`;
    }

    let dec = `
╭━〔*🤖 ELLY TECH 🤖*〕━━┈⊷
┃❒╭────────────
┃❒│ 👑 *ʀᴜɴᴛɪᴍᴇ:* ${runtime(process.uptime())}
┃❒│ 🕹️ *ᴍᴏᴅᴇ:* *${config.MODE}*
┃❒│ 🎯 *ᴘʀᴇғɪx:* *${config.PREFIX}*
┃❒│ 💡 *ʀᴀᴍ ᴜsᴇ:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
┃❒│ 👑 *ᴅᴇᴠ:* *𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙃*
┃❒│ 🚀 *ᴠᴇʀsɪᴏɴ:* *1.0.0*
┃❒╰────────────────
╰━━━━━━━━━━━━━━━━━━┈⊷
${commandsList}
> powered by Elly tech 
`;

    await conn.sendMessage(
      from,
      {
        image: imageBuffer,
        caption: dec,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363382023564830@newsletter',
            newsletterName: 'ELLY TECH',
            serverMessageId: 143
          }
        }
      },
      { quoted: quotedContact }
    );

  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
