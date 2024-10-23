import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import TaskController from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";

const router = Router();
/**
 *@swagger
 *components:
 *   schemas:
 *      Project:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the project
 *                  example: 5f7f5b3b5f3d1b0017f3b1b1
 *              projectName:
 *                  type: string
 *                  description: The name of the project
 *                  example: Project 1
 *              clientName:
 *                  type: string
 *                  description: The name of the client
 *                  example: Client 1
 *              description:
 *                  type: string
 *                  description: The description of the project
 *                  example: This is a project
 *              tasks:
 *                  properties:
 *                      id:
 *                          type: string
 *                          description: The auto-generated id of the task
 *                          example: 5f7f5b3b5f3d1b0017f3b1b1
 *                      name:
 *                          type: string
 *                          description: The name of the task
 *                          example: Task 1
 *                      description:
 *                          type: string
 *                          description: The description of the task
 *                          example: This is a task
 *                      project:
 *                          type: string
 *                          description: The id of the project the task belongs to
 *                          example: 5f7f5b3b5f3d1b0017f3b1b1
 *                      status:
 *                          type: string
 *                          description: The status of the task
 *                          example: pending
 */

/**
 * @swagger
 * /api/projects:
 *      get:
 *          summary: Get all projects
 *          tags:
 *              - Projects
 *          description: Get all projects
 * */

router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.createProject,
);
router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  ProjectController.getProjectById,
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.updateProject,
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  ProjectController.deleteProject,
);

/** Routes for tasks */
router.param("projectId", projectExist);
router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Description of task is required"),
  handleInputErrors,
  TaskController.createTask,
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", taskExist);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid task id"),
  handleInputErrors,
  TaskController.getTaskById,
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid task id"),
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Description of task is required"),
  handleInputErrors,
  TaskController.updateTask,
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid task id"),
  handleInputErrors,
  TaskController.deleteTask,
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("Invalid project id"),
  param("taskId").isMongoId().withMessage("Invalid task id"),
  body("status").notEmpty().withMessage("Status is required"),
  handleInputErrors,
  TaskController.updateStatus,
);

export default router;
