const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const config = require('./config.json')
require('dotenv').config()
const prefix = ".";

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION'],
})

const activities = [{ type: "WATCHING", message: `3invite=10code .gg/WVzDyeeyWj` }, { type: "PLAYING", message: "3invite=10code .gg/WVzDyeeyWj" }, { type: "LISTENING", message: "3invite=10code .gg/WVzDyeeyWj" }];



client.on('ready', () => {
    setInterval(() => {
        const { type, message } = activities[Math.floor(Math.random() * activities.length)];

        client.user.setActivity(message, { type });
    }, 6000)
    client.user.setStatus('idle')



    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
    new WOKCommands(client, {
            commandsDir: 'commands',
            featureDir: 'features',
            ShowWarns: true,
            dbOptions
        })
        .setMongoPath(process.env.MONGO_URL)
        .setDefaultPrefix('.')
})

client.on('message', message => { // ивент, когда приходит любое сообщение в чат https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
    if (message.author.bot) return;
    let responses = [
        `https://discord.gg/FYy27z8CVX`,
        `https://discord.gg/FWBXxGecAf`,

    ]
    let responseq = ['`Присоединись на этот сервер`']
    let Response = responses[Math.floor(Math.random() * (responses.length))]

    var interval = setInterval(function() {
        message.member.send(`${responseq} ${Response}`)
    }, 1000 * 11000);
    if (message.content == '.profile') { // если пользователь написал "!профиль" 
        let embed = new DiscordJS.MessageEmbed() // создание ембед сообщения
            .setTitle(message.author.username) // в тайтле имя автора 
        let statua = ''
        switch (message.author.presence.status) { // проверка статусов 
            case 'online':
                statua = ':green_circle: | онлайн';
                break;
            case 'idle':
                statua = ':orange_circle: | нет на месте';
                break;
            case 'offline':
                statua = ':black_circle:  | нет в сети';
                break;
            case 'dnd':
                statua = ':red_circle: | не беспокоить';
                break;
        }
        embed.setDescription(`**Ваш дискорд айди: ${message.author.id}
    Ваш статус: ${statua}
    Дата создания аккаунта: ${message.author.createdAt.toLocaleDateString()}
    Дата входа на сервер: ${message.member.joinedAt.toLocaleDateString()}
    **`) // описание ембеда
            .setColor('RANDOM') // рандомный цвет ембеда
            .setThumbnail(message.author.avatarURL()) // вставляем в ембед аватарку пользователя
            .setImage('https://cdn.discordapp.com/attachments/830157187111321600/836595357986062386/PicsArt_04-24-06.26.49.png')
            .setFooter('Будь всегда на позитиве :3', 'https://cdn.discordapp.com/emojis/590614597610766336.gif?v=1')
        message.channel.send(embed) // отправляем сообщение в канал где была написана команда   
    }
    if (message.content == '.link') {
        let responseq = ['`Присоединись на этот сервер`']
        let responses = [
            `https://discord.gg/FYy27z8CVX`,
            `https://discord.gg/FWBXxGecAf`,

        ]
        let Response = responses[Math.floor(Math.random() * (responses.length))]
        message.member.send(`${responseq} ${Response}`)
    }

    if (message.content == '!link') {

        let responses = [
            `https://discord.gg/FYy27z8CVX`,
            `https://discord.gg/FWBXxGecAf`,

        ]
        let responseq = ['`Присоединись на этот сервер`']
        let Response = responses[Math.floor(Math.random() * (responses.length))]

        message.member.send(`
                        ${responseq}
                        ${Response}
                        `)
    }

});
client.on('message', (message) => {
    /* Проверяем что сообщение начинается с префикса */
    if (!message.content.startsWith(prefix)) return;
    /* Разделяем сообщение на массив из аргументов обрезая на длину префикса */
    let args = message.content.substring(prefix.length).split(' ');
    /* Получаем комманду, первый элемент массива */
    let command = args.shift();
    if (command === 'clear') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права для удаления сообщения');

        const arggs = message.content.split(' ').slice(1); // Все аргументы за именем команды с префиксом
        const amount = arggs.join(' '); // Количество сообщений, которые должны быть удалены
        if (!amount) return message.channel.send('Вы не указали, сколько сообщений нужно удалить!'); // Проверка, задан ли параметр количества
        if (isNaN(amount)) return message.channel.send('Это не число!'); // Проверка, является ли числом ввод пользователя 

        if (amount > 100) return message.channel.send('Вы не можете удалить 100 сообщений за раз'); // Проверка, является ли ввод пользователя числом больше 100
        if (amount < 1) return message.channel.send('Вы должны ввести число больше чем 1'); // Проверка, является ли ввод пользователя числом меньше 1

        async function delete_messages() { // Объявление асинхронной функции

            await message.channel.messages.fetch({
                limit: amount
            }).then(messages => {
                message.channel.bulkDelete(messages)
                message.channel.send(`
                        Удалено ${amount} сообщений!`)

            })
        };
        delete_messages(); // Вызов асинхронной функции
    }
})




client.on("message", (message) => { // еще один "event" (событие) , если бот находит в тексте что-то - то он делает что-то
    if (message.content.startsWith("привет")) { // если это сообщение начинается на "приветик" 
        message.channel.send("ку-ку" + message.author.username)

    }

    if (message.content === "help pls") { // если это сообщение ровняется "приветик" 
        message.member.send("здраствуй") // бот отсылает в ЛС автору сообщения - "здраствуй"


    }
    if (message.content === "qq") { // если это сообщение ровняется "qq"
        if (message.author.bot) return // если автор сообщения - бот, то не читать дальше код
        message.reply("qq") // отсылает в канал, в котором было найдено это сообщение "{упоминает автора}, qq"

    }
    if (message.content === ".invaite") {
        client.generateInvite("ADMINISTRATOR").then(invite => message.member.send(`Ссылка на добавление ${invite}`))
    }
})



client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong!${timeTaken}ms.`);
    }
    if (command === "say") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У  вас нет прав"); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */


        const argsa = args.join(' ');

        message.delete().catch(); // Удаление сообщения пользователя после отправки 

        message.channel.send(`${argsa}`)
    }
    if (command === "info") {
        let embed = new DiscordJS.MessageEmbed() // создание ембед сообщения
            .setTitle('Jogas Info')
            .setAuthor('Jogas')
        embed.setDescription(`** Дискорд айди: #9291
    Cтатус: :orange_circle: | нет на месте
    Дата создания аккаунта: 2021-04-24
    Количество серверов: ${client.guilds.cache.size}.

                         HELP
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

    **`) // описание ембеда
            .setColor('RANDOM') // рандомный цвет ембеда
            .setThumbnail('https://cdn.discordapp.com/attachments/830157187111321600/836595357986062386/PicsArt_04-24-06.26.49.png')
            .setTimestamp() // вставляем в ембед аватарку пользователя
            .setFooter('Будь всегда на позитиве :3', 'https://cdn.discordapp.com/emojis/590614597610766336.gif?v=1')
        message.channel.send(embed)
        message.react('✅')
        message.react('🛑')
    }
    if (command === "mon") {
        message.channel.send('Монета подбрасывается...')

        var random = Math.floor(Math.random() * 4) + 1; // Объявление переменной random - она вычисляет случайное число от 1 до 3

        if (random === 1) { // Если вычислено число 1, то выпадает орёл.
            message.channel.send(':full_moon: Орёл!')
        } else if (random === 2) { // Если вычислено число 2, то выпадает решка.
            message.channel.send(':new_moon: Решка!')
        } else if (random === 3) { // Если вычислено число 3, то монета падает ребром.
            message.channel.send(':last_quarter_moon: Монета упала ребром!')
        }
    }

});
client.on('message', message => {
    if (message.content === ".loop") {
        var interval = setInterval(function() {
            message.member.send('lop')
        }, 10000 * 11000);
    }
});

client.login("ODM1NTMyNTY2NTU5ODUwNDk3.YIQ0Vw.2v63L2DlmOvc8m3xyTzvVLmN_gw")
