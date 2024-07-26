const { EmbedBuilder, Message } = require("discord.js")

module.exports = {
    name: "hello",
    aliases: ["hi"],

    run: async(client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg

        message.reply('Hello World!')
    }
}