const archiver = require("archiver");
const fs = require("fs");

module.exports = function(ctx) {
  let zip = archiver("zip");
  let output = fs.createWriteStream(`users/${ctx.from.id}/output/flashableZip.zip`);
  zip.pipe(output);
  zip.file(`users/${ctx.from.id}/output/splash.img`, { name: "splash.img" });
  zip.directory(`users/${ctx.from.id}/utils/flash_file`, "/");
  zip.finalize();
};
