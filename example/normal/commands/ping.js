const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",

    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     */

    run: (client, msg) => {
        msg.channel.send({
            content: "ping...",
            allowedMentions: {
                repliedUser: false
            }
        }).then((message) => {
            let ping = Number(message.createdTimestamp) - Number(msg.createdTimestamp);
            let embed = new MessageEmbed()
                .setColor("AQUA")
                .setDescription(`\`\`\`js
"ping..."
Times_Tamp: ${Math.round(ping)} ms 📶
Time_Taken: ${Date.now() - msg.createdTimestamp} ms 📶
Web_Socket: ${Math.round(client.ws.ping)} ms 📶\`\`\``)
            message.edit({
                content: "_ _",
                embeds: [embed]
            });
        });
    }
}