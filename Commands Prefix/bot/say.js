const { EmbedBuilder, Message } = require("discord.js")

module.exports = {
    name: "say",
    aliases: ["send"],

    run: async (client, msg, args) => {
        /**
         * @type {Message}
         */
        let message = msg
        let embed = new EmbedBuilder()
            .setColor('#4EB1D9')
            .setTitle(`<:discotoolsxyzicon27:1267637302897672285> | Template to use the command:`)
            .setDescription(` • () => optional\n • {} => required\n\n<:discotoolsxyzicon21:1267637378244415519> Synonyms: \`;say / ;send\`\n\n\`;say (channel) {message}\``)
        if (!args.length) return message.reply({ content: `<:discotoolsxyzicon100:1268952742370480211> | You haven't written a message`, embeds: [embed] })

        let channel = args?.[0]
        let channelToSend = message.mentions.channels.first() || await message.guild.channels.fetch(channel).catch(() => { }) || message.guild.channels.cache.get(channel) || message.guild.channels.cache.find(channel => channel.name == args?.[0]?.toLowerCase())

        let messageToSend = `${args.join(" ")}\n\n-# Message sent by ${message.author.username}`
        if (channelToSend.id !== message.channel.id) {
            let replyMessage = await message.reply(`<:discotoolsxyzicon53:1267636956855144571> Sending message...`)
            let idDaMensagem = await channelToSend.send(
                removerPrimeiraPalavra(messageToSend)
            )
            await replyMessage.edit(`<:discotoolsxyzicon69:1267636778764992572> Your message has been successfully sent: https://discord.com/channels/${message.guild.id}/${channelToSend.id}/${idDaMensagem.id}`)
        } else {
            message.channel.send(messageToSend)
        }

        function removerPrimeiraPalavra(texto) {
            const indiceEspaco = texto.indexOf(' ');
            if (indiceEspaco !== -1) {
              return texto.substring(indiceEspaco + 1);
            } else {
              return '';
            }
          }
          
    }
}