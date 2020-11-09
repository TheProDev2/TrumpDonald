const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const target = message.mentions.users.first();

  if (!target) return message.reply("Please @mention a user to give the role");

  const roleName = args[1];
  const { guild } = message;

  if (!roleName) return message.reply("Please type a role name to give");

  const role = guild.roles.cache.find((r) => r.name === roleName);

  if (!role)
    return message.reply(`There are no role with name **${roleName}**`);

  const member = guild.members.cache.get(target.id);

  await member.roles.add(role).catch((err) =>
    message.channel.send({
      embed: { color: "RED", description: `Error: ${err}` },
    })
  );
  return message.channel.send(
    `Succesfully added **${roleName}** to **${member.user.tag}**`
  );
};

exports.conf = {
  aliases: ["gr"],
  permlvl: 2,
};

exports.help = {
  name: "giverole",
  description: "Gives a role to user that you @mention",
  useage: "giverole",
};
