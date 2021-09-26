const Discord = module.require("discord.js");
const Jimp = require("jimp");


module.exports = {
    name: "illegal",
    description: "Provide a text to Trump for making it illegal",
    callback: async({ message, args, client }) => {
        message.delete()
        if (message.channel.type === "dm") return;
        let meow = message.content.split(" ").slice(1);
        let args1 = meow.join(' ');
        let illegal = `https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/` + args1.toUpperCase() + `.gif`;
        if (!args1) {
            return message.reply('Вам нужно предоставить текст, чтобы сделать его незаконным');
        }
        if (meow.length > 1) {
            return message.reply('Только одно можно сделать незаконным за раз');
        }
        const emb = new Discord.MessageEmbed();
        emb.setAuthor("Трам обявил " + meow + " незаконим!", "http://blog.adsy.me/wp-content/uploads/2016/11/angry-side-face-trump-transparent.png");
        emb.setImage(illegal);
        emb.setColor('RANDOM')
        message.channel.send({
            embed: emb
        })
    }
};