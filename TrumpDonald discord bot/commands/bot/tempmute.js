const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args) => {
  var member = message.mentions.users.first();

  if (!member)
    return message.reply("You need to @mention a user to tempmute him");

  let mainrole = message.guild.roles.cache.find((r) => r.name == "Member");
  let role = message.guild.roles.cache.find((r) => r.name == "Muted");

  if (!role) return message.reply("Sorry, I can't find the 'Muted' role");
  if (!mainrole) return message.reply("Sorry, I can't find the 'Member' role");

  let time = args[1];

  if (!time) return message.reply("You did not specify the time!");

  message.member.roles.remove(mainrole.id);
  message.member.roles.add(role.id);

  message.channel.send(
    `**${member.tag}** has been muted for **${ms(ms(time))}**`
  );

  setTimeout(function () {
    message.member.roles.add(mainrole.id);
    message.member.roles.remove(role.id);

    message.channel.send(`**${member.tag}** has been unmuted!`);
  }, ms(time));
};

exports.conf = {
  aliases: ["tmute", "tm"],
  permlvl: 2,
};

exports.help = {
  name: "tempmute",
  description: "Mutes a user that you @mention for time",
  useage: "tempmute",
};
