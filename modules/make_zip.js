const archiver = require("archiver");
const fs = require("fs");

module.exports = function() {
  let zip = archiver("zip");
  let output = fs.createWriteStream("output/flashableZip.zip");
  zip.pipe(output);
  zip.file("output/splash.img", { name: "splash.img" });
  zip.directory("utils/flash_file", "/");
  zip.finalize();
};
