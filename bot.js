//import config
const config = require("./config");

//start bot
const Telegraf = require("telegraf");
const bot = new Telegraf(config.token);
bot.startPolling();

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
bot.hears("new", Stage.enter("datas"));
