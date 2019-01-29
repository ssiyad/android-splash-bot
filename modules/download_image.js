const download = require("image-downloader");

module.exports = async function(url, path) {
  const options = {
    url: url,
    dest: path
  }
  try {
    const { filename, image } = await download.image(options);
  } catch (e) {
    console.error(e);
  }
}
