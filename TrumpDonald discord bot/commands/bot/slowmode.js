const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.reply("Please prevoid how long to set the slowmode");
  if (isNaN(parseInt(args[0]))) return message.reply("That's not a number!");

  message.channel.setRateLimitPerUser(args[0]);
  message.channel.send(
    `Successfully changed the slowmode to **${args[0]}** seconds`
  );
};

exports.conf = {
  aliases: ["smode", "sm"],
  permlvl: 3,
};

exports.help = {
  name: "slowmode",
  description: "Changes the slowmode of the channel",
  useage: "slowmode",
};
