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
    const projects = await Project.find({
      $or: [{ manager: { $in: req.user?._id } }],
    });
    res.json(projects);
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id).populate("tasks");
    if (!project) {
      const error = new Error("Project not found");
      res.status(404).json({ error: error.message });
      return;
    }
    if (
      !project.manager ||
      project.manager.toString() !== req.user?._id?.toString()
    ) {
      const error = new Error("Unauthorized access");
      res.status(403).json({ error: error.message });
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

    if (
      !project.manager ||
      project.manager.toString() !== req.user?._id?.toString()
    ) {
      const error = new Error("Only the manager can update the project");
      res.status(403).json({ error: error.message });
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
      const error = new Error("Project not found");
      res.status(404).json({ error: error.message });
      return;
    }
    if (
      !project.manager ||
      project.manager.toString() !== req.user?._id?.toString()
    ) {
      const error = new Error("Only the manager can delete the project");
      res.status(403).json({ error: error.message });
      return;
    }
    await project?.deleteOne();
    res.send("Project Deleted Successfully");
  };
}
