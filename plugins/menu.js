const config = require('../config');
const { cmd, commands } = require('../command');
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
  desc: "Show bot menu",
  category: "menu",
  react: "🪀",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Picha kutoka link
    const imageUrl = 'https://files.catbox.moe/8otj3h.jpg';

    // group commands by category
    const grouped = {};
    for (const c of commands) {
      if (!grouped[c.category]) grouped[c.category] = [];
      grouped[c.category].push(c);
    }

    // tengeneza string ya commands
    let commandsList = '';
    for (const cat in grouped) {
      commandsList += `\n╭━〔 *${cat.toUpperCase()}* 〕━⊷\n`;
      for (const c of grouped[cat]) {
        commandsList += `┃❒ ${config.PREFIX}${c.pattern}\n`;
      }
      commandsList += `╰━━━━━━━━━━━━━⊷\n`;
    }

    let dec = `
╭━〔 🤖 ELLY TECH 🤖 〕━━┈⊷
┃❒╭────────────
┃❒│ 👑 *Runtime:* ${runtime(process.uptime())}
┃❒│ 🕹️ *Mode:* *${config.MODE}*
┃❒│ 🎯 *Prefix:* *${config.PREFIX}*
┃❒│ 💡 *RAM Use:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
┃❒│ 👑 *Dev:* *𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷*
┃❒│ 🚀 *Version:* *1.0.0*
┃❒╰────────────────
╰━━━━━━━━━━━━━━━━━━┈⊷
${commandsList}
> powered by Elly tech 
`;

    await conn.sendMessage(
      from,
      {
        image: { url: imageUrl },  // << Hapa tunatumia link ya picha
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
    console.log("Menu Error:", e);
    reply(`${e}`);
  }
});
