const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'help',
    callback: async({ message, args, client }) => {
        const { guild, channel } = message
        const sentMessage = await message.channel.send(new MessageEmbed()
            .setTitle(`🧐 | jogas Help `)
            .setColor('#FF0000')
            .setDescription(`
            ___________________________________________________________________________________________________________________

            🥳 | развлекаловка     
              .rps  <камень, ожници, бумага!>                       
              .ball  <ваше запитання!>                             
                привет 
                help pls
                qq
              .mon
              .comment
              .illegal
___________________________________________________________________________________________________________________

            🧐 | инфа
             .help <Хелп!>
             .weather <город!>
             .link <количиство приглашений>
             .подсказка <подсказка длявашего сообщения>
             .profile <ваш профыль!>
             .v <ID ролі> <ADMINISTRATOR!>
             .rep <ваше предложение!>
             .clear <ADMINISTRATOR!>
             .ping
             .s   <ADMINISTRATOR!>
             .server
             .invaite <ADMINISTRATOR!>
             ___________________________________________________________________________________________________________________

            🌎 | голосовалка
            .gol<голосованиэ!>

            ___________________________________________________________________________________________________________________


            `)
            .setImage('https://cdn.discordapp.com/attachments/830157187111321600/836595357986062386/PicsArt_04-24-06.26.49.png'))
        sentMessage.react('✅')




    }
}