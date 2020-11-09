const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let pollChannel = message.mentions.channels.first();
  let pollDescription = args.slice(1).join(" ");

  if (!pollChannel)
    return message.reply("Please prevoid a channel to send in the poll");
  if (!pollDescription)
    return message.reply("You did not specify the description!");

  let pollEmbed = new Discord.MessageEmbed()
    .setAuthor(
      `Poll By: ${message.author.tag}`,
      message.author.displayAvatarURL()
    )
    .setColor("YELLOW")
    .setTitle("New Poll!")
    .setDescription(pollDescription)
    .setFooter(`Embed created by: ${client.user.tag}`, client.user.avatarURL());

  let msgEmbed = await pollChannel.send(pollEmbed);

  await msgEmbed.react("👍");
  await msgEmbed.react("👎");
};

exports.conf = {
  aliases: ["p"],
  permlvl: 2,
};

exports.help = {
  name: "poll",
  description: "Creates a poll in a cahnnel with reacations",
  useage: "poll",
};
