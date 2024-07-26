const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
  name: "", // Coloque o nome do comando
  description: "", // Coloque a descrição do comando
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: '',
      description: ``,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {

  }
}