const shell = require("shelljs");

module.exports = function(normal_image, name){
  shell.exec(`convert ${normal_image} -type truecolor images/${name}.bmp`);
}

//this method return bitmap with negative height
/*convert images to bitmap using Jimp
const Jimp = require("jimp");
async function make_bmp(normal_image, name) {
  const image = await Jimp.read(normal_image);
  await image
    .writeAsync(`images/${name}.bmp`);
};
*/
