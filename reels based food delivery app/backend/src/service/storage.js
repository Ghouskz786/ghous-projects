const imageKit = require("./imageKitConfig");

exports.imageUpload = async (file, fileName) => {
  try {
    const result = await imageKit.imageKit.upload({
      file: file,
      fileName: fileName,
      folder: "zomato-reel-videos",
    });

    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
