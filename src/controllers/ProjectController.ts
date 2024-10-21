import type { Request, Response, NextFunction } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findById(id).populate("tasks");
    if (!project) {
      const error = new Error("Project no found");
      res.status(404).json({ error: error.message });
      return;
    }
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
    if (!project) {
      const error = new Error("Project no found");
      res.status(404).json({ error: error.message });
      return;
    }
    await project?.deleteOne();
    res.send("Project Deleted Successfully");
  };
}
