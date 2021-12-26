const { Client, Message, CommandInteraction } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

/**
 *
 * @param {Client} client
 * @param {Message | CommandInteraction} msg
 * @param {string} type
 * @param {boolean} arg
 */
module.exports = async (client, msg, emiiter) => {
  let voiceChannel = msg.member.voice.channel;
  if (!voiceChannel)
    throw new TypeError("the member is not in a voice channel!.");
  if (msg.guild.me.voice.channel)
    throw new TypeError("the bot is already in a voice channel!.");
  const connection = await joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });
  connection;
  module.exports.connection = connection;
  emiiter.emit("connected", msg, connection, voiceChannel);
};
