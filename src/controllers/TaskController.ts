import type { Request, Response } from "express";

export class TaskController {
  public static createProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    console.log(projectId);

    try {
      // Create a new task
    } catch (error) {
      console.log(error);
    }
  };
}
