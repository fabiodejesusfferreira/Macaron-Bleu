const { EmbedBuilder, Message } = require("discord.js")

module.exports = {
    name: "command",
    aliases: ["c"],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg

        if(message.author.id !== '1266403609487212705') return;

        await message.delete();
        message.channel.send(`<:discotoolsxyzicon70:1267636769688649872> | Comando de ${args[0]} feito`)
    }
}