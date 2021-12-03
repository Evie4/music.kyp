const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../index").config;
const fs = require('fs');

module.exports = {
    name: "help",

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
            let embed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle("**Help Menu!.**")
                .setDescription("pwoerful music bot powerd by **music.kyp**!!!.")
                .setThumbnail(msg.guild.iconURL({ dynamic: true }) || msg.author.avatarURL({ dynamic: true }));
            fs.readdir(__dirname, (err, files) => {
                files.filter(file => file.endsWith(".js")).forEach(file => {
                    let command = file.split(".js")[0];
                    console.log(command)
                    embed.addFields({
                        name: config.prefix + String(command),
                        value: "_ _",
                        inline: true
                    });
                });
            });
            setTimeout(() => {
                message.edit({
                    content: "_ _",
                    embeds: [embed]
                });
            }, 1444)
        });
    }
}