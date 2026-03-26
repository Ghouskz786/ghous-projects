const { imageKit } = require("./imageKitConfig");

exports.uploadItem = async (file, fileName) => {
  try {
    const result = await imageKit.upload({
      folder: "zomato-reel-images",
      file,
      fileName,
    });
    return { success: true, result };
  } catch (err) {
    return {
      success: false,
      messages: ["Check internet connection and try again"],
    };
  }
};
