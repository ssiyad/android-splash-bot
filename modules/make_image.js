const shell = require("shelljs");

module.exports = function() {
  //this method doesn't seems to work
  //shell.cat(["utils/empty_header.img", "images/splash1.bmp", "images/splash2.bmp", "images/splash3.bmp", "images/splash4.bmp"]).to("output/splash.img");
  shell.exec("cat utils/empty_header.img images/splash1.bmp images/splash2.bmp images/splash3.bmp images/splash4.bmp > output/splash.img");
};
