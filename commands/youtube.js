const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");
const ytSearch = require("yt-search");
const path = require("path");

// Play (Audio) Command
adams(
{
nomCom: "play",
aliases: ["song", "audio", "mp3"],
categorie: "Search",
reaction: "🎵",
},
async (dest, zk, commandOptions) => {
const { arg, ms, repondre } = commandOptions;

if (!arg[0]) {      
  return repondre("Please provide a song name.");      
}      
  
const query = arg.join(" ");      
  
try {      
  const searchResults = await ytSearch(query);      
  if (!searchResults.videos.length) {      
    return repondre("No video found for the specified query.");      
  }      
  
  const firstVideo = searchResults.videos[0];      
  const videoUrl = firstVideo.url;      
  const videoTitle = firstVideo.title;      
  const videoDuration = firstVideo.timestamp;      
  const videoThumbnail = firstVideo.thumbnail;      
  const videoChannel = firstVideo.author.name;      
  
  await zk.sendMessage(      
    dest,      
    {      
      text: `♻️ ELLY 𝐗𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ♻️\n📌 *Title:* ${videoTitle}\n🎭 *Channel:* ${videoChannel}\n⏳ *Duration:* ${videoDuration}\n\n®2025 ʙᴍʙ xᴍᴅ 🔥`,      
      contextInfo: {      
        externalAdReply: {      
          title: "©𝙱.𝙼.𝙱-𝚇𝙼𝙳",      
          body: "Faster bot",      
          mediaType: 1,      
          thumbnailUrl: "https://files.catbox.moe/frbgnh.jpg",      
          renderLargerThumbnail: false,      
          showAdAttribution: true,      
        },      
      },      
    },      
    { quoted: ms }      
  );      
  
  const processingMsg = await zk.sendMessage(      
    dest,      
    { text: "⏳ Your audio is being processed, just a moment..." },      
    { quoted: ms }      
  );      
  
  const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;      
  const response = await axios.get(apiUrl).then((res) => res.data).catch(() => null);      
  
  if (!response || !response.success || !response.result.download_url) {      
    await zk.sendMessage(dest, { text: "❌ Failed to download. Try again later.", edit: processingMsg.key });      
    return;      
  }      
  
  const downloadUrl = response.result.download_url;      
  const tempFile = path.join(__dirname, "audio.mp3");      
  
  const writer = fs.createWriteStream(tempFile);      
  const audioStream = await axios({ url: downloadUrl, method: "GET", responseType: "stream" });      
  audioStream.data.pipe(writer);      
  
  await new Promise((resolve, reject) => {      
    writer.on("finish", resolve);      
    writer.on("error", reject);      
  });      
  
  await zk.sendMessage(dest, { delete: processingMsg.key });      
  
  await zk.sendMessage(      
    dest,      
    {      
      audio: fs.readFileSync(tempFile),      
      mimetype: "audio/mp4",      
      contextInfo: {      
        externalAdReply: {      
          title: videoTitle,      
          body: `🎶 ${videoTitle} | Duration: ${videoDuration}`,      
          mediaType: 1,      
          thumbnailUrl: videoThumbnail,      
          renderLargerThumbnail: true,      
          showAdAttribution: true,      
        },      
      },      
    },      
    { quoted: ms }      
  );      
  
  fs.unlinkSync(tempFile);      
} catch (error) {      
  console.error("Error during download process:", error.message);      
  return repondre(`❌ Download failed: ${error.message || error}`);      
}

}
);

// Video Command
zokou(
{
nomCom: "video",
aliases: ["vid", "mp4"],
categorie: "Search",
reaction: "🎥",
},
async (dest, zk, commandOptions) => {
const { arg, ms, repondre } = commandOptions;

if (!arg[0]) {      
  return repondre("Please provide a video name.");      
}      
  
const query = arg.join(" ");      
  
try {      
  const searchResults = await ytSearch(query);      
  if (!searchResults.videos.length) {      
    return repondre("No video found for the specified query.");      
  }      
  
  const firstVideo = searchResults.videos[0];      
  const videoUrl = firstVideo.url;      
  const videoTitle = firstVideo.title;      
  const videoDuration = firstVideo.timestamp;      
  const videoThumbnail = firstVideo.thumbnail;      
  const videoChannel = firstVideo.author.name;      
  
  await zk.sendMessage(      
    dest,      
    {      
      text: `📽️ ELLY 𝐗𝐌𝐃 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 📽️\n📌 *Title:* ${videoTitle}\n🎭 *Channel:* ${videoChannel}\n⏳ *Duration:* ${videoDuration}\n\n®2025 ʙᴍʙ xᴍᴅ 🔥`,      
      contextInfo: {      
        externalAdReply: {      
          title: "©𝙱.𝙼.𝙱-𝚇𝙼𝙳",      
          body: "Faster bot",      
          mediaType: 1,      
          thumbnailUrl: "https://files.catbox.moe/frbgnh.jpg",      
          renderLargerThumbnail: false,      
          showAdAttribution: true,      
        },      
      },      
    },      
    { quoted: ms }      
  );      
  
  const processingMsg = await zk.sendMessage(      
    dest,      
    { text: "⏳ Your video is being processed, just a moment..." },      
    { quoted: ms }      
  );      
  
  const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;      
  const response = await axios.get(apiUrl).then((res) => res.data).catch(() => null);      
  
  if (!response || !response.success || !response.result.download_url) {      
    await zk.sendMessage(dest, { text: "❌ Failed to download. Try again later.", edit: processingMsg.key });      
    return;      
  }      
  
  const downloadUrl = response.result.download_url;      
  const tempFile = path.join(__dirname, "video.mp4");      
  
  const writer = fs.createWriteStream(tempFile);      
  const videoStream = await axios({ url: downloadUrl, method: "GET", responseType: "stream" });      
  videoStream.data.pipe(writer);      
  
  await new Promise((resolve, reject) => {      
    writer.on("finish", resolve);      
    writer.on("error", reject);      
  });      
  
  await zk.sendMessage(dest, { delete: processingMsg.key });      
  
  await zk.sendMessage(      
    dest,      
    {      
      video: fs.readFileSync(tempFile),      
      mimetype: "video/mp4",      
      contextInfo: {      
        externalAdReply: {      
          title: videoTitle,      
          body: `📽️ ${videoTitle} | Duration: ${videoDuration}`,      
          mediaType: 1,      
          thumbnailUrl: videoThumbnail,      
          renderLargerThumbnail: true,      
          showAdAttribution: true,      
        },      
      },      
    },      
    { quoted: ms }      
  );      
  
  fs.unlinkSync(tempFile);      
} catch (error) {      
  console.error("Error during download process:", error.message);      
  return repondre(`❌ Download failed: ${error.message || error}`);      
}

}
);