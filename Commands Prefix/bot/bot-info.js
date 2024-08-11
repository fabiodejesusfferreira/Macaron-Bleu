const { EmbedBuilder, Message, version, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const MongoClient = require("mongodb").MongoClient;
const config = require('../../config.json');
const process = require('node:process')

module.exports = {
    name: "bot-info",
    aliases: ["botinfo", 'bi'],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg
        let seta = '<:discotoolsxyzicon61:1267636861321613372>  •'
        let time = `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`
        let timeComplemento = `<t:${Math.floor(client.user.createdTimestamp / 1000)}:f>`
        let prefix = client.commands.map(a => a.name).length
        let slash = client.slashCommands.map(a => a.commandName).length
        let users = message.client.users.cache.filter(usuario => !usuario.bot).size

        let embedBotInfo = new EmbedBuilder()
            .setColor('#4EB1D9')
            .setAuthor({ name: `Macaron Bleu`, iconURL: `https://media.discordapp.net/attachments/1267138684994584577/1270528074257006612/Default_Create_a_vibrant_twodimensional_cartoon_illustration_o_2.jpg?ex=66b406fa&is=66b2b57a&hm=d8c79811e51327eb265b8ed8441b2317fff6ce984e1dc79533a8489d29bf82e9&=&format=webp&width=701&height=701` })
            .setFields(
                { name: `> <:discotoolsxyzicon83:1267636538179715142> Informations`, value: `${seta} Name: <@1266420565447544862> (\`${client.user.tag}\`)\n${seta} ID: ${client.user.id}\n${seta} Created: ${time} (${timeComplemento})\n${seta} Prefix: \`;\`\n${seta} Total commands: ${prefix + slash}` },
                { name: `> <:statics:1270536665676382389> Stastistics`, value: `${seta} Total servers: **${client.guilds.cache.size}**\n${seta} Total users: ${users}\n${seta} Bot's ping: ${botPing}ms\n ${seta} Message's ping: ${messagePing}ms\n${seta} Database ping: ${databasePing}` },
                { name: `> <:discotoolsxyzicon28:1267637289836871740> Versions:`, value: `${seta} Discord.js: ${discordjsversion}\n${seta} Node: ${node}` }
            )
            .setFooter({ text: `Thank you for choosing me S2`, iconURL: message.author.displayAvatarURL() })

        message.reply({ embeds: [embedBotInfo], components: [buttons] })
    }
}