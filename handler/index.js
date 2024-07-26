const fs = require("fs")

module.exports = async (client) => {

    const SlashsArray = [];

    fs.readdir(`./Commands Slash`, (error, folder) => {
        folder.forEach(subfolder => {
            fs.readdir(`./Commands Slash/${subfolder}/`, (error, files) => {
                files.forEach(files => {

                    if (!files?.endsWith('.js')) return;
                    files = require(`../Commands Slash/${subfolder}/${files}`);
                    if (!files?.name) return;
                    client.slashCommands.set(files?.name, files);

                    SlashsArray.push(files)
                });
            });
        });
    });
    client.on("ready", async () => {
        client.guilds.cache.forEach(guild => guild.commands.set([]))
        client.application.commands.set(SlashsArray) /* .then(() => {
            console.log(`Carregado ${SlashsArray.length} comandos slash (/)`);
        }) */
    });
};