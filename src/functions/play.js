const { Client, Message, CommandInteraction } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const yt = require("yt-search");
const data = require("../data/database/map");
const scdl = require('soundcloud-downloader').default
const spdl = require('spdl-core').default;

/**
 * 
 * @param {Client} client 
 * @param {Message | CommandInteraction} msg 
 * @param {string} type 
 * @param {string} songName 
 */
module.exports = async(client, msg, type, songName, emiiter) => {
    var mainARG = songName;
    if (!mainARG) throw new TypeError("please type the song name/url after the command!")
    var videoURL = songName;
    var song;
    if (!msg.content.includes("https://")) {
        let result = await yt.search(String(mainARG)).then(values => values.videos.map(value => value));
        videoURL = result[0].url;
    }
    if (!videoURL) throw new TypeError("no result found!");
    if (videoURL.includes("youtube.com")) {
        var videoID = await ytdl.getURLVideoID(videoURL);
        var videoDetails = (await ytdl.getInfo(videoID)).videoDetails;
        song = { details: videoDetails, url: videoURL };
    } else if (videoURL.includes("soundcloud.com")) {
        var videoDetails = scdl.getInfo(String(videoURL));
        song = { details: videoDetails, url: videoURL };
    } else if (videoURL.includes("spotify.com")) {
        var videoDetails = spdl.getInfo(String(videoURL))
        song = { details: videoDetails, url: videoURL };
    }
    setTimeout(async() => {
        let voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) throw new TypeError("the member is not in a voice channel!.");
        if (msg.guild.me.voice.channel) {
            if (msg.guild.me.voice.channelId !== msg.member.voice.channelId) throw new TypeError("the member have to be in the same voice channel the bot in!.");
        }
        let guildData = data.get(msg.guild.id);
        if (!guildData) {
            let queueConstructor = {
                vc: voiceChannel,
                tc: msg.channel,
                connection: null,
                songs: [],
                loop: false
            };
            queueConstructor.songs.push(song);
            try {
                const connection = await joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                    selfDeaf: false,
                });
                connection;
                queueConstructor.connection = connection;
                data.set(msg.guild.id, queueConstructor);
                playerF(msg, queueConstructor.songs[0], emiiter);
            } catch (err) {
                data.delete(msg.guild.id);
                throw err
            }
        } else {
            guildData.songs.push(song);
            emiiter.emit("addSong", msg, videoDetails);
        }
    }, 1222);
};

/**
 * 
 * @param {Message | CommandInteraction} msg 
 * @param {string} url 

 */

async function playerF(msg, song, emiiter) {
    let guildData = await data.get(msg.guild.id);
    if (!song) {
        if (guildData) guildData.connection.destroy(true);
        data.delete(msg.guild.id);
        return;
    }
    if (String(guildData.songs[0].url).includes("youtube")) {
        var videoDetails = (await ytdl.getInfo(String(guildData.songs[0].url))).videoDetails;
        const player = await createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        var stream = ytdl(song.url, { filter: "audioonly" });
        module.exports.player = player;
        const resource = createAudioResource(stream, { inlineVolume: true });
        module.exports.resource = resource;
        player.play(resource);
        guildData.connection.subscribe(player);
        player.on(AudioPlayerStatus.Idle, () => {
            if (guildData.loop == false) guildData.songs.shift();
            playerF(msg, guildData.songs[0], emiiter);
        });
        emiiter.emit("playSong", msg, videoDetails);
    } else if (String(guildData.songs[0].url).includes("soundcloud")) {
        var videoDetails = scdl.getInfo(song.url);
        scdl.download(song.url, "nzlp05ChzxSyVpcOCKvTIZdwDLZfWM0z").then(async stream => {
            const player = await createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            module.exports.player = player;
            const resource = createAudioResource(stream, { inlineVolume: true });
            module.exports.resource = resource;
            player.play(resource);
            guildData.connection.subscribe(player);
            player.on(AudioPlayerStatus.Idle, () => {
                if (guildData.loop == false) guildData.songs.shift();
                playerF(msg, guildData.songs[0], emiiter);
            });
            emiiter.emit("playSong", msg, videoDetails);
        });
    } else if (String(guildData.songs[0].url).includes("spotify")) {
        spdl.getInfo(song.url).then(async infos => {
            // let stram = await (await spdl(String(infos.url)));
            let theSameMuisc = await (await yt.search(String(infos.title))).videos[0].url;
            let stream = await ytdl(String(theSameMuisc), { filter: "audioonly" });
            setTimeout(async() => {
                const player = await createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                });
                module.exports.player = player;
                const resource = createAudioResource(stream, { inlineVolume: true });
                module.exports.resource = resource;
                player.play(resource);
                guildData.connection.subscribe(player);
                player.on(AudioPlayerStatus.Idle, () => {
                    if (guildData.loop == false) guildData.songs.shift();
                    playerF(msg, guildData.songs[0], emiiter);
                });
                emiiter.emit("playSong", msg, infos);
            }, 2888);
        });
    }
};