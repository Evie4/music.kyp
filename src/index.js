const { Client, Message, CommandInteraction, Guild } = require("discord.js");
const intents = require("./data/connections/intents");
const fs = require("fs");
const data = require("./data/database/map");
const EventEmitter = require("events");
const chalk = require("chalk");
const speech = require("./speech/index"); // from: https://www.npmjs.com/package/discord-speech-recognition
const emiiter = new EventEmitter();
EventEmitter.defaultMaxListeners = 20;

/**
 * @typedef {(
 *  "en"
 *  "af-ZA"|"am-ET"|"hy-AM"|"az-AZ"|"id-ID"|"ms-MY"|"bn-BD"|"bn-IN"|"ca-ES"|"cs-CZ"|"da-DK"|"de-DE"|
 *  "en-AU"|"en-CA"|"en-GH"|"en-GB"|"en-IN"|"en-IE"|"en-KE"|"en-NZ"|"en-NG"|"en-PH"|"en-SG"|"en-ZA"|
 *  "en-TZ"|"en-US"|"es-AR"|"es-BO"|"es-CL"|"es-CO"|"es-CR"|"es-EC"|"es-SV"|"es-ES"|"es-US"|"es-GT"|
 *  "es-HN"|"es-MX"|"es-NI"|"es-PA"|"es-PY"|"es-PE"|"es-PR"|"es-DO"|"es-UY"|"es-VE"|"eu-ES"|"fil-PH"|
 *  "fr-CA"|"fr-FR"|"gl-ES"|"ka-GE"|"gu-IN"|"hr-HR"|"zu-ZA"|"is-IS"|"it-IT"|"jv-ID"|"kn-IN"|"km-KH"|
 *  "lo-LA"|"lv-LV"|"lt-LT"|"hu-HU"|"ml-IN"|"mr-IN"|"nl-NL"|"ne-NP"|"nb-NO"|"pl-PL"|"pt-BR"|"pt-PT"|
 *  "ro-RO"|"si-LK"|"sk-SK"|"sl-SI"|"su-ID"|"sw-TZ"|"sw-KE"|"fi-FI"|"sv-SE"|"ta-IN"|"ta-SG"|"ta-LK"|
 *  "ta-MY"|"te-IN"|"vi-VN"|"tr-TR"|"ur-PK"|"ur-IN"|"el-GR"|"bg-BG"|"ru-RU"|"sr-RS"|"uk-UA"|"he-IL"|
 *  "ar-IL"|"ar-JO"|"ar-AE"|"ar-BH"|"ar-DZ"|"ar-SA"|"ar-IQ"|"ar-KW"|"ar-MA"|"ar-TN"|"ar-OM"|"ar-PS"|
 *  "ar-QA"|"ar-LB"|"ar-EG"|"fa-IR"|"hi-IN"|"th-TH"|"ko-KR"|"zh-TW"|"yue-Hant-HK"|"ja-JP"|"zh-HK"|"zh"
 *  )} Language
 */

module.exports = {
  Client: class {
    /**
     *
     * @param {{
     *   token: string,
     *   client: Client,
     *   lang:
     *  "af-ZA"|"am-ET"|"hy-AM"|"az-AZ"|"id-ID"|"ms-MY"|"bn-BD"|"bn-IN"|"ca-ES"|"cs-CZ"|"da-DK"|"de-DE"|
     *  "en-AU"|"en-CA"|"en-GH"|"en-GB"|"en-IN"|"en-IE"|"en-KE"|"en-NZ"|"en-NG"|"en-PH"|"en-SG"|"en-ZA"|
     *  "en-TZ"|"en-US"|"es-AR"|"es-BO"|"es-CL"|"es-CO"|"es-CR"|"es-EC"|"es-SV"|"es-ES"|"es-US"|"es-GT"|
     *  "es-HN"|"es-MX"|"es-NI"|"es-PA"|"es-PY"|"es-PE"|"es-PR"|"es-DO"|"es-UY"|"es-VE"|"eu-ES"|"fil-PH"|
     *  "fr-CA"|"fr-FR"|"gl-ES"|"ka-GE"|"gu-IN"|"hr-HR"|"zu-ZA"|"is-IS"|"it-IT"|"jv-ID"|"kn-IN"|"km-KH"|
     *  "lo-LA"|"lv-LV"|"lt-LT"|"hu-HU"|"ml-IN"|"mr-IN"|"nl-NL"|"ne-NP"|"nb-NO"|"pl-PL"|"pt-BR"|"pt-PT"|
     *  "ro-RO"|"si-LK"|"sk-SK"|"sl-SI"|"su-ID"|"sw-TZ"|"sw-KE"|"fi-FI"|"sv-SE"|"ta-IN"|"ta-SG"|"ta-LK"|
     *  "ta-MY"|"te-IN"|"vi-VN"|"tr-TR"|"ur-PK"|"ur-IN"|"el-GR"|"bg-BG"|"ru-RU"|"sr-RS"|"uk-UA"|"he-IL"|
     *  "ar-IL"|"ar-JO"|"ar-AE"|"ar-BH"|"ar-DZ"|"ar-SA"|"ar-IQ"|"ar-KW"|"ar-MA"|"ar-TN"|"ar-OM"|"ar-PS"|
     *  "ar-QA"|"ar-LB"|"ar-EG"|"fa-IR"|"hi-IN"|"th-TH"|"ko-KR"|"zh-TW"|"yue-Hant-HK"|"ja-JP"|"zh-HK"|"zh",
     * }} props
     *
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
      console.log(
        chalk.magenta.bold("[ ~ ]") + chalk.blue(" Creating a music client!")
      );
      this.events = emiiter;
      this.token = props["token"];
      this.client = props["client"];
      this.speechLang = props["lang"];
      if (!this.token && !this.client)
        throw new Error("Please insert a bot token!");
      if (!this.client && !this.token)
        throw new Error("Please insert a bot client!");
      if (!this.client) {
        console.log(
          chalk.magenta.bold("[ ~ ]") +
            chalk.blue(" Creating a new discord client!")
        );
        this.musicClient = new Client({
          intents,
        });
        this.musicClient
          .login(this.token)
          .then(() => {
            console.log(
              chalk.magenta.bold("[ ~ ]") +
                chalk.blue(" Music System Connected!")
            );
            speech.addSpeechEvent(this.musicClient, {
              lang: this.speechLang || "en-US",
            });
          })
          .catch((err) => {
            if (err) throw err;
          });
        const chalk = require("chalk");
        const fetch = require("node-fetch");
        fetch("https://api.github.com/repos/DevelopersSupportAR/music.kyp/tags")
          .then((res) => res.json())
          .then((json) => {
            if (json[0].name !== "0.1.3") {
              console.warn(
                chalk.yellow("WORNING: ") +
                  "music.kyp out of data, run npm i music.kyp"
              );
            }
          });
      } else {
        speech.addSpeechEvent(this.client, {
          lang: this.speechLang || "en-US",
        });
        console.log(
          chalk.magenta.bold("[ ~ ]") +
            chalk.blue(" Connecting to discord.js client!")
        );
        console.log(
          chalk.magenta.bold("[ ~ ]") + chalk.blue(" Music System Connected!")
        );
      }
    }
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
      else
        throw new Error(
          'msg have to be a "Discord.Message" or "Discord.CommandInteraction"'
        );
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("play"))
            require(__dirname + "/functions/" + file)(
              client,
              msg,
              type,
              songName,
              emiiter
            );
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     */
    stop(msg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("stop"))
            require(__dirname + "/functions/" + file)(client, msg, emiiter);
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     */
    pause(msg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("pause"))
            require(__dirname + "/functions/" + file)(client, msg, emiiter);
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     */
    resume(msg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("resume"))
            require(__dirname + "/functions/" + file)(client, msg, emiiter);
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     */
    skip(msg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("skip"))
            require(__dirname + "/functions/" + file)(client, msg, emiiter);
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     * @param {number} percentage
     */
    volume(msg, percentage) {
      let client = this.client;
      if (!client) client = this.musicClient;
      if (!percentage) percentage = 1;
      if (isNaN(percentage))
        throw new TypeError("percentage have to be a number!??.");
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("volume"))
            require(__dirname + "/functions/" + file)(
              client,
              msg,
              percentage,
              emiiter
            );
        }
      });
    }
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
          if (file.startsWith("search"))
            require(__dirname + "/functions/" + file)(
              client,
              msg,
              arg,
              emiiter
            );
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     * @param {boolean} arg
     */
    loop(msg, arg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      if (!arg) arg = true;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("loop"))
            require(__dirname + "/functions/" + file)(
              client,
              msg,
              arg,
              emiiter
            );
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     *
     */
    connect(msg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("connect"))
            require(__dirname + "/functions/" + file)(client, msg, emiiter);
        }
      });
    }
    /**
     * @param {Message | CommandInteraction } msg
     *
     */
    disconnect(msg) {
      let client = this.client;
      if (!client) client = this.musicClient;
      fs.readdir(__dirname + "/functions/", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.startsWith("disconnect"))
            require(__dirname + "/functions/" + file)(client, msg, emiiter);
        }
      });
    }
  },
  /**
   *
   * @param {Guild} guild
   */
  Queue: data,
};
