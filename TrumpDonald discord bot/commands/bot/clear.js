const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  async function clear() {
    message.delete();

    var amount = Number(args[0]);

    if (isNaN(parseInt(amount))) return message.reply("That's not a number!");

    const fetched = await message.channel.messages.fetch({ limit: amount });

    message.channel.bulkDelete(fetched);

    message.channel
      .send(`I have deleted **${fetched.size}** messages!`)
      .then((m) => {
        m.delete({ timeout: 5000 });
      });
  }

  clear();
};

exports.conf = {
  aliases: ["c"],
  permlvl: 2,
};

exports.help = {
  name: "clear",
  description: "Clears the messages in the channel",
  useage: "clear",
};
