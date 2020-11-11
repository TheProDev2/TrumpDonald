const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let method = args[1];
  let firstNumber = Number(args[0]);
  let secondNumber = Number(args[2]);

  const operations = ["+", "-", "x", "/"];

  if (!method) return message.reply("Please choose an operator");
  if (!operations.includes(method))
    return message.reply(
      "When choosing an operation please select: +, -, x, /"
    );
  if (!firstNumber)
    return message.reply("Please select two numbers to calculate");
  if (!secondNumber)
    return message.reply("Please select two numbers to calculate");

  if (isNaN(firstNumber))
    return message.reply("The first number you selected is not a number");
  if (isNaN(secondNumber))
    return message.reply("The second number you selected is not a number");

  if (method === "+") {
    let doMath = firstNumber + secondNumber;

    message.channel.send(`${firstNumber} + ${secondNumber} = ${doMath}`);
  }

  if (method === "-") {
    let doMath = firstNumber - secondNumber;

    message.channel.send(`${firstNumber} - ${secondNumber} = ${doMath}`);
  }

  if (method === "x") {
    let doMath = firstNumber * secondNumber;

    message.channel.send(`${firstNumber} x ${secondNumber} = ${doMath}`);
  }

  if (method === "/") {
    let doMath = firstNumber / secondNumber;

    message.channel.send(`${firstNumber} / ${secondNumber} = ${doMath}`);
  }
};

exports.conf = {
  aliases: ["cal"],
  permlvl: 1,
};

exports.help = {
  name: "calculator",
  description: "It's a regular calculator but in discord bot command",
  useage: "calculator",
};
