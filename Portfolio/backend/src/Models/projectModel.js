const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  projectImg: { type: String, required: true },
  projectGithub: { type: String, requied: true },
});
exports.ProjectModel = mongoose.model("projects", projectSchema);
