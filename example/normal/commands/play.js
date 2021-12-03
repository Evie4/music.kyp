const { Client, Message, MessageEmbed } = require("discord.js");
const player = require("../index").player;

module.exports = {
    name: "play",

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
            let songNameUrl = msg.content.split(" ").slice(1).join(" ");
            if (!songNameUrl) return message.edit({
                content: "please insert the song name/url after the command!?.",
                allowedMentions: {
                    repliedUser: false
                }
            });
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
            player.play(msg, songNameUrl);
            player.events.on("playSong", (msg0, song) => {
                let embed = new MessageEmbed()
                    .setColor("AQUA")
                    .setThumbnail(song.thumbnails ? song.thumbnails[0].url : message.guild.iconURL({ dynamic: true }))
                    .setTitle(String(song.title))
                    .setURL(song.video_url)
                message.edit({
                    content: "palying audio...",
                    embeds: [embed]
                })
            }).on("addSong", (msg0, song) => {
                message.edit({
                    content: `**${song.title}** has added to queue!.`
                });
            });
        });
    }
}