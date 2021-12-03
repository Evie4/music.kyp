const { Client, Message, MessageEmbed } = require("discord.js");
const player = require("../index").player;

module.exports = {
    name: "search",

    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     */

    run: (client, msg) => {
        msg.channel.send({
            content: "Hold On...",
            allowedMentions: {
                repliedUser: false
            }
        }).then((message) => {
            let arg = msg.content.split(" ").slice(1).join(" ");
            if (!arg) return message.edit({
                content: "please insert the song name after the command!?.",
                allowedMentions: {
                    repliedUser: false
                }
            });
            player.search(msg, arg);
            player.events.on("search", (msg, arg, result) => {
                let results = result.map((song, index) => `#${index} - [${song.title}](${song.url})`).slice(0, 10).join("\n")
                let embed = new MessageEmbed()
                    .setColor("AQUA")
                    .setDescription(results)
                message.edit({
                    content: "search result for: " + arg,
                    embeds: [embed]
                });
            });
        });
    }
}