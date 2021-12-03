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
        let songNameUrl = msg.content.split(" ").slice(1).join(" ");
        if (!songNameUrl) return;
        if (!msg.member.voice.channel) return;
        if (msg.guild.me.voice.channel) {
            if (msg.member.voice.channelId !== msg.guild.me.voice.channelId) return;
        }
        player.play(msg, songNameUrl);
        player.events.on("playSong", (msg0, song) => {
            let embed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle(String(song.title))
                .setURL(song.video_url)
            msg.author.send({
                content: "palying audio...",
                embeds: [embed]
            })
        }).on("addSong", (msg0, song) => {
            msg.author.send({
                content: `**${song.title}** has added to queue!.`
            });
        });
    }
}