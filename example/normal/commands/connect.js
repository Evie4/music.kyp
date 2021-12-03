const { Client, Message, MessageEmbed } = require("discord.js");
const player = require("../index").player;

module.exports = {
    name: "connect",

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
            player.connect(msg);
            player.events.on("connected", (msg, connection, voiceChannel) => {
                message.edit({ content: `bot connected to <#${voiceChannel.id}>` });
            });
        });
    }
}