const { Client, Message, CommandInteraction } = require("discord.js");

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
  if (!msg.guild.me.voice.channel)
    throw new TypeError("the bot is not in a voice channel!.");
  const connection = require("./connect").connection;
  if (!connection) return;
  connection.disconnect();
  emiiter.emit("disconnected", msg, connection, voiceChannel);
};
