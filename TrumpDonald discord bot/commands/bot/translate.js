const Discord = require("discord.js");

// Plugins
const translate = require("translate-google");

exports.run = async (client, message, args) => {
  translate(args.join(" "), { to: "en" })
    .then((res) => {
      message.channel.send(res);
    })
    .catch((err) => {
      message.reply("Sorry I can't translate it beacuse: " + err);
    });
};

exports.conf = {
  aliases: ["tran"],
  permlvl: 0,
};

exports.help = {
  name: "translate",
  description: "Translates the language to english",
  useage: "translate",
};
