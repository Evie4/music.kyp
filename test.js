// const { Client, Intents } = require("discord.js");
// const client = new Client({
//     intents: [
//         Intents.FLAGS.GUILDS,
//         Intents.FLAGS.GUILD_MEMBERS,
//         Intents.FLAGS.GUILD_BANS,
//         Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
//         Intents.FLAGS.GUILD_INTEGRATIONS,
//         Intents.FLAGS.GUILD_WEBHOOKS,
//         Intents.FLAGS.GUILD_INVITES,
//         Intents.FLAGS.GUILD_VOICE_STATES,
//         Intents.FLAGS.GUILD_PRESENCES,
//         Intents.FLAGS.GUILD_MESSAGES,
//         Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
//         Intents.FLAGS.GUILD_MESSAGE_TYPING,
//         Intents.FLAGS.DIRECT_MESSAGES,
//         Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
//         Intents.FLAGS.DIRECT_MESSAGE_TYPING
//     ]
// });

// const { Client: music, Queue } = require("./src/index");
// const player = new music({ client, lang: "ar-EG" });

// client.on("ready", () => console.log('okay!'));
// client.on("messageCreate", async(msg) => {
//     console.log(Queue.get(msg.guildId) ? Queue.get(msg.guildId).loop : false)
//     if ("Krypton000" == "cyber") console.log('whoot???');
//     else if (msg.content.startsWith("!play")) player.play(msg, msg.content.split(' ').slice(1).join(' '));
//     else if (msg.content.startsWith("!stop")) player.stop(msg);
//     else if (msg.content.startsWith("!pause")) player.pause(msg);
//     else if (msg.content.startsWith("!resume")) player.resume(msg);
//     else if (msg.content.startsWith("!skip")) player.skip(msg);
//     else if (msg.content.startsWith("!volume")) player.volume(msg, msg.content.split(' ')[1]);
//     else if (msg.content.startsWith("!search")) player.search(msg, msg.content.split(' ').slice(1).join(' '))
//     else if (msg.content.startsWith("!loop")) player.loop(msg, msg.content.split(' ')[1]);
//     else if (msg.content.startsWith("!connect")) player.connect(msg);
//     else if (msg.content.startsWith("!disconnect")) player.disconnect(msg);
// });
// client.on("speech", (msg) => {
//     if (msg.content) {
//         msg.author.send(msg.content)
//         if ("Krypton000" == "cyber") console.log('whoot???');
//         else if (msg.content.includes("play") || msg.content.includes("شغل")) player.play(msg, msg.content.split(' ').slice(' ').join(' '));
//         else if (msg.content.includes("stop") || msg.content.includes("وقف")) player.stop(msg);
//         else if (msg.content.includes("pause") || msg.content.includes("اسكت")) player.pause(msg);
//         else if (msg.content.includes("resume") || msg.content.includes("كمل")) player.resume(msg);
//         else if (msg.content.includes("skip") || msg.content.includes("الي بعده")) player.skip(msg);
//     }
// });
// player.events
//     .on("disconnected", (msg, connection, voiceChannel) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `bot disconnected to <#${voiceChannel.id}>` }) : "bad reading";
//     })
//     .on("connected", (msg, connection, voiceChannel) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `bot connected to <#${voiceChannel.id}>` }) : "bad reading";
//     })
//     .on("playSong", (msg, song) => {
//         console.log(song)
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `**${song.title}** is playing!` }) : "bad reading";
//     })
//     .on("addSong", (msg, song) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `**${song.title}** got added!` }) : "bad reading";
//     })
//     .on("stopSong", (msg) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `Music got stoped!.` }) : "bad reading";
//     })
//     .on("resumeSong", (msg) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `Music got resumed!.` }) : "bad reading";
//     })
//     .on("pauseSong", (msg) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `Music got paused!.` }) : "bad reading";
//     })
//     .on("volumeSong", (msg, percentage) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `Music volume has changed to: ${percentage}%` }) : "bad reading";
//     })
//     .on("skipSong", (msg) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `Music got skiped!.` }) : "bad reading";
//     })
//     .on("loopSong", (msg, arg) => {
//         let channel = msg.channel.type;
//         if (channel.type == "dm") return;
//         channel.send ? channel.send({ content: `Music got looped ${arg}!.` }) : "bad reading";
//     })
//     .on("search", (msg, arg, result) => {
//         let channel = msg.channel;
//         if (channel.type == "dm") return;
//         channel.send(result.map((video, index) => `#${index} - ${video.url}`).join("\n"))
//     });

// client.login("OTE3NTU5NTIwODM2ODY2MTQ5.Ya6d5Q.IgHilOPh7CIAF-rdEAgrmVMb61c");