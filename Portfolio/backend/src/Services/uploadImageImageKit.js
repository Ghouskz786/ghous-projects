const crypto = require("crypto");
const Imagekit = require("imagekit");
const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
exports.uploadImage = async ({ file }) => {
  try {
    const result = await imagekit.upload({
      file: file,
      folder: "portfolio-projects",
      fileName: crypto.randomUUID().toString(),
    });
    return { success: true, result: result };
  } catch (err) {
    return {
      success: false,
      messages: ["check your internet connection and try again"],
    };
  }
};
