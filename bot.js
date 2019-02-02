//import config
const config = require("./config");

//start bot
const Telegraf = require("telegraf");
const bot = new Telegraf(config.token);
bot.startPolling();

//about and help
const help = "Hello! This bot helps you make custom boot logos for your devices easily. You can make a new splash screen by typing new! if you want stock instead of your own photos, type stock when ask for image! Image resoltion for whyred: 1080x1920. For further info, contact @eegad"

//modules
const make_image = require("./modules/make_image");
const make_zip = require("./modules/make_zip");

//telegraf scene
const Stage = require("telegraf/stage");
const Datas = require("./modules/datas_scene");
const session = require("telegraf/session");
const stage = new Stage([Datas])
bot.use(session())
bot.use(stage.middleware())
bot.start(ctx => {ctx.reply(help)});
bot.hears("new", Stage.enter("datas"));

//ignore if group
bot.on("message", ctx => {
  if(ctx.from.id != ctx.message.id){
    return;
  };
});
