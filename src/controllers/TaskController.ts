import type { Request, Response } from "express";
import Project from "../models/Project";
import Task, { ITask } from "../models/Task";

export default class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const task = new Task(req.body);
    task.project = req.project?.id;
    req.project?.tasks.push(task.id);
    await Promise.allSettled([task.save(), req.project?.save()]);
    res.status(201).json(task);
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({ project: req.project?.id }).populate(
      "project",
    );
    res.json(tasks);
  };

  static getTaskById = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  };

  static updateTask = async (req: Request, res: Response) => {
    req.task.name = req.body.name;
    req.task.description = req.body.description;
    await req.task.save();
    res.send("Task updated correctly");
  };

  static deleteTask = async (req: Request, res: Response) => {
    req.project.tasks = req.project.tasks.filter(
      (task) => task?.toString() !== req.task.id.toString(),
    );

    await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
    res.send("Task deleted correctly");
  };

  static updateStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    req.task.status = status;
    await req.task.save();
    res.send("Task status updated correctly");
  };
}
