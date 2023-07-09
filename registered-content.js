require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'testoptions',
    description: 'oui je met test',
    options:  [
      {
        name: 'option-un',
        description: 'Numero-Un',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'un',
            value: '1',
          },
          {
            name: 'deux',
            value: '2',
          },
          {
            name: 'trois',
            value: '3',
          },
        ],
        required: true,
      },
      {
        name: 'option-deux',
        description: 'Numero-deux',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();