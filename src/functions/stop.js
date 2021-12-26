const { Client, Message, CommandInteraction } = require("discord.js");
const data = require("../data/database/map");

/**
 *
 * @param {Client} client
 * @param {Message | CommandInteraction} msg
 * @param {string} type
 * @param {string} songName
 */
module.exports = async (client, msg, emiiter) => {
  let player = require("./play").player;
  if (!player) throw new TypeError("thare are no music playing!?.");
  let guildData = data.get(msg.guild.id);
  if (!guildData) throw new TypeError("thare are no server queue!?.");
  let voiceChannel = msg.member.voice.channel;
  if (!voiceChannel)
    throw new TypeError("the member is not in a voice channel!.");
  if (msg.guild.me.voice.channel) {
    if (msg.guild.me.voice.channelId !== msg.member.voice.channelId)
      throw new TypeError(
        "the member have to be in the same voice channel the bot in!."
      );
  }
  // msg.guild.me.voice.setMute(true);
  guildData.connection.destroy(true);
  data.delete(msg.guild.id);
  player.stop();
  emiiter.emit("stopSong", msg);
};
