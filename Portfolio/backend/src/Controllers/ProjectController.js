import { validationResult } from "express-validator";
import { uploadImage } from "../Services/uploadImageImageKit.js";
import { ProjectModel } from "../Models/projectModel.js";
export const addProject = async (req, res) => {
  res.download();
  const result = validationResult(req).array();

  if (result.length !== 0) {
    const errorArray = result.map((item) => {
      return item.msg;
    });
    res.json({ success: false, messages: errorArray });
  } else {
    const result = await uploadImage({ file: req.file.buffer });

    if (result.success) {
      try {
        const project = new ProjectModel({
          title: req.body.title,
          description: req.body.description,
          projectGithub: req.body.projectGithub,
          projectImg: result.result.url,
        });
        await project.save();
        res.json({ success: true });
      } catch (err) {
        res.json({ success: false, messages: ["an unexpected error occured"] });
      }
    } else {
      res.json({ success: false, messages: result.messages });
    }
  }
};
export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.json({ success: true, projects: projects });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
