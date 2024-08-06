const { EmbedBuilder, Message } = require("discord.js")

module.exports = {
    name: "ping",
    aliases: ["latency", 'p'],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg

        message.reply(`<:discotoolsxyzicon40:1267637111633481769> Latency: \`${Math.abs(message.createdTimestamp - Date.now())}ms\`\n<:discotoolsxyzicon46:1267637039713620101> API ping: \`${Math.abs(client.ws.ping)}ms\``)
    }
}