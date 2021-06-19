const Discord = require('discord.js');
const { RedditSimple } = require('reddit-simple');
const client = new Discord.Client();
const config = require('./config.json')


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('🐑');
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'wooloo' || command === '🐑' || command === ':sheep:') {
        let wooloo = () => {
            RedditSimple.RandomPost('wooloo').then((post) => {
                let data = post[0].data;
                if (data.over_18 || data.pinned || data.is_self) {
                    wooloo();
                    return;
                }
                message.channel.send(`${data.title}\n${data.url}`);
            });
        };
        wooloo();
    } else if (command === 'uwu') {
        message.channel.send(`🥺🥺If being cute is a crime I'd gladly go to jail🥺🥺`);
    } else if (command === 'help') {
        message.channel.send(`type ${config.prefix}wooloo`);
    }
});

client.login(config.token);