# music.kyp ✨

##### easy discord music bot building ✨🎶

### Installation 🛠

```
npm install music.kyp@latest discord.js@13
```

### why music.kyp 🤔

- easy to use
- just make the ytdl and souncloud functions easer
- simple an powerful

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
player.connect("Discord.Message | Discord.CommandInteraction");
// join a voice channel
player.disconnect("Discord.Message | Discord.CommandInteraction");
// leave the voice channel
```

now the player have one more thing!, the events (its return a values of all the "player" functions)

```js
// simple example

const player = new music({ client });

player.events
    .on("disconnected", (msg, connection, voiceChannel) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `bot disconnected to <#${voiceChannel.id}>` }) : "bad reading";
    })
    .on("connected", (msg, connection, voiceChannel) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `bot connected to <#${voiceChannel.id}>` }) : "bad reading";
    })
    .on("playSong", (msg, song) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `**${song.title}** is playing!` }) : "bad reading";
    })
    .on("addSong", (msg, song) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `**${song.title}** got added!` }) : "bad reading";
    })
    .on("stopSong", (msg) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `Music got stoped!.` }) : "bad reading";
    })
    .on("resumeSong", (msg) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `Music got resumed!.` }) : "bad reading";
    })
    .on("pauseSong", (msg) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `Music got paused!.` }) : "bad reading";
    })
    .on("volumeSong", (msg, percentage) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `Music volume has changed to: ${percentage}%` }) : "bad reading";
    })
    .on("skipSong", (msg) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `Music got skiped!.` }) : "bad reading";
    })
    .on("loopSong", (msg, arg) => {
        let channel = msg.channel.type;
        if (channel.type == "dm") return;
        channel.send ? channel.send({ content: `Music got looped ${arg}!.` }) : "bad reading";
    })
    .on("search", (msg, arg, result) => {
        let channel = msg.channel;
        if (channel.type == "dm") return;
        channel.send(result.map((video, index) => `#${index} - ${video.url}`).join("\n"))
    });

// thare are one more event and its custom for discord.js v13 "speech"
client.on("speech", (msg) => {
    if (msg.content) {
        msg.author.send(msg.content);
    }
});
// simple example to how you can use it with the package
client.on("speech", (msg) => {
    if (msg.content) {
        msg.author.send(msg.content)
        if (msg.content.includes("play") || msg.content.includes("شغل")) player.play(msg, msg.content.split(' ').slice(' ').join(' '));
        else if (msg.content.includes("stop") || msg.content.includes("وقف")) player.stop(msg);
        else if (msg.content.includes("pause") || msg.content.includes("اسكت")) player.pause(msg);
        else if (msg.content.includes("resume") || msg.content.includes("كمل")) player.resume(msg);
        else if (msg.content.includes("skip") || msg.content.includes("الي بعده")) player.skip(msg);
    }
});
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

<<<<<<< HEAD
[normal music bot example](https://github.com/DevelopersSupportAR/music.kyp/tree/master/example/normal)
[speech music bot example](https://github.com/DevelopersSupportAR/music.kyp/tree/master/example/speech)
=======
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
>>>>>>> 8ea7eebec5ea8cac64ad92352b0d1e7082a86e98

and that's it :)
the source on github if you won't to pull any update :)))
bay 👋
