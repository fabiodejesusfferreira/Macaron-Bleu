require('../index')
const { EmbedBuilder } = require('discord.js')
const client = require('../index')

client.on('ready', () => {
    const canal = client.channels.cache.get('1137400740357357568')
    // unhandledRejection - unhandledRejection - unhandledRejection - unhandledRejection
    
    const process = require('node:process')
       process.on('unhandledRejection', (reason, promise) => {
        console.log(` [SISTEMA DE ANTICRASH EXECUTADO] \>\> Unhandled Rejection/Catch`)
        console.log(reason, promise)
    
        let embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`⚠️ UM ERRO FOI DETECTADO! (Unhandled Rejection/Catch)`)
        .setDescription(`Um erro foi detectado no meu terminal!**\n\nERR:\n\n**\`\`\`` + reason + '\n\n' + promise + '\`\`\`')
        .setTimestamp(Date.now())
    
        canal.send({embeds: [embed]})
       });
    
       // multipleResolves - multipleResolves - multipleResolves - multipleResolves
       process.on('rejectionHandled', (promise) => {
        console.log(` [SISTEMA DE ANTICRASH EXECUTADO]* \>\> Rejection Handled/Catch`)
        console.log(promise)
    
        let embed = new  EmbedBuilder()
        .setColor('Red')
        .setTitle(`⚠️ UM ERRO FOI DETECTADO! (Rejection Handled/Catch)`)
        .setDescription(`Um erro foi detectado no meu terminal!**\n\nERR:\n\n** \`\`\`` + err + '\`\`\`')
        .setTimestamp(Date.now())
    
        canal.send({embeds: [embed]})
         });
         
         // uncaughtException - uncaughtException - uncaughtException - uncaughtException
         process.on('uncaughtException', (err, origin) => {
           console.log(` [SISTEMA DE ANTICRASH EXECUTADO] >> Unhandled Exception/Catch`)
        console.log(err, origin)
    
        let embed = new  EmbedBuilder()
        .setColor('Red')
        .setTitle(`⚠️ UM ERRO FOI DETECTADO! (Unhandled Exception/Catch)`)
        .setDescription(`Um erro foi detectado no meu terminal!**\n\nERR:\n\n** \`\`\`` + err + '\n\n' + origin + '\`\`\`')
        .setTimestamp(Date.now())
    
        canal.send({embeds: [embed]})
         });
         
        // uncaughtExceptionMonitor - uncaughtExceptionMonitor - uncaughtExceptionMonitor
         process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(` [SISTEMA DE ANTICRASH EXECUTADO] \>\> Uncaught Exception Monitor/Catch`)
        console.log(err, origin,)
    
        let embed = new  EmbedBuilder()
        .setColor('Red')
        .setTitle(`⚠️ UM ERRO FOI DETECTADO! (Uncaught Exception Monitor/Catch)`)
        .setDescription(`Um erro foi detectado no meu terminal!**\n\nERR:\n\n** \`\`\`` + err + '\n\n' + origin + '\`\`\`')
        .setTimestamp(Date.now())
    
        canal.send({embeds: [embed]})
         });
  })