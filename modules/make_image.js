const shell = require("shelljs");

module.exports = function(ctx) {
  //this method doesn't seems to work
  //shell.cat(["utils/empty_header.img", "images/splash1.bmp", "images/splash2.bmp", "images/splash3.bmp", "images/splash4.bmp"]).to("output/splash.img");
  shell.exec(`cat utils/empty_header.img users/${ctx.from.id}/images/splash1.bmp users/${ctx.from.id}/images/splash2.bmp users/${ctx.from.id}/images/splash3.bmp users/${ctx.from.id}/images/splash4.bmp > users/${ctx.from.id}/output/splash.img`);
};
