const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, Attachment, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")
const { createCanvas, loadImage } = require('canvas');

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
        try {
            /** @type {Attachment} */ let logo = interaction.options.getAttachment('logo');
           let contentType = logo.contentType.split('/')[1]
           if (!['png', 'jpeg', 'jpg', 'gif'].includes(contentType)) return interaction.reply(`<:discotoolsxyzicon20240802T122438:1268952755909955675> Invalid attachment format. Only \`png, jpeg and gif\` formats are accepted.`);
   
           const canvas = createCanvas(128, 128);
           const ctx = canvas.getContext('2d');
   
           const image = await loadImage(logo.url);
           ctx.drawImage(image, 0, 0, 128, 128);
   
           const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'logo.png' });
   
           const modal = new ModalBuilder()
               .setTitle(`🍽️ Create your restaurant!`)
               .setCustomId(`cr_${interaction.user.id}`)
   
           const textInputName = new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                   .setCustomId('cr_input-name')
                   .setLabel(`Make a creative name!`)
                   .setStyle(TextInputStyle.Short)
                   .setMaxLength(32)
                   .setMinLength(5)
                   .setRequired(true)
           )
   
           const textInputSlogan = new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                   .setCustomId('cr_input-slogan')
                   .setLabel(`Slogan`)
                   .setStyle(TextInputStyle.Short)
                   .setMaxLength(32)
                   .setMinLength(5)
           )
   
           const textInputColor = new ActionRowBuilder().addComponents(
               new TextInputBuilder()
                   .setCustomId('cr_input-color')
                   .setLabel(`Color (hex)`)
                   .setPlaceholder('Example: #4EB1D9')
                   .setStyle(TextInputStyle.Short)
                   .setMaxLength(7)
                   .setMinLength(7)
           )
   
           modal.addComponents(textInputName, textInputSlogan, textInputColor);
   
           await interaction.showModal(modal);
   
           const filter = (i) => i.customId === `cr_${interaction.user.id}`;
   
           const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 1000*60*5 }).catch((error) => console.log(error));
   
           await modalInteraction.deferReply();
   
           let colorInput = modalInteraction.fields.getTextInputValue('cr_input-color');
           if(!isValidHexCode(colorInput)) modalInteraction.editReply(`<:discotoolsxyzicon20240802T122438:1268952755909955675> The color \`${colorInput}\` is not in hexadecimal! If you need help, use [Google's color picker](https://g.co/kgs/MCfhqSY)`).then(msg => {
               setTimeout(() => msg.delete(), 15000);
           })
        } catch (error) {}
    }
}
function isValidHexCode(hexCode = '') {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    /** @type {Boolean} */ return hexRegex.test(hexCode);
}