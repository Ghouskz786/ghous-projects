const { imageKit } = require("./imageKitConfig");
exports.deleteFile = async (postId) => {
  try {
    const res = await imageKit.deleteFile(postId);
    return { success: true };
  } catch (err) {
    return { success: false, messages: ["an unexpected error occured"] };
  }
};
