const { RichEmbed } = require("discord.js");
let XP = require("../../models/xp.js");
let Coin = require("../../models/coin.js");
let Money = require("../../models/money.js");
let Settings = require("../../models/settings.js");

module.exports = {
    name: "profile",
    aliases: ["pf"],
    category: "Utility",
    description: "Shows profile of a user",
    run: async (client, message, args) => {
      
      if (args[0]) {
        
        let xp;
        let level;
        let coin;
        let xpcoins;
        let member = message.mentions.members.first();
      
        await XP.findOne({ userID: member.user.id }, (err, xps) => {
          
          if (err) console.log(err);
          
          if (!xps) {
            xp = 0;
            level = 1;
          } else {
            xp = xps.xp;
            level = xps.level;
          };
        });
        
        await Coin.findOne({ userID: member.user.id }, (err, coins) => {
          
          if (err) console.log(err);
          
          if (!coins) {
            coin = 0;
          } else {
            coin = coins.coins;
          };
        });
        
        await Money.findOne({ userID: member.user.id, serverID: message.guild.id }, (err, xpcoin) => {
          
          if (err) console.log(err);
          
          if (!xpcoin) {
            xpcoins = 0;
          } else {
            xpcoins = xpcoin.money;
          };
        });
        
        let profile = new RichEmbed()
        .setThumbnail(message.author.avatarURL)
        .setColor("#FF0000")
        .setTitle(`${member.user.username}'s Profile`)
        .addField("Coins:", coin);
        
        await Settings.findOne({ guildID: message.guild.id }, async (err, settings) => {
          
          if (err) console.log(err)
          
          if (settings.enableXPCoins === true) {
            await profile.addField("XPCoins:", xpcoins)
          };
          if (settings.enableXP === true) {
            await profile.addField("XP", `${xp}/${Math.round(level * 300)}`)
            await profile.addField("Level", level)
          };
        });
        
        return message.channel.send(profile);
      } else {
        
        let xp;
        let level;
        let coin;
        let xpcoins;
        
        await XP.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, xps) => {
          
          if (err) console.log(err);
          
          if (!xps) {
            xp = 0;
            level = 1;
          } else {
            xp = xps.xp;
            level = xps.level;
          }
        });
        
        await Coin.findOne({ userID: message.author.id }, (err, coins) => {
          
          if (err) console.log(err);
          
          if (!coins) {
            coin = 0;
          } else {
                coin = coins.coins;
          }
          
        });
        
        await Money.findOne({ userID: message.author.id, serverID: message.guild.id }, async (err, xpcoin) => {
          
          if (err) console.log(err);
          
          if (!xpcoin) {
            xpcoins = 0;
          } else {
                xpcoins = xpcoin.money;
          }

        })
        
        let profile = new RichEmbed()
        .setThumbnail(message.author.avatarURL)
        .setTitle(`${message.author.username}'s Profile`)
        .addField("Coins:", coin)
        .setColor("#FF0000");
        
        await Settings.findOne({ guildID: message.guild.id }, async (err, settings) => {
          
          if (err) console.log(err);
          
          setTimeout(async () => {
            
          if (settings.enableXPCoins === true) {
            await profile.addField("XPCoins:", xpcoins)
          } else
          if (settings.enableXP === true) {
            await profile.addField("XP", `${xp}/${Math.round(level * 300)}`)
            await profile.addField("Level", level)
          } else if (settings.enableXPCoins === true && settings.enableXP === true) {
            await profile.addField("XPCoins:", xpcoins)
            await profile.addField("XP", `${xp}/${Math.round(level * 300)}`)
            await profile.addField("Level", level)
          };
            
          }, 1000)
          
        })
        
        return message.channel.send(profile);
      
      };
    }
}