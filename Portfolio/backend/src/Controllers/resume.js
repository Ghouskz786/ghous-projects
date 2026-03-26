const path = require("path");

exports.downloadResume = async (req, res) => {
  res.download(path.join(__dirname, "../public/Ghous resume.pdf"));
};
