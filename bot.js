const { Intents, Client } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
    ]
});

client.config = require('./config.json')
client.login(client.config.TOKEN);

client.on('ready', () => {
    console.log(`[EVENT] : (${client.shard.ids}) ${client.user.tag} has Ready`)
})