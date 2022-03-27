const { TOKEN } = require('./config.json')
const { ShardingManager } = require('discord.js')

const manager = new ShardingManager('./bot.js', {
    token: TOKEN,
    totalShards: 'auto'
})

manager.on('shardCreate', (shard) => {
    shard.on('ready', () => {
        console.log(`[SHARD] : (${shard.id}) Launched shard`)
    })

    shard.on("death", (process) => {
        console.error(`[SHARD] : (${shard.id}) closed unexpectedly! PID: ${process.pid} Exit code: ${process.exitCode}`);
    });

    shard.on("disconnect", (event) => {
        console.warn(`[SHARD] : (${shard.id}) disconnected. Dumping socket close event...`);
    });

    shard.on("reconnecting", () => {
        console.warn(`[SHARD] : (${shard.id}) is reconnecting...`);
    });

    shard.on('error', (error) => {
        console.error(`[SHARD] : (${shard.id}) is ${error}`);
    });

    shard.on('spawn', (process) => {
        console.log(`[SHARD] : (${shard.id}) is SPAWN`);
    })
})

manager.spawn()