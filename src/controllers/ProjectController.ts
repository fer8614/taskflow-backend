import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(400).json({ error: "User not authenticated" });
      return;
    }
    const project = new Project(req.body);
    // assign a manager
    project.manager = req.user.id;

    await project.save();
    res.status(201).json(project);
  };

  static getAllProjects = async (req: Request, res: Response) => {
    const projects = await Project.find({});
    res.json(projects);
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findById(id).populate("tasks");
    res.json(project);
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      const error = new Error("Project no found");
      res.status(404).json({ error: error.message });
      return;
    }
    project.clientName = req.body.clientName;
    project.projectName = req.body.projectName;
    project.description = req.body.description;

    await project?.save();
    res.send("Project Updated Successfully");
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    await project?.deleteOne();
    res.send("Project Deleted Successfully");
  };
}
