const Discord = require("discord.js");
const client = new Discord.Client();

const { prefix, official_theprodev } = require("./config.json");

// Plugins
const fs = require("fs");
const AsciiTable = require("ascii-table");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync(`./commands`).forEach((dir) => {
  const commandFiles = fs
    .readdirSync(`./commands/${dir}/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const kumotcucklar = require(`./commands/${dir}/${file}`);
    var table = new AsciiTable("TheProDev's Command Table");

    table.setHeading("Command", "Status", "Aliases");

    if (kumotcucklar.help.name) {
      client.commands.set(kumotcucklar.help.name, kumotcucklar);
      table.addRow(kumotcucklar.help.name, "✔️", kumotcucklar.conf.aliases);
    } else {
      table.addRow(kumotcucklar.help.name, "❌");
      continue;
    }

    kumotcucklar.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, kumotcucklar.help.name);
    });

    console.log(table.toString());
  }
});

client.on("message", (message) => {
  let client = message.client;

  client.user.setActivity("d!help", { type: "PLAYING" }).catch(console.error());

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;

    cmd.run(client, message, params, perms);
  }
});

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;

  if (message.member.hasPermission("SEND_MESSAGE")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTATOR")) permlvl = 3;
  if (message.author.id === official_theprodev) permlvl = 4;

  return permlvl;
};

client.login(process.env.token);
