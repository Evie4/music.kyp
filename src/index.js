const { Client, Message, CommandInteraction, Guild } = require("discord.js");
const intents = require("./data/connections/intents");
const fs = require("fs");
const data = require("./data/database/map");
const EventEmitter = require("events");
const chalk = require("chalk")
const emiiter = new EventEmitter();
EventEmitter.defaultMaxListeners = 20;


module.exports = {
    Client: class {
        /**
         * 
         * @param {{
         *   token: string,
         *   client: Client
         * }} props
         * 
         * @example
         * const { Client: music } = require("music.easy");
         * const player = new music({
         *   token: "<you discord bot token>"
         * });
         * // you can also do this =>
         * const { Client, Intents } = require("discord.js");
         * const client = new Client({
         *   intents: [
         *       Intents.FLAGS.GUILDS,
         *       Intents.FLAGS.GUILD_MEMBERS,
         *       Intents.FLAGS.GUILD_BANS,
         *       Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
         *       Intents.FLAGS.GUILD_INTEGRATIONS,
         *       Intents.FLAGS.GUILD_WEBHOOKS,
         *       Intents.FLAGS.GUILD_INVITES,
         *       Intents.FLAGS.GUILD_VOICE_STATES,
         *       Intents.FLAGS.GUILD_PRESENCES,
         *       Intents.FLAGS.GUILD_MESSAGES,
         *       Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
         *       Intents.FLAGS.GUILD_MESSAGE_TYPING, 
         *       Intents.FLAGS.DIRECT_MESSAGES,
         *       Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
         *       Intents.FLAGS.DIRECT_MESSAGE_TYPING
         *   ];
         * })
         * const { Client: music } = require("music.easy");
         * const player = new music({
         *   client
         * });
         * 
         * 
         * @returns
         */
        constructor(props) {
            console.log(chalk.magenta.bold("[ ~ ]") + chalk.blue(" Creating a music client!"));
            this.events = emiiter;
            this.token = props["token"];
            this.client = props["client"];
            if (!this.token && !this.client) throw new Error("Please insert a bot token!");
            if (!this.client && !this.token) throw new Error("Please insert a bot client!");
            if (!this.client) {
                console.log(chalk.magenta.bold("[ ~ ]") + chalk.blue(" Creating a new discord client!"));
                this.musicClient = new Client({
                    intents,
                });
                this.musicClient.login(this.token).then(() => {
                    console.log(chalk.magenta.bold("[ ~ ]") + chalk.blue(" Music System Connected!"));
                }).catch(err => {
                    if (err) throw err;
                });
            } else {
                console.log(chalk.magenta.bold("[ ~ ]") + chalk.blue(" Connecting to discord.js client!"));
                console.log(chalk.magenta.bold("[ ~ ]") + chalk.blue(" Music System Connected!"));
            }
        };
        /**
         * @param {Message | CommandInteraction } msg
         * @param {string} songName
         */
        play(msg, songName) {
            let client = this.client;
            if (!client) client = this.musicClient;
            let type;
            if (msg.author) type = "Message";
            else if (msg.user) type = "Interaction";
            else throw new Error("msg have to be a \"Discord.Message\" or \"Discord.CommandInteraction\"");
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("play")) require(__dirname + "/functions/" + file)(client, msg, type, songName, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         */
        stop(msg) {
            let client = this.client;
            if (!client) client = this.musicClient;
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("stop")) require(__dirname + "/functions/" + file)(client, msg, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         */
        pause(msg) {
            let client = this.client;
            if (!client) client = this.musicClient;
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("pause")) require(__dirname + "/functions/" + file)(client, msg, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         */
        resume(msg) {
            let client = this.client;
            if (!client) client = this.musicClient;
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("resume")) require(__dirname + "/functions/" + file)(client, msg, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         */
        skip(msg) {
            let client = this.client;
            if (!client) client = this.musicClient;
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("skip")) require(__dirname + "/functions/" + file)(client, msg, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         * @param {number} percentage
         */
        volume(msg, percentage) {
            let client = this.client;
            if (!client) client = this.musicClient;
            if (!percentage) percentage = 1;
            if (isNaN(percentage)) throw new TypeError("percentage have to be a number!??.");
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("volume")) require(__dirname + "/functions/" + file)(client, msg, percentage, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         * @param {string} arg
         */
        search(msg, arg) {
            let client = this.client;
            if (!client) client = this.musicClient;
            if (!arg) throw new TypeError("pkg can't find the arg value!??.");
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("search")) require(__dirname + "/functions/" + file)(client, msg, arg, emiiter);
                };
            });
        };
        /**
         * @param {Message | CommandInteraction } msg
         * @param {boolean} arg
         */
        loop(msg, arg) {
            let client = this.client;
            if (!client) client = this.musicClient;
            if (!arg) arg = true
            fs.readdir(__dirname + "/functions/", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file.startsWith("loop")) require(__dirname + "/functions/" + file)(client, msg, arg, emiiter);
                };
            });
        };
    },
    /**
     * 
     * @param {Guild} guild
     */
    Queue: data
};