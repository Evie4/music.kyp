const { Client, Message, MessageEmbed } = require("discord.js");
const { Queue } = require("music.kyp")
const player = require("../index").player;

module.exports = {
    name: "resume",

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
            if (!msg.member.voice.channel) return message.edit({
                content: `please join a voice channel!?.`,
                allowedMentions: {
                    repliedUser: false
                }
            });
            if (msg.guild.me.voice.channel) {
                if (msg.member.voice.channelId !== msg.guild.me.voice.channelId) return message.edit({
                    content: `please make sure you have joined the same channel iam in: <#${msg.guild.me.voice.channelId}>!?.`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            }
            let queue = Queue.get(msg.guildId);
            if (!queue) return message.edit({
                content: `thare are no server queue!?.`,
                allowedMentions: {
                    repliedUser: false
                }
            });
            player.resume(msg);
            player.events.on("resumeSong", (msg) => {
                message.edit({
                    content: "music got resumed!."
                })
            })
        });
    }
}