import type { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
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
    if (!isValidObjectId(taskId)) {
      return res.status(400).json({ error: "The taskId is not validate" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found");
      return res.status(404).json({ error: error.message });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: "There was an error" });
  }
}

// export async function taskExist(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const { taskId } = req.params;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }
//     req.task = task;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "There was an error" });
//   }
// }

export function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error("Invalid action");
    res.status(400).json({ error: error.message });
    return;
  }
  next();
}

export function hasAuthorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.id.toString() !== req.project?.manager?.toString()) {
    const error = new Error("Invalid action");
    res.status(400).json({ error: error.message });
    return;
  }
  next();
}
