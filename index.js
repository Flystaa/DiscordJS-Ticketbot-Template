

/// Template by TwentyDollarStudios
/// Want more? 
/// https://discord.gg/ns56mzu9
/// Support us on Ko-Fi
/// https://ko-fi.com/twentydollarstudios


const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
client.cooldowns = new Discord.Collection();


/// Template by TwentyDollarStudios
/// Want more? 
/// https://discord.gg/ns56mzu9
/// Support us on Ko-Fi
/// https://ko-fi.com/twentydollarstudios



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ticket System Template Bot has started!');
    console.log('This is a template by TwentyDollarStudios!');
    console.log('Want more?');
    console.log('https://discord.gg/ns56mzu9');
    console.log('Support us on Ko-Fi!');
    console.log('https://ko-fi.com/twentydollarstudios');
    client.user.setActivity(`REPLACEME | TwentyDollar Template`, { type: "LISTENING" })
});



/// Template by TwentyDollarStudios
/// Want more? 
/// https://discord.gg/ns56mzu9
/// Support us on Ko-Fi
/// https://ko-fi.com/twentydollarstudios



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe right answer is: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You cannot do this!');
        }
    }



/// Template by TwentyDollarStudios
/// Want more? 
/// https://discord.gg/ns56mzu9
/// Support us on Ko-Fi
/// https://ko-fi.com/twentydollarstudios




    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Spam protection active, please wait ${timeLeft.toFixed(1)} more seconds until you use \`${command.name}\`.`);
        }
    }
    


/// Template by TwentyDollarStudios
/// Want more? 
/// https://discord.gg/ns56mzu9
/// Support us on Ko-Fi
/// https://ko-fi.com/twentydollarstudios




    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error while executing this command!');
    }
});

client.login(token);



/// Template by TwentyDollarStudios
/// Want more? 
/// https://discord.gg/ns56mzu9
/// Support us on Ko-Fi
/// https://ko-fi.com/twentydollarstudios



