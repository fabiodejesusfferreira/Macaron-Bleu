require('../index')
const client = require('../index')
const avatarSchema = require('../Models/avatar')

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu() || !interaction.customId) return;
    try {
        const [type, size, identificator] = interaction.values[0].split('.');
        if (!type || !size || !identificator) return;
        if (type !== 'size') return;

        await interaction.deferUpdate();

        const alvoAvatar = await avatarSchema.findOne({ uniqueId: identificator });
        const alvoTarget = alvoAvatar.targetId
        const alvoMessage = await interaction.channel.messages.fetch(alvoAvatar.messageId);
        const alvoMessageEmbed = alvoMessage.embeds[0];

        if (interaction.user.id !== alvoAvatar.userId) return;

        switch (size) {
            case '64': {
                let url = alvoMessageEmbed.data.image.url;
                const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
                const id = url.match(regex)[1];
                let newURL = `https://cdn.discordapp.com/avatars/${alvoTarget}/${id}.jpg?size=64&${Date.now()}`;

                alvoMessageEmbed.data.image.url = newURL;
                alvoMessage.edit({ embeds: [alvoMessageEmbed], components: interaction.message.components });

            } break;

            case '128': {
                let url = alvoMessageEmbed.data.image.url;
                const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
                const id = url.match(regex)[1];
                let newURL = `https://cdn.discordapp.com/avatars/${alvoTarget}/${id}.jpg?size=128&${Date.now()}`;

                alvoMessageEmbed.data.image.url = newURL;
                alvoMessage.edit({ embeds: [alvoMessageEmbed], components: interaction.message.components });
            } break;

            case '256': {
                let url = alvoMessageEmbed.data.image.url;
                const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
                const id = url.match(regex)[1];
                let newURL = `https://cdn.discordapp.com/avatars/${alvoTarget}/${id}.jpg?size=256&${Date.now()}`;

                alvoMessageEmbed.data.image.url = newURL;
                alvoMessage.edit({ embeds: [alvoMessageEmbed], components: interaction.message.components });
            } break;

            case '512': {
                let url = alvoMessageEmbed.data.image.url;
                const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
                const id = url.match(regex)[1];
                let newURL = `https://cdn.discordapp.com/avatars/${alvoTarget}/${id}.jpg?size=512&${Date.now()}`;

                alvoMessageEmbed.data.image.url = newURL;
                alvoMessage.edit({ embeds: [alvoMessageEmbed], components: interaction.message.components });
            } break;

            case '1024': {
                let url = alvoMessageEmbed.data.image.url;
                const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
                const id = url.match(regex)[1];
                let newURL = `https://cdn.discordapp.com/avatars/${alvoTarget}/${id}.jpg?size=1024&${Date.now()}`;

                alvoMessageEmbed.data.image.url = newURL;
                alvoMessage.edit({ embeds: [alvoMessageEmbed], components: interaction.message.components });
            } break;

            case '2048': {
                let url = alvoMessageEmbed.data.image.url;
                const regex = /\/avatars\/\d+\/([a-fA-F0-9]+)/;
                const id = url.match(regex)[1];
                let newURL = `https://cdn.discordapp.com/avatars/${alvoTarget}/${id}.jpg?size=2048&${Date.now()}`;

                alvoMessageEmbed.data.image.url = newURL;
                alvoMessage.edit({ embeds: [alvoMessageEmbed], components: interaction.message.components });
            } break;

            default:
                break;
        }
    } catch (error) {
        console.log(`ERRO NO EVENTO interactionCreate, na parte de dropdown. ${error}`);
    }
})