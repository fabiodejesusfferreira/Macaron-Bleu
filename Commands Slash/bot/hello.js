const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, Interaction } = require("discord.js")

module.exports = {
    name: "helloworld", // Coloque o nome do comando
    description: "Faça o bot falar Hello World!", // Coloque a descrição do comando
    type: ApplicationCommandType.ChatInput,

    run: async (client, i) => {
            /**
             * @type {Interaction}
             */
            let interaction = i
            interaction.reply('Hello World!')
    }
}