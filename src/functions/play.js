const { Client, Message, CommandInteraction } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const yt = require("yt-search");
const data = require("../data/database/map");

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
    var videoURL;
    if (msg.content.includes("https://")) {
        videoURL = songName.split(" ")[1];
    } else if (!msg.content.includes("https://")) {
        let result = await yt.search(String(mainARG)).then(values => values.videos.map(value => value));
        videoURL = result[0].url;
    }
    if (!videoURL) throw new TypeError("no result found!");
    let videoDetails = (await ytdl.getInfo(String(videoURL || songName))).videoDetails;
    let song = { details: videoDetails, url: videoURL };
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) throw new TypeError("the member is not in a voice channel!.");
    if (msg.guild.me.voice.channel) {
        if (msg.guild.me.voice.channelId !== msg.member.voice.channelId) throw new TypeError("the member have to be in the same voice channel the bot in!.");
    }
    let guildData = data.get(msg.guildId);
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
                selfDeaf: true,
            });
            connection;
            queueConstructor.connection = connection;
            data.set(msg.guildId, queueConstructor);
            playerF(msg, queueConstructor.songs[0], emiiter);
        } catch (err) {
            data.delete(msg.guildId);
            throw err
        }
    } else {
        guildData.songs.push(song);
        emiiter.emit("addSong", msg, videoDetails);
    }
};

/**
 * 
 * @param {Message | CommandInteraction} msg 
 * @param {string} url 

 */

async function playerF(msg, song, emiiter) {
    let guildData = await data.get(msg.guildId);
    if (!song) {
        if (guildData) guildData.connection.destroy(true);
        data.delete(msg.guildId);
        return;
    }
    const stream = ytdl(song.url, { filter: "audioonly" });
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
        console.log(guildData.loop)
        if (guildData.loop == false) guildData.songs.shift();
        playerF(msg, guildData.songs[0], emiiter);
    });
    let videoDetails = (await ytdl.getInfo(String(guildData.songs[0].url))).videoDetails;
    emiiter.emit("playSong", msg, videoDetails);
};