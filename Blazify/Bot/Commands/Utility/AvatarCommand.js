"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
class AvatarCommand extends discord_akairo_1.Command {
    constructor() {
        super("avatar", {
            aliases: ["avatar", "av", "pfp"],
            category: "utility",
            description: {
                content: "Displays the avatar of a user and its size",
                usage: "avatar [ user ] [ size ]",
                examples: [
                    "avatar",
                    "avatar @Hell Yea Boi",
                    "avatar @Hell Yea Boi 2048"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg) => msg.member
                },
                {
                    id: "size",
                    type: (_, str) => {
                        if (str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str)))
                            return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["-size="],
                    default: 2048
                }
            ]
        });
    }
    exec(message, { member, size }) {
        return message.util.send(new discord_js_1.MessageEmbed()
            .setTitle(`Avatar | ${member.user.tag}`)
            .setColor("#ff0000")
            .setImage(member.user.displayAvatarURL({ size: size })));
    }
}
exports.default = AvatarCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvQ29tbWFuZHMvVXRpbGl0eS9BdmF0YXJDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlDO0FBQ3pDLDJDQUEyRTtBQUUzRSxNQUFxQixhQUFjLFNBQVEsd0JBQU87SUFDOUM7UUFDSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7WUFDaEMsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSw0Q0FBNEM7Z0JBQ3JELEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLFFBQVEsRUFBRTtvQkFDTixRQUFRO29CQUNSLHNCQUFzQjtvQkFDdEIsMkJBQTJCO2lCQUM5QjthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7WUFDWixJQUFJLEVBQUU7Z0JBQ0Y7b0JBQ0ksRUFBRSxFQUFFLFFBQVE7b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLE1BQU07b0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTTtpQkFDeEM7Z0JBQ0Q7b0JBQ0ksRUFBRSxFQUFFLE1BQU07b0JBQ1YsSUFBSSxFQUFFLENBQUMsQ0FBVSxFQUFFLEdBQVcsRUFBaUIsRUFBRTt3QkFDN0MsSUFBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkgsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7b0JBQ0QsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNoQixPQUFPLEVBQUUsSUFBSTtpQkFDaEI7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxJQUFJLENBQUMsT0FBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQXdDO1FBQ2hGLE9BQU8sT0FBUSxDQUFDLElBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBWSxFQUFFO2FBQ3hDLFFBQVEsQ0FBQyxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdkMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFpQixFQUFDLENBQUMsQ0FBQyxDQUNyRSxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBMUNELGdDQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcbmltcG9ydCB7IE1lc3NhZ2UsIEd1aWxkTWVtYmVyLCBNZXNzYWdlRW1iZWQsIEltYWdlU2l6ZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF2YXRhckNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiYXZhdGFyXCIsIHtcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcImF2YXRhclwiLCBcImF2XCIsIFwicGZwXCJdLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IFwidXRpbGl0eVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIkRpc3BsYXlzIHRoZSBhdmF0YXIgb2YgYSB1c2VyIGFuZCBpdHMgc2l6ZVwiLFxuICAgICAgICAgICAgICAgIHVzYWdlOiBcImF2YXRhciBbIHVzZXIgXSBbIHNpemUgXVwiLFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYXZhdGFyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYXZhdGFyIEBIZWxsIFllYSBCb2lcIixcbiAgICAgICAgICAgICAgICAgICAgXCJhdmF0YXIgQEhlbGwgWWVhIEJvaSAyMDQ4XCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibWVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiBcInJlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogKG1zZzogTWVzc2FnZSkgPT4gbXNnLm1lbWJlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IChfOiBNZXNzYWdlLCBzdHI6IFN0cmluZyk6IG51bGwgfCBOdW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3RyICYmICFpc05hTihOdW1iZXIoc3RyKSkgJiYgWzE2LCAzMiwgNjQsIDEyOCwgMjU2LCA1MTIsIDEwMjQsIDIwNDhdLmluY2x1ZGVzKE51bWJlcihzdHIpKSkgcmV0dXJuIE51bWJlcihzdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiBcIm9wdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBbXCItc2l6ZT1cIl0sXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDIwNDhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlLCB7IG1lbWJlciwgc2l6ZSB9OiB7IG1lbWJlcjogR3VpbGRNZW1iZXIsIHNpemU6IG51bWJlcn0pOiBQcm9taXNlPE1lc3NhZ2U+IHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UhLnV0aWwhLnNlbmQobmV3IE1lc3NhZ2VFbWJlZCgpXG4gICAgICAgICAgICAuc2V0VGl0bGUoYEF2YXRhciB8ICR7bWVtYmVyLnVzZXIudGFnfWApXG4gICAgICAgICAgICAuc2V0Q29sb3IoXCIjZmYwMDAwXCIpXG4gICAgICAgICAgICAuc2V0SW1hZ2UobWVtYmVyLnVzZXIuZGlzcGxheUF2YXRhclVSTCh7c2l6ZTogc2l6ZSBhcyBJbWFnZVNpemV9KSlcbiAgICAgICAgKVxuICAgIH1cbn0iXX0=