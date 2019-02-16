const https = require("https");
const make_bmp = require("../modules/make_bmp");
const make_image = require("../modules/make_image");
const make_zip = require("../modules/make_zip");
const fs = require("fs");
const shell = require("shelljs");
const download = require("../modules/download_image");
const WizardScene = require("telegraf/scenes/wizard");
module.exports = new WizardScene("datas",
  (ctx) => {
    shell.mkdir(`users`, `users/${ctx.from.id}`, `users/${ctx.from.id}/images`, `users/${ctx.from.id}/output`, `users/${ctx.from.id}/utils`);
    ctx.reply("Send main logo");
    return ctx.wizard.next();
   },
  async (ctx) => {
    if(ctx.message.document != undefined){
      ctx.telegram.getFileLink(ctx.message.document.file_id).then(async link => {
        let type = (ctx.message.document.mime_type).split("/");
            file = `users/${ctx.from.id}/images/logo.${type[1]}`;
        await download(link, file);
        await make_bmp(`users/${ctx.from.id}/images/logo.${type[1]}`, "splash1", ctx);
        await make_bmp(`users/${ctx.from.id}/images/logo.${type[1]}`, "splash4", ctx);
        ctx.reply("Done! Send fastboot image");
      });
      return ctx.wizard.next();
    }else {
      await make_bmp("default_images/logo.png", "splash1", ctx);
      await make_bmp("default_images/logo.png", "splash4", ctx);
      ctx.reply("Stock logo selected\nSend fastboot image");
      return ctx.wizard.next();
    }
  },
  async (ctx) => {
    if(ctx.message.document != undefined){
      ctx.telegram.getFileLink(ctx.message.document.file_id).then(async link => {
        let type = (ctx.message.document.mime_type).split("/");
            file = `users/${ctx.from.id}/images/fastboot.${type[1]}`;
        await download(link, file);
        await make_bmp(`users/${ctx.from.id}/images/fastboot.${type[1]}`, "splash2", ctx);
        ctx.reply("Done! Send system corrupt image");
      });
      return ctx.wizard.next();
    }else {
      await make_bmp("default_images/fastboot.png", "splash2", ctx);
      ctx.reply("Stock fastboot selected\nSend system corrupt image");
      return ctx.wizard.next();
    }
  },
  async (ctx) => {
    if(ctx.message.document != undefined){
      ctx.telegram.getFileLink(ctx.message.document.file_id).then(async link => {
        let type = (ctx.message.document.mime_type).split("/");
            file = `users/${ctx.from.id}/images/corrupt.${type[1]}`;
        await download(link, file);
        await make_bmp(`users/${ctx.from.id}/images/corrupt.${type[1]}`, "splash3", ctx);
        ctx.reply("Done! Now say okay");
      });
      return ctx.wizard.next();
    }else {
      await make_bmp("default_images/system_corrupt.png", "splash3", ctx);
      ctx.reply("Stock corrupt image selected\nSay your name");
      return ctx.wizard.next();
    }
  },
  async(ctx) => {
    await shell.cp("-r", "utils/flash_file", `users/${ctx.from.id}/utils/`);
    await fs.appendFileSync(`users/${ctx.from.id}/utils/flash_file/META-INF/com/google/android/updater-script`, `ui_print("** Idea by ${ctx.message.text} **");\nui_print("####################################");\nui_print("####################################");`);
    await make_image(ctx);
    await make_zip(ctx);
    ctx.reply("Sending output files!");
    //<------------------->//
    /*const imgs = await ctx.telegram.sendDocument(
      ctx.message.chat.id, {
        source: `users/${ctx.from.id}/output/splash.img`
       }
    );
    */
    const zips = await ctx.telegram.sendDocument(
      ctx.message.chat.id, {
        source: `users/${ctx.from.id}/output/flashableZip.zip`
       }
    );
    shell.rm("-rf", `users/${ctx.from.id}`);
    return ctx.wizard.next();
  }
);
