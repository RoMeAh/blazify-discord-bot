import { Command } from "discord-akairo";
import { Message } from "discord.js";


export default class Join extends Command{
    public constructor() {
        super ( "join" , {
            aliases: ["join" , "vcjoin"] ,
            category: "Music" ,
            description: {
                content: "Joins a Voice Channel" ,
                examples: [
                    "<<join"
                ]
            } ,
            ratelimit: 3 ,
        } );
    }

    public async exec(message : Message) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
        // @ts-ignore
        if(!this.client.lava.playerCollection.get(message.guild?.id)) {
            // @ts-ignore
            let player = await this.client.lava?.spawnPlayer ( this.client.lava , {
                guild: message.guild ,
                voiceChannel: message.member?.voice.channel ,
                textChannel: message.channel ,
                deafen: true ,
                trackRepeat: false ,
                queueRepeat: false ,
                skipOnError: true
            } );
                setTimeout(() => {
                    if(!player.playState) {
                        player.destroy ( message.guild )
                    }
                }, 60000)
        } else {
            return message.util?.send("The Bot is already present on a Voice Channel")
        }
    }
}