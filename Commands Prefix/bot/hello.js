const { EmbedBuilder, Message } = require("discord.js")

module.exports = {
    name: "hello",
    aliases: ["hi"],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg
        const url = message.member.displayAvatarURL({ size: 128, extension: 'png', forceStatic: false })
        const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
        const id = url.match(regex)[1];

        message.reply(`Hello World!. Id do avatar: ${id}`)
    }
}