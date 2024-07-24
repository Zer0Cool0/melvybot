const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js')
const config = require('./config');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.embeds = require('./data/config/embeds');
client.e = require('./data/config/emotes');
client.c = require('./data/config/colors');

module.exports = client;

const handlersPath = path.join(__dirname, 'handlers');
fs.readdirSync(handlersPath).forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).forEach((event) => {
    require(`./events/${event}`);
});

client.login(config.token);