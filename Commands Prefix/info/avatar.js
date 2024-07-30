const { EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js")
const avatarSchema = require('../../Models/avatar')

module.exports = {
    name: "avatar",
    aliases: ["av", 'profile', 'pfp'],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg
        let member = message.mentions.members.first() || message.guild.members.cache.get(args?.[0]?.trim()) || message.guild.members.cache.find(member => member.user.username == args?.[0]?.toLowerCase()) || message.member

        let avatarDoMember = member.displayAvatarURL({ size: 256, forceStatic: false, extension: 'jpg' })
        let avatarGlobal = member.user.displayAvatarURL({ size: 256, forceStatic: false, extension: 'jpg' })

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

        let novoAvatar = new avatarSchema({
            userId: message.author.id,
            targetId: member.id
        });

        let painelSize = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('painel_size')
                .setPlaceholder('Image size')
                .addOptions(
                    {
                        label: "64",
                        value: `size.64.${novoAvatar.uniqueId}`
                    },
                    {
                        label: "128",
                        value: `size.128.${novoAvatar.uniqueId}`
                    },
                    {
                        label: "256",
                        value: `size.256.${novoAvatar.uniqueId}`
                    },
                    {
                        label: "512",
                        value: `size.512.${novoAvatar.uniqueId}`
                    },
                    {
                        label: "1024",
                        value: `size.1024.${novoAvatar.uniqueId}`
                    },
                    {
                        label: "2048",
                        value: `size.2048.${novoAvatar.uniqueId}`
                    },
                )
        )

        let embed = new EmbedBuilder()
            .setColor(member.displayHexColor || "#8BCAD9")
            .setTitle(member.nickname || member.user.globalName)
            .setDescription(`Download the member avatar by clicking [here](${avatarDoMember})`)
            .setImage(avatarDoMember)
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ forceStatic: false, size: 512 }) })

        message.reply({ embeds: [embed], components: [painelSize, buttonGlobal] }).then(async (interaction) => {
            let filter = i => i.user.id === message.author.id
            let colector = interaction.createMessageComponentCollector({
                filter: filter,
            })

            await avatarSchema.findOneAndUpdate({ uniqueId: novoAvatar.uniqueId }, {
                $set: {
                    messageId: interaction.id,
                    userId: message.author.id,
                    targetId: member.id
                }
            }, { upsert: true });

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