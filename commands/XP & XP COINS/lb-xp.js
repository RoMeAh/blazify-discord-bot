const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const Settings = require("../../models/configsetting.js");
module.exports = {
  name: "leaderboard-xpcoins",
  description: "Display's the economy leaderboard for the guild",
  usage: "!leaderboard",
  category: "economy",
  accessableby: "Members",
  aliases: ["board"],
  run: async (client, message, args) => {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableXPCoins} = guildSettings;
if(!enableXPCoins) return message.channel.send("Hmm it seems like the XPCoins commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
    let allUsers = message.guild.members.cache
      .filter(m => !m.user.bot)
      .map(m => m.user.id);

    Money.find({ userID: allUsers, serverID: message.guild.id })
      .sort([["money", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let content = "";

        let embed = new MessageEmbed()
          .setTitle(
            `Leaderboard for ${message.guild.name}`,
            message.guild.iconURL
          )
          .setColor("RANDOM");

        if (res.length === 0) {
          embed.setDescription("No data found");
        } else if (res.length < 10) {
          for (let i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User left";

            if (res[i].money === 0) {
              content += "";
            } else if (member === "User left") {
              content += `${i + 1}. ${member} - ${res[i].money} coins\n`;
            } else {
              content += `${i + 1}. ${member.user.username} - ${
                res[i].money
              } coins\n`;
            }

            if (content === "") {
              content += "No data found";
            }

            embed.setDescription(content);
          }
        } else if (res.length >= 10) {
          for (let i = 0; i < 10; i++) {
            let member =
              message.guild.members.get(res[i].userID) || "User Left";
            if (res[i].money === 0) {
              content += "";
            } else if (member === "User Left") {
              content += `${i + 1}. ${member} - ${res[i].money} coins\n`;
            } else {
              content += `${i + 1}. ${member.user.username} - ${
                res[i].money
              } coins\n`;
            }

            if (content === "") {
              content += "No data found";
            }
            embed.setDescription(content);
          }
        }

        message.channel.send(embed);
      });
  }
};