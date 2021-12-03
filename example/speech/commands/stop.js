const { Client, Message, MessageEmbed } = require("discord.js");
const { Queue } = require("music.kyp");
const player = require("../index").player;

module.exports = {
    name: "stop",

    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     */

    run: (client, msg) => {
        if (!msg.member.voice.channel) return;
        if (msg.guild.me.voice.channel) {
            if (msg.member.voice.channelId !== msg.guild.me.voice.channelId) return;
        }
        let queue = Queue.get(msg.guildId);
        if (!queue) return;
        player.stop(msg);
        player.events.on("stopSong", (msg0, song) => {
            msg.author.send({
                content: "music got stop playing.."
            })
        });
    }
}