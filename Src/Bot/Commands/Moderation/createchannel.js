const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class CC extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "createchannel",
      description: "Creates a channel in the server",
      usage: "b3cc <channel-type (text, voice> <channel-name>",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["cc"],
      permLevel: 1,
      permission: "CREATE_CHANNEL"
    });
  }
async run(client, message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)")
  try {
    if (!args[1]) return message.reply('You need to input the channel name!');
    if (!args[0]) return message.reply('You need to input the channel type!');

    message.channel.send('I\'ve created the channel!').then(() => {
      message.guild.channels.create(args.slice(1).join(" "), args[0], []).catch((err) => {
        message.channel.send('There was an error!')
      })
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
    }
}
module.exports = CC;