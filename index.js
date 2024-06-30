
const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Bot durumu değişti✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to : http://localhost:${port}`);
  console.log(`🔗 :D`);
});


const statusMessages = ["SoulSoftware","discord.gg/soulsoftware"];


let currentIndex = 0;
const channelId = '';

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}



function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
   
    textChannel.send(`Bot status is: ${currentStatus}`);
  } else {

  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot Hazır ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨ Yükleniyor`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️ Yüklendi`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});




const db = require("croxydb")
const { PermissionsBitField, Message } = require("discord.js");
const {  EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { execute } = require("../events/ready");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("botavatar")
      .setDescription("Botunuzun gifini hareketli yapar")
      .addAttachmentOption(option => 
        option.setName('gif')
        .setDescription('Botunun olacak gifi ekle')
        .setRequired(true)),
        run: async (client, interaction) => {    
            const { options } = interaction;
    const avatar = options.getAttachment("gif")
    if (interaction.user.id !== "sizinİDniz") return interaction.reply({content: "Bu komutu sadece kurucum kullanabilir kardeşim."});


if (avatar.contentType !== "image/gif") interaction.reply('Gif kullanmalısın kardeşim.')
else {

 client.user.setAvatar(avatar.url)


 return interaction.reply('Başarıyla avatarım değişti.');
}
}
};
login();
