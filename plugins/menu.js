const config = require('../config')
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
  pattern: "menu",
  alias: ["allmenu", "bmb"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "🔰",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Pakua picha kutoka URL
    const imageUrl = "https://files.catbox.moe/8otj3h.jpg";
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Header ya fixed na idadi ya commands
    const dec = `
╭━〔*🪀 ELLY TECH 🪀*〕━━┈⊷
┃❒╭────────────
┃❒│ 👑 *ʀᴜɴᴛɪᴍᴇ:* ${runtime(process.uptime())}
┃❒│ 🕹️ *ᴍᴏᴅᴇ:* *${config.MODE}*
┃❒│ 🎯 *ᴘʀᴇғɪx:* *${config.PREFIX}*
┃❒│ 💡 *ʀᴀᴍ ᴜsᴇ:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} GB / ${Math.round(require('os').totalmem / 1024 / 1024)} GB
┃❒│ 👑 *ᴅᴇᴠ:* *𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷*
┃❒│ 🚀 *ᴠᴇʀsɪᴏɴ:* *1.0.0*
┃❒│ 📜 *commands:* ${commands.size}
┃❒╰────────────────
╰━━━━━━━━━━━━━━━━━━┈⊷`;

    // Group commands by category
    const categories = {};
    for (let command of commands.values()) {
      if (!categories[command.category]) categories[command.category] = [];
      categories[command.category].push(command);
    }

    // Prepare sections for list message
    const sections = [];
    for (let [category, cmds] of Object.entries(categories)) {
      sections.push({
        title: `${category.toUpperCase()} - ${cmds.length} commands`,
        rows: cmds.map(c => ({
          title: c.use || c.pattern,
          description: c.desc || 'No description',
          rowId: c.use || c.pattern
        }))
      });
    }

    // Create the list message
    const listMessage = {
      text: dec + `\n\nTotal commands: ${commands.size}`,
      footer: 'Powered by 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 🔥',
      title: 'MAIN MENU',
      buttonText: 'Open Menu',
      sections
    };

    // Tuma message na contextInfo kama ulivyotaka
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
            newsletterName: '𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷',
            serverMessageId: 143
          }
        },
        ...listMessage
      },
      { quoted: m }
    );

  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
