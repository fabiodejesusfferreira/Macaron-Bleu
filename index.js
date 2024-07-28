const Discord = require("discord.js")
const config = require("./config.json")
const fs = require('fs');
const mongoose = require("mongoose");

const client = new Discord.Client({
  intents: [1, 512, 32768, 2, 128,
    Discord.IntentsBitField.Flags.DirectMessages,
    Discord.IntentsBitField.Flags.GuildInvites,
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.GuildPresences,
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessageReactions,
    Discord.IntentsBitField.Flags.GuildEmojisAndStickers
  ],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember
  ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction).catch((error) => console.log(error))
  }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

/* let atividades = [
  `❓ | Precisa de ajuda? Use /help!`,
  `☕ | Nada melhor do que um cafézinho!`,
  `🧎 | Cuidando de ${client.users.cache.filter(member => !member.bot).size} usuários!`,
  `📶 | Atualmente eu tenho 30 comandos. Que tal experimentar um?!`
]
i = 0;
setInterval(async () => {
  let atv = await db.get(`atv`)
  if (atv == 'on') return;
  client.user.setActivity(atividades[i++ % atividades.length])
}, ms('15s')); */

client.once('ready', async () => {
  console.log(`Estou online em ${client.user.username}!`)
  let prefix = client.commands.map(a => a.name).length
  let slash = client.slashCommands.map(a => a.commandName).length
  let total = prefix + slash
  console.log(`Carregado ${prefix} comandos prefix`)
  console.log(`Carregado ${slash} comandos slash (/)`);
  console.log(`Total de ${total} comandos carregados`);
  client.uptime
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./Commands Prefix/`);
fs.readdirSync('./Commands Prefix/').forEach(local => {
  const comandos = fs.readdirSync(`./Commands Prefix/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of comandos) {
    let puxar = require(`./Commands Prefix/${local}/${file}`)

    if (puxar.name) {
      client.commands.set(puxar.name, puxar)
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
  }
})

client.on('messageCreate', async message => {
  if (message.author.bot || message.channel.type == Discord.ChannelType.DM) return;
  let prefix = config.prefix;

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  let args = message.content.trim().slice(prefix.length).split(/ +/g)
  try {
    const cmd = args.shift().toLowerCase()
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    command.run(client, message, args.shift())
  } catch (err) {
    console.error('Erro: ' + err);
  }
});

client.on('ready', async () => {
  console.time('tempo-de-inicializacao-da-database')
  mongoose.set('strictQuery', true);

  await mongoose.connect(config.mongoDB)
  let conectado = await mongoose.connect(config.mongoDB)
  if (conectado) console.log(`Conectado com a database com sucesso!`)
  console.timeEnd('tempo-de-inicializacao-da-database')
})

fs.readdir('./Events', (err, file) => {
  file.forEach(event => {
    require(`./Events/${event}`)
  })

  client.on('guildCreate', async guild => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const auditLogs = await guild.fetchAuditLogs({ type: Discord.AuditLogEvent.BotAdd });
      const botAddLog = auditLogs.entries.first();

      if (botAddLog) {
        const { executor } = botAddLog;
        executor.send('Obrigado por me adicionar no seu servidor!').catch(() => { });
      } else {
        console.log('Não foi possível identificar quem adicionou o bot.');
      }
    } catch (err) {
      console.error('Erro ao tentar enviar mensagem de agradecimento:', err);
    }
  });
})