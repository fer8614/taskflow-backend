import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export default class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project?.id;
      req.project?.tasks.push(task.id);
      await task.save();
      await req.project?.save();
      res.send("Task created correctly");
    } catch (error) {
      console.log(error);
    }
  };
}
