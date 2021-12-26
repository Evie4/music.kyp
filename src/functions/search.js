const { Client, Message, CommandInteraction } = require("discord.js");
const yt = require("yt-search");

/**
 *
 * @param {Client} client
 * @param {Message | CommandInteraction} msg
 * @param {string} type
 * @param {string} songName
 */
module.exports = async (client, msg, arg, emiiter) => {
  // const result = await yt.search(String(arg)).then(values => values.videos.map(value => value));
  const result = (await yt.search(String(arg))).videos.map((value) => value);
  emiiter.emit("search", msg, arg, result);
};
