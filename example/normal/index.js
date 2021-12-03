// setting some config
const config = {
    prefix: "?",
    token: "xxxxxxx"
}

// import the discord.js modules
const { Client, Intents } = require("discord.js");
// import music.kyp modules
const { Client: music } = require("music.kyp");
// import fs
const fs = require("fs");
// create a new discord.js client
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
// create a new music.kyp client
const player = new music({
    client,
    lang: "en-US",
});
// load command
let commands = new Map();
fs.readdir(__dirname + "/commands/", (err, files) => {
    let array = [];
    for (const element of files.filter(file => file.endsWith(".js"))) {
        const command = require(__dirname + "/commands/" + element);
        array.push(command.name);
    }
    commands.set("commands", array);
    console.log(`Loaded "${commands.get("commands").length}" command!`)
});
// create a message event
client.on("messageCreate", async(msg) => {
    if (!msg.content.startsWith(config.prefix)) return;
    let comamnds = commands.get("commands");
    for (let index = 0; index < comamnds.length; index++) {
        const commandName = comamnds[index];
        if (msg.content.startsWith(config.prefix + commandName)) {
            require(__dirname + "/commands/" + commandName).run(client, msg);
        }
    }
});

// export the player
module.exports.player = player;
module.exports.config = config;

// login in to the client
client.login(config.token)