import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export default class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project?.id;
      req.project?.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project?.save()]);
      res.send("Task created correctly");
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project?.id });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };
}
