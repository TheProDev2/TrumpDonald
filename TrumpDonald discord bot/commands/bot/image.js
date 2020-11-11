const Discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.reply("You need to specify what image that you search");
  if (args[0] === message.mentions.users.first())
    return message.reply("You can't search @mentions!");

  let result = args[0];

  image(message, result);

  function image(message, result) {
    var options = {
      url: "http://results.dogpile.com/serp?qc=images&q=" + `${result}`,
      method: "GET",
      headers: {
        Accept: "text/html",
        "User-Agent": "Chrome",
      },
    };

    request(options, function (error, response, responseBody) {
      if (error) {
        message.channel.send(error);
        return;
      }

      $ = cheerio.load(responseBody);

      var links = $(".image a.link");
      var urls = new Array(links.length)
        .fill(0)
        .map((v, i) => links.eq(i).attr("href"));

      if (!urls.length) {
        return;
      }

      message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
  }
};

exports.conf = {
  aliases: ["i"],
  permlvl: 0,
};

exports.help = {
  name: "image",
  description: "Send you image that you search",
  useage: "image",
};
