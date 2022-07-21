const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const { token } = require("./config.json");

client.on("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", (message) => {
  const prefix = "-";
  if (!message.content.startsWith(prefix)) return;

  const messageArray = message.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  if (message.content === `${prefix}test`) {
    message.channel.send("Don't Test me! WHO DO YOU THINK YOU ARE?!");
  }

  if (cmd === `${prefix}kick`) {
    if (!args[0])
      return message.reply("You need to put someone in this command!");
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache(args[0]) ||
      message.guild.members.cache.find(
        x.user.username.toLowerCase() === args.slice(0).join(" ") ||
          x.user.username === args[0]
      );
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.reply("Where is your permission bro...");
    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return message.reply("I don't have permission to kick people!");
    if (message.member.id === member.id)
      return message.reply("You can't kick yourself man :(");

    member.kick();
    message.channel.send(`${member} just got kicked. HA`);
  }

  if (cmd === `${prefix}ban`) {
    if (!args[0])
      return message.reply("You need to put someone in this command!");
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache(args[0]) ||
      message.guild.members.cache.find(
        x.user.username.toLowerCase() === args.slice(0).join(" ") ||
          x.user.username === args[0]
      );
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply("Where is your permission bro...");
    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.reply("I don't have permission to ban people!");
    if (message.member.id === member.id)
      return message.reply("You can't ban yourself man :(");

    let reason = args.slice(1).join(" ") || "No Reason";

    member.ban({ reason: reason });
    message.channel.send(`${member} just got banned. lol`);
  }
});

client.login(token);
