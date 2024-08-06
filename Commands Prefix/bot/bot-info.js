const { EmbedBuilder, Message } = require("discord.js")

module.exports = {
    name: "bot-info",
    aliases: ["botinfo", 'bi'],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg

        let embedBotInfo = new EmbedBuilder()
            .setColor('#4EB1D9')
            .setAuthor({ name: `Macaron Bleu`, iconURL: `https://media.discordapp.net/attachments/1267138684994584577/1270528074257006612/Default_Create_a_vibrant_twodimensional_cartoon_illustration_o_2.jpg?ex=66b406fa&is=66b2b57a&hm=d8c79811e51327eb265b8ed8441b2317fff6ce984e1dc79533a8489d29bf82e9&=&format=webp&width=701&height=701` })
            .setDescription('Descrição genérica')
            .setFooter({ text: `Thank you for choosing me S2`, iconURL: message.author.displayAvatarURL() })

        message.reply({ embeds: [embedBotInfo] })
    }
}