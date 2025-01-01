import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import TaskController from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();

router.use(authenticate);
/**
 *@swagger
 *components:
 *   schemas:
 *      Projects:
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
 *                  type: array
 *                  description: id tasks that belong to the project
 *                  items:
 *                      type: string
 *                      example: 5f7f5b3b5f3d1b0017f3b1b1
 */

/**
 *@swagger
 *components:
 *   schemas:
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the task
 *                  example: 5f7f5b3b5f3d1b0017f3b1b1
 *              name:
 *                  type: string
 *                  description: The name of the task
 *                  example: Name new task
 *              description:
 *                  type: string
 *                  description: The description of the project
 *                  example: Description new task
 *
 */

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
 *                  type: array
 *                  description: id tasks that belong to the project
 *                  items:
 *                      type: string
 *                      example:
 *                          id:
 *                              5f7f5b3b5f3d1b0017f3b1b1
 *                          name:
 *                              Task 1
 *                          description:
 *                              his is a task by project 1
 *                          status:
 *                              pending
 *                          project:
 *                              5f7f5b3b5f3d1b0017f3b1b1
 */

/**
 * @swagger
 * /api/projects:
 *      post:
 *          summary: Create a new project
 *          tags:
 *              - Projects
 *          description: Return a new record un the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              projectName:
 *                                  type: string
 *                                  description: The name of the project
 *                                  example: New Project
 *                              clientName:
 *                                  type: string
 *                                  description: The name of the client
 *                                  example: New Client
 *                              description:
 *                                  type: string
 *                                  description: The description of the project
 *                                  example: This is a new project
 *          responses:
 *              201:
 *                  description: Product Created Successful
 *              400:
 *                  description: Bad Request - Invalid input
 *
 */
router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.createProject,
);

/**
 * @swagger
 * /api/projects:
 *      get:
 *          summary: Get all projects
 *          tags:
 *              - Projects
 *          description: Return a list of projects
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Projects'
 *
 */
router.get("/", ProjectController.getAllProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *      get:
 *        summary: Get a project by id
 *        tags:
 *          - Projects
 *        description: Return a project based on its unique id
 *        parameters:
 *        - in: path
 *          name: id
 *          description: The id of the project
 *          required: true
 *          schema:
 *              type: string
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Project'
 *          404:
 *            description: Project not found
 *          400:
 *            description: Invalid project id
 *
 */
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  ProjectController.getProjectById,
);

/**
 * @swagger
 * /api/projects/{id}:
 *      put:
 *           summary: Update a project
 *           tags:
 *               - Projects
 *           description: Update a project based on its unique id
 *           parameters:
 *               - in: path
 *                 name: id
 *                 description: The id of the project
 *                 required: true
 *                 schema:
 *                     type: string
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               projectName:
 *                                   type: string
 *                                   description: The name of the project
 *                                   example: New Project
 *                               clientName:
 *                                   type: string
 *                                   description: The name of the client
 *                                   example: New Client
 *                               description:
 *                                   type: string
 *                                   description: The description of the project
 *                                   example: This is a new project
 *           responses:
 *               200:
 *                   description: Project updated successful
 *                   content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Project'
 *               400:
 *                   description: Bad Request - Invalid input
 *               404:
 *                   description: Project not found
 */
router.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.updateProject,
);

/**
 * @swagger
 * /api/projects/{id}:
 *      delete:
 *          summary: Delete a project
 *          tags:
 *              - Projects
 *          description: Delete a project based on its unique id
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: Project deleted successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: Project deleted successful

 *              404:
 *                  description: Project not found
 *              400:
 *                  description: Invalid project id
 */
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  ProjectController.deleteProject,
);

/** Routes for tasks */
router.param("projectId", projectExist);

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *      post:
 *          summary: Create a new task
 *          tags:
 *              - Tasks
 *          description: Return a new record un the database
 *          parameters:
 *              - in: path
 *                name: projectId
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The name of the task
 *                                  example: New Task
 *                              description:
 *                                  type: string
 *                                  description: The description of the task
 *                                  example: This is a new task
 *          responses:
 *              201:
 *                  description: Task Created Successful
 *              400:
 *                  description: Bad Request - Invalid input
 *
 */
router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Description of task is required"),
  handleInputErrors,
  TaskController.createTask,
);

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *      get:
 *          summary: Get all tasks of a project
 *          tags:
 *              - Tasks
 *          description: Return a list of tasks of a project
 *          parameters:
 *              - in: path
 *                name: projectId
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Project'
 *              404:
 *                  description: Project not found
 *              400:
 *                  description: Invalid project id
 *
 */
router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", taskExist);
router.param("taskId", taskBelongsToProject);

/**
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}:
 *      get:
 *          summary: Get a task by id
 *          tags:
 *              - Tasks
 *          description: Return a task based on its unique id
 *          parameters:
 *              - in: path
 *                name: projectId
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *              - in: path
 *                name: taskId
 *                description: The id of the task
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Project'
 *              404:
 *                  description: Task not found
 *              400:
 *                  description: Invalid task id
 *
 */
router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid task id"),
  handleInputErrors,
  TaskController.getTaskById,
);

/**
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}:
 *      put:
 *          summary: Update a task
 *          tags:
 *              - Tasks
 *          description: Update a task based on its unique id
 *          parameters:
 *              - in: path
 *                name: projectId
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *              - in: path
 *                name: taskId
 *                description: The id of the task
 *                required: true
 *                schema:
 *                    type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The name of the task
 *                                  example: New Task Updated
 *                              description:
 *                                  type: string
 *                                  description: The description of the task
 *                                  example: This is a new task updated
 *          responses:
 *              200:
 *                  description: Task updated successful
 *              400:
 *                  description: Bad Request - Invalid input
 *
 */
router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid task id"),
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Description of task is required"),
  handleInputErrors,
  TaskController.updateTask,
);

/**
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}:
 *      delete:
 *          summary: Delete a task
 *          tags:
 *              - Tasks
 *          description: Delete a task based on its unique id
 *          parameters:
 *              - in: path
 *                name: projectId
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *              - in: path
 *                name: taskId
 *                description: The id of the task
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: Task deleted successful
 *              400:
 *                  description: Bad Request - Invalid input
 *
 */
router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid task id"),
  handleInputErrors,
  TaskController.deleteTask,
);

/**
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}/status:
 *      post:
 *          summary: Update the status of a task
 *          tags:
 *              - Tasks
 *          description: Update the status of a task based on its unique id
 *          parameters:
 *              - in: path
 *                name: projectId
 *                description: The id of the project
 *                required: true
 *                schema:
 *                    type: string
 *              - in: path
 *                name: taskId
 *                description: The id of the task
 *                required: true
 *                schema:
 *                    type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The status of the task
 *                                  example: completed
 *          responses:
 *              200:
 *                  description: Task status updated successful
 *              400:
 *                  description: Bad Request - Invalid input
 *
 */
router.post(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("Invalid project id"),
  param("taskId").isMongoId().withMessage("Invalid task id"),
  body("status").notEmpty().withMessage("Status is required"),
  handleInputErrors,
  TaskController.updateStatus,
);

/** Routes for teams members */
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("Invalid email"),
  handleInputErrors,
  TeamMemberController.findMembersByEmail,
);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("Id not valid"),
  handleInputErrors,
  TeamMemberController.addMemberById,
);

router.delete(
  "/:projectId/team",
  body("id").isMongoId().withMessage("Id not valid"),
  handleInputErrors,
  TeamMemberController.removeMemberById,
);

export default router;
