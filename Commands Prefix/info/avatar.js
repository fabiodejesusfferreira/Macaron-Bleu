const { EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "avatar",
    aliases: ["av", 'profile', 'pfp'],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg
        let member = message.mentions.members.first() || message.guild.members.cache.get(args?.trim()) || message.guild.members.cache.find(member => member.user.username == args?.toLowerCase()) || message.member
        let avatarDoMember = member.displayAvatarURL({ size: 1024, forceStatic: false, extension: 'jpg' })
        let avatarGlobal = member.user.displayAvatarURL({ size: 1024, forceStatic: false, extension: 'jpg' })
        console.log(args);

        let buttonGlobal = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('global.avatar')
                .setLabel('Global avatar')
                .setStyle(ButtonStyle.Primary)
        )

        let buttonGuild = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('guild.avatar')
                .setLabel('Guild avatar')
                .setStyle(ButtonStyle.Primary)
        )

        let embed = new EmbedBuilder()
            .setColor(member.displayHexColor || "#8BCAD9")
            .setTitle(member.nickname || member.user.globalName)
            .setDescription(`Download the member avatar by clicking [here](${avatarDoMember})`)
            .setImage(avatarDoMember)
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ forceStatic: false, size: 512 }) })

        message.reply({ embeds: [embed], components: [buttonGlobal] }).then(async (interaction) => {
            let filter = i => i.user.id === message.author.id
            let colector = interaction.createMessageComponentCollector({
                filter: filter,
            })
            colector.on('collect', coll => {
                switch (coll.customId) {
                    case 'global.avatar': {
                        coll.deferUpdate()
                        interaction.edit({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`🗺️ | Global profile of ${member.user.username}`)
                                    .setDescription(`Download the user avatar by clicking [here](${avatarGlobal})`)
                                    .setColor('#45A9BF')
                                    .setImage(avatarGlobal)
                            ], components: [buttonGuild]
                        })
                    } break;

                    case 'guild.avatar': {
                        coll.deferUpdate()
                        interaction.edit({
                            embeds: [embed], components: [buttonGlobal]
                        })
                    } break;
                }
            })
        })
    }
}