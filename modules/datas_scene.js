const https = require("https");
const make_bmp = require("../modules/make_bmp");
const make_image = require("../modules/make_image");
const make_zip = require("../modules/make_zip");
const fs = require("fs");
const download = require("../modules/download_image");
const WizardScene = require("telegraf/scenes/wizard");
module.exports = new WizardScene("datas",
  (ctx) => {
    ctx.reply("Send main logo");
    return ctx.wizard.next();
   },
  async (ctx) => {
    if(ctx.message.document != undefined){
      ctx.telegram.getFileLink(ctx.message.document.file_id).then(async link => {
        let type = (ctx.message.document.mime_type).split("/");
            file = `images/logo.${type[1]}`;
        await download(link, file);
        await make_bmp(`images/logo.${type[1]}`, "splash1");
        await make_bmp(`images/logo.${type[1]}`, "splash4");
        ctx.reply("Done! Send fastboot image");
      });
      return ctx.wizard.next();
    }else {
      await make_bmp("default_images/logo.png", "splash1");
      await make_bmp("default_images/logo.png", "splash4");
      ctx.reply("Stock logo selected\nSend fastboot image");
      return ctx.wizard.next();
    }
  },
  async (ctx) => {
    if(ctx.message.document != undefined){
      ctx.telegram.getFileLink(ctx.message.document.file_id).then(async link => {
        let type = (ctx.message.document.mime_type).split("/");
            file = `images/fastboot.${type[1]}`;
        await download(link, file);
        await make_bmp(`images/fastboot.${type[1]}`, "splash2");
        ctx.reply("Done! Send system corrupt image");
      });
      return ctx.wizard.next();
    }else {
      await make_bmp("default_images/fastboot.png", "splash2");
      ctx.reply("Stock fastboot selected\nSend system corrupt image");
      return ctx.wizard.next();
    }
  },
  async (ctx) => {
    if(ctx.message.document != undefined){
      ctx.telegram.getFileLink(ctx.message.document.file_id).then(async link => {
        let type = (ctx.message.document.mime_type).split("/");
            file = `images/corrupt.${type[1]}`;
        await download(link, file);
        await make_bmp(`images/corrupt.${type[1]}`, "splash3");
        ctx.reply("Done! Now say okay");
      });
      return ctx.wizard.next();
    }else {
      await make_bmp("default_images/system_corrupt.png", "splash3");
      ctx.reply("Stock corrupt image selected\nSay okay");
      return ctx.wizard.next();
    }
  },
  async(ctx) => {
    await make_image();
    await make_zip();
    ctx.reply("Sending output files!");
    //<------------------->//
    const zips = await ctx.telegram.sendDocument(
      ctx.message.chat.id, {
        source: "output/splash.img"
       }
    );
    return ctx.wizard.next();
  }
);
