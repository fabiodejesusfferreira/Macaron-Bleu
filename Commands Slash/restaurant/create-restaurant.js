const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, Attachment } = require("discord.js")

module.exports = {
    name: "create-restaurant", // Coloque o nome do comando
    description: "Start your great career as the owner of your own restaurant", // Coloque a descrição do comando
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'logo',
            description: `The logo for your restaurant`,
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },
    ],

    run: async (client = require('../../index'), interaction) => {
        /** @type {Attachment} */ let logo =  interaction.options.getAttachment('logo');
        let contentType = logo.contentType.split('/')[1]
        if(!['png', 'jpeg', 'jpg', 'gif'].includes(contentType)) return interaction.reply(`<:discotoolsxyzicon20240802T122438:1268952755909955675> Invalid attachment format. Only \`png, jpeg and gif\` formats are accepted.`);
        
        let embed = new EmbedBuilder()
            .setTitle(`lorem`)
            .setImage(logo.url)
        interaction.reply({ content: `Bet`, embeds: [embed]})
    }
}