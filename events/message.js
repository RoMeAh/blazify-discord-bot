require('dotenv').config();
const Money = require("../models/money.js");
const config = require("../config.json");
const Prefix = require("../models/prefix.js");
const XP = require("../models/xp.js");
const { Client } = require('discord.js');
const createCaptcha = require('./captcha.js');
const fs = require('fs').promises;
const Settings = require("../models/configsetting.js");
let prefix;
let enableXPCoinsS;
let enableXPS;
let enableCaptchaS;
module.exports = async (client, message, member) => {
    
  /// if (message.content.includes(message.mentions.users.first())) {
   ///  client.afk.forEach(data => {
   ///    if (data.id === message.mentions.users.first().id) {
   ///      message.guild.fetchMember(data.id).then(member => {
   ////      let usertag = member.user.tag;
  //       return message.channel.send(`**${usertag}** is AFK. Reason: ${data.reason}`);
 //      }
 //  )}
 //    });
 //  };

 //  let checkafk = client.afk.get(message.author.id);
  // if (checkafk) return [client.afk.delete(message.author.id), message.channel.send(`Your status has been updated, and you are no longer afk.`)]
  let allGuilds = client.guilds.array();
  for (let i = 0; i < allGuilds.length; i++) {
  if(message.author.bot) return;
  Prefix.findOne(
    {
      guildID: allGuilds[i].id
    },
    (err, guild) => {
      if (err) console.error(err);

      if (!guild) {
        prefix = "b3";
      } else {
        prefix = guild.prefix; 
      };
    }
  );

  await Settings.findOne(
    { guildID: allGuilds[i].id },
    async (err, settings) => {
      if (err) console.log(err);

      if (!settings) {
        enableXPCoinsS = false;
        enableXPS = false;
        enableCaptchaS = false;
      } else {
        enableXPCoinsS = settings.enableXPCoins;
        enableXPS = settings.enableXP;
        enableCaptchaS = settings.enableCaptcha
      }
    })
  }
  if (enableCaptchaS === true) {
    const captcha = await createCaptcha();
    try {
        const msg = await member.send('You have 60 seconds to solve the captcha', {
            files: [{
                attachment: `${__dirname}/captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly.');
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 3600000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have verified yourself!');
                await member.addRole("690664505037946951");
                await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time and you were kicked out of the server');
            await member.kick();
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
}
  if (enableXPS === true) {
    let addXP = Math.floor(Math.random() * 10 + 1);

    await XP.findOne({ userID: message.author.id, guildID: message.guild.id }, async (err, xp) => {
      if (err) console.log(err);

      if (!xp) {
        const newXP = new XP({
          userID: message.author.id,
          guildID: message.guild.id,
          userName: message.author.username,
          xp: addXP,
          level: 1
        });
        newXP.save().catch(err => console.log(err));
      }else {

      xp.xp = xp.xp + addXP;
      let nextLevel = xp.level * 300;

      if (nextLevel <= xp.xp) {
        xp.level = xp.level + 1;

        xp.save().catch(err => console.log(err));
        const channel =
          message.guild.channels.find(c => c.name === "level-up") || message.channel;
        return channel.send(
          `${message.author.tag} has hit level ${xp.level}`
        );
            }
          }
    });
  }

  if (enableXPCoinsS === true) {
    let coinstoadd = Math.ceil(Math.random() * 5) + 5;
    Money.findOne(
      { userID: message.author.id, userName: message.author.username, serverID: message.guild.id },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            userID: message.author.id,
            userName: message.author.username,
            serverID: message.guild.id,
            money: coinstoadd
          });
          newMoney.save().catch(err => console.log(err));
        } else {
          money.money = money.money + coinstoadd;
          money.save().catch(err => console.log(err));
        }
      }
    );
  }
  
  
  if (message.channel.type === "dm")
    return message.channel.send("You are not supposed to DM Bots");
  
      if (message.content.includes(message.mentions.members.first())) {
    let mentioned = await client.afk.get(message.mentions.users.first().id);
  
    if (mentioned) message.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
  }

  if (!message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

  if (!message.member)
    message.member = await message.guild.fetchMember(message); ///end it
}