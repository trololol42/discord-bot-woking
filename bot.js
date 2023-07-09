require('dotenv').config();
const Discord = require('discord.js');
const { GatewayIntentBits } = Discord;
const { SlashCommandBuilder } = require('discord.js');
const client = new Discord.Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = '!';

// Command handler
const commands = new Discord.Collection();
client.on('error', console.error);

// Ping command
commands.set('ping', (interaction) => {
  interaction.reply('Pong!');
});


// Hello command
commands.set('hello', (interaction) => {
  interaction.reply('Hello there!');
});

// Hey command
commands.set('hey', (interaction) => {
  interaction.reply('FINI LETSGO');
});

// options command
client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'testoptions') {
    const num1 = interaction.options.get('option-un').value;
    const num2 = interaction.options.get('option-deux').value;

    interaction.reply(`The sum is ${num1 + num2}`);
  }
});


client.on('ready', () => {
  console.log(`Bot qui marche pas d'erreur, connecté avec: ${client.user.tag}`);
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "hping") {
    await interaction.reply("Pong!");
  }

  const { commandName } = interaction;
  if (commands.has(commandName)) {
    try {
      commands.get(commandName)(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(process.env.TOKEN);