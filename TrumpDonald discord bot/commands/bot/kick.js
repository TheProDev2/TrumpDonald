const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first();
  let member = message.guild.member(user);
  let reason = args.slice(1).join(" ");

  if (!user) return message.reply("Please specify a user to kick");
  if (user.id === message.author.id)
    return message.reply("You can't kick yourself!");
  if (user.id === client.user.id)
    return message.reply("Are you trying to kick me?!?!?");

  if (!reason) return message.reply("Please prevoid a reason");

  member
    .kick(reason)
    .then(() => {
      message.channel.send(
        `Successfully kicked **${user.tag}** for **${reason}**`
      );
    })
    .catch((err) => {
      message.channel.send({
        embed: { color: "RED", description: `Error: ${err}` },
      });
    });
};

exports.conf = {
  aliases: [],
  permlvl: 3,
};

exports.help = {
  name: "kick",
  description: "Kicks the @mentioned user from the server",
  useage: "kick",
};
