const Discord = require("discord.js");
const Commando = require("discord.js-commando");

exports.run = async (client, message, args) => {
  const { guild, channel } = message;

  const user = message.mentions.users.first() || message.member.user;
  const member = guild.members.cache.get(user.id);

  if (member.presence.status === "dnd")
    member.presence.status = "Do Not Disturb";
  if (member.presence.status === "online") member.presence.status = "Online";
  if (member.presence.status === "idle") member.presence.status = "Idle";
  if (member.presence.status === "offline") member.presence.status = "offline";

  let status = member.presence.status;

  function game() {
    let game;

    if (user.presence.activities.length >= 1)
      game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
    else if (user.presence.activities.length < 1) game = "None";

    return game;
  }

  let nickname =
    member.nickname !== undefined && member.nicknamme !== null
      ? member.nickname
      : "None";

  const embed = new Discord.MessageEmbed()
    .setAuthor(`User info for ${user.tag}`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .setColor("RANDOM")
    .setFooter(
      `Embed created by: ${client.user.tag}`,
      client.user.displayAvatarURL()
    )
    .addFields(
      { name: "Username:", value: user.username },
      { name: "User ID:", value: user.id },
      { name: "Discord Tag:", value: user.tag, inline: true },
      { name: "Nickname:", value: nickname },
      { name: "Is Bot:", value: user.bot, inline: true },
      {
        name: "Joined Server At:",
        value: new Date(member.joinedTimestamp).toLocaleString(),
        inline: true,
      },
      {
        name: "Created At:",
        value: new Date(user.createdTimestamp).toLocaleString(),
        inline: true,
      },
      { name: "Role Count", value: member.roles.cache.size - 1, inline: true },
      {
        name: "Status:",
        value: status,
        inline: true,
      },
      { name: "Game:", value: game(), inline: true }
    );
  channel.send(embed);
};

exports.conf = {
  aliases: ["ui"],
  permlvl: 0,
};

exports.help = {
  name: "userinfo",
  description: "Gives you user that you @mention info about",
  useage: "userinfo",
};
