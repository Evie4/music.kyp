# music.kyp ✨

##### easy discord music bot building ✨🎶

### Installation 🛠

```
npm install music.kyp@latest discord.js@13
```

### useg 👨‍💻

first make your default discord.js source

```js
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
client.login("<your discord bot token>");
```

now import the `music.kyp` module

```js
const { Client: music } = require("music.kyp");
```

make a new music client

```js
const player = new music({ client }); // the "client" is a normal discord.js@13 client
```
```js
const player = new music({ token: "your discord bot token" }); // you can also do this
```

now the "player" have alot of functions to export:

```js
const player = new music({ client });

player.musicClient
// if you insert a token to "player constructor" this will return the "Discord.Client"
player.play("Discord.Message | Discord.CommandInteraction", "songName <string>");
// play a music
player.loop("Discord.Message | Discord.CommandInteraction", "arg <boolean>");
// make the song on loop
player.pause("Discord.Message | Discord.CommandInteraction");
// pause the music
player.resume("Discord.Message | Discord.CommandInteraction");
// resume the music
player.search("Discord.Message | Discord.CommandInteraction", "arg <string>");
// search for a music on youtube
player.skip("Discord.Message | Discord.CommandInteraction");
// skip the song
player.stop("Discord.Message | Discord.CommandInteraction");
// stop the music
player.volume("Discord.Message | Discord.CommandInteraction", "percentage <number>");
// change the music volume percentage
```

now the player have one more thing!, the events (its return a values of all the "player" functions)

```js
// simple example

const player = new music({ client });

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

```

you have one more thing you can export from the package, the server queue
server queue is actually a javascript map;

you can export it by:

```js
const { Client: music, Queue } = require("music.kyp");
// "Queue" is a javascript map so you can set and get values from it, example:

Queue.get("<guildID>"); // this return the guild queue it have to be something like that:

/*
{
    vc: <Discord.VoiceChannel>,
    tc: <Discord.TextChannel>,
    connection: <@discordjs/voice connection>,
    songs: [
        {
            url: "<the song url>",
            details: "<the song detals>"
        },
        ...
    ],
    loop: <boolean>
}
*/
```

finally this a full example if you need:

```js
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

const { Client: music, Queue } = require("music.kyp");
const player = new music({ client });

client.on("ready", () => console.log('okay!'));
client.on("messageCreate", async(msg) => {
    if (msg.content.startsWith("!play")) player.play(msg, msg.content.split(' ').slice(' ').join(' '));
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
```

and that's it :)
the source on github if you won't to pull any update :)))
bay 👋
