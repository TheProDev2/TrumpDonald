const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first();
  if (!user)
    return message.channel.send({
      embed: { color: "RED", title: "You need to mention the user!" },
    });

  let nick = args.slice(1).join(" ");
  if (!nick)
    return message.channel.send({
      embed: { color: "RED", title: "You need to input the nickname!" },
    });

  let member = message.guild.members.cache.get(user.id);

  if (member === message.guild.owner) {
    message.channel.send({
      embed: { color: "RED", title: "You can't change the owner's nickname!" },
    });
  } else {
    await member.setNickname(nick).catch((err) =>
      message.channel.send({
        embed: { color: "RED", description: `Error: ${err}` },
      })
    );
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: `Successfully changed **${user.tag}** nickname to **${nick}**`,
      },
    });
  }
};

exports.conf = {
  aliases: ["setnick", "snick", "setn"],
  permlvl: 3,
};

exports.help = {
  name: "setnickname",
  description: "Changes the user nickname with 1 command",
  useage: "setnickname",
};
