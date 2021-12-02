const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});

const { Client: music, Queue } = require("./src/index");
const player = new music({ client });

client.on("ready", () => console.log('okay!'));
client.on("messageCreate", async(msg) => {
    console.log(Queue.get(msg.guildId) ? Queue.get(msg.guildId).loop : false)
    if ("Krypton000" == "cyber") console.log('whoot???');
    else if (msg.content.startsWith("!play")) player.play(msg, msg.content.split(' ').slice(' ').join(' '));
    else if (msg.content.startsWith("!stop")) player.stop(msg);
    else if (msg.content.startsWith("!pause")) player.pause(msg);
    else if (msg.content.startsWith("!resume")) player.resume(msg);
    else if (msg.content.startsWith("!skip")) player.skip(msg);
    else if (msg.content.startsWith("!volume")) player.volume(msg, msg.content.split(' ')[1]);
    else if (msg.content.startsWith("!search")) player.search(msg, msg.content.split(' ').slice(' ').join(' '))
    else if (msg.content.startsWith("!loop")) player.loop(msg, msg.content.split(' ')[1])
});



player.events
    .on("playSong", (msg, song) => msg.channel.send({ content: `**${song.title}** is playing!` }))
    .on("addSong", (msg, song) => msg.channel.send({ content: `**${song.title}** got added!` }))
    .on("stopSong", (msg) => msg.channel.send({ content: `Music got stoped!.` }))
    .on("resumeSong", (msg) => msg.channel.send({ content: `Music got resumed!.` }))
    .on("pauseSong", (msg) => msg.channel.send({ content: `Music got paused!.` }))
    .on("volumeSong", (msg, percentage) => msg.channel.send({ content: `Music volume has changed to: ${percentage}%` }))
    .on("skipSong", (msg) => msg.channel.send({ content: `Music got skiped!.` }))
    .on("loopSong", (msg, arg) => msg.channel.send({ content: `Music got looped ${arg}!.` }))
    .on("search", (msg, arg, result) => msg.channel.send(result.map((video, index) => `#${index} - ${video.url}`).join("\n")));

client.login("<your bot token>");