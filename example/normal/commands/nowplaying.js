const { Client, Message, MessageEmbed } = require("discord.js");
const { Queue } = require("music.kyp")
const player = require("../index").player;

module.exports = {
    name: "nowplaying",

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
            let queue = Queue.get(msg.guildId);
            if (!queue) return message.edit({
                content: `thare are no server queue!?.`,
                allowedMentions: {
                    repliedUser: false
                }
            });
            let embed = new MessageEmbed()
                .setColor("AQUA")
                .setDescription("Now Playing: [" + queue.songs[0].details.title + "](" + queue.songs[0].url + ")")
            message.edit({
                content: "now playing...",
                embeds: [embed]
            });
        });
    }
}