import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(400).json({ error: "There was an error" });
  }
}

export const taskBelongsToProject = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};
