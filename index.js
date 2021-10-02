const Discord = require('discord.js');
const { RedditSimple } = require('reddit-simple');
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('🐑');
});

client.on('message', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'wooloo' || command === '🐑' || command === ':sheep:' || command === ':wooloo:') {
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
    } else if (command === 'nsfwooloo') {
        message.channel.send(`I'm not gonna send nsfw pictures of Wooloo, what's wrong with you?`);
    } else if (command === '🥺' || command === ':pleading:' || command === ':pleading_face:') {
        message.channel.send(`🥺🥺 If being cute is a crime I'd gladly go to jail 🥺🥺`);
    } else if (command === 'help') {
        message.channel.send(`Type ${process.env.PREFIX}wooloo to see sheepy, type ${process.env.PREFIX}🥺 to send me to jail.`);
    }
});

client.login();
