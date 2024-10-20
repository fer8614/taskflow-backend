import request from "supertest";
import server from "../../server";
import { expect } from "@jest/globals";
import { createDiffieHellmanGroup } from "crypto";

describe("POST /api/projects/:projectId/tasks", () => {
  it("Should display validation errors by invalid projectId", async () => {
    const projectId = 1231231;
    const response = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({});
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.request.toJSON().data).toEqual({});

    expect(response.status).not.toBe(201);
  });

  it("should create a new task in a project", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;
    const response = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        name: "Test Task",
        description: "Test Description",
      });
    expect(response.request.toJSON()).toHaveProperty("data");
    expect(response.status).toBe(201);
    expect(response.request.url).toEqual(
      expect.stringContaining("/api/projects"),
    );

    expect(response.request.toJSON().data).toEqual({
      name: "Test Task",
      description: "Test Description",
    });

    expect(response.request.toJSON()).not.toHaveProperty("errors");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.headers["content-type"]).not.toMatch(/html/);
  });
});

describe("GET /api/projects/:projectId/tasks", () => {
  it("Should check if api/projects url exist", async () => {
    const response = await request(server).get(
      "/api/projects/url-not-exist/tasks",
    );
    expect(response.status).toBe(500);
  });
  it("Get a JSON response with tasks by project", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;

    const response = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        name: "Test Task",
        description: "Test Description",
      });
    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.request.toJSON()).toHaveProperty("data");

    expect(response.request.toJSON()).not.toHaveProperty("errors");
    expect(response.headers["content-type"]).not.toMatch(/html/);
    expect(response.status).not.toBe(500);
  });
});

describe("GET /api/projects/:projectId/tasks/:taskId", () => {
  it("Should check a inavalid ID in the URL", async () => {
    const productId = 999999;
    const taskId = 8888888;
    const response = await request(server).get(
      `/api/projects/${productId}/tasks/${taskId}`,
    );
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("There was an error");

    expect(response.status).not.toBe(201);
  });

  it("Get a JSON response for a single task by project", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;

    const newTask = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        name: "Test Task",
        description: "Test Description",
      });
    const taskId = newTask.body._id;
    const response = await request(server).get(
      `/api/projects/${projectId}/tasks/${taskId}`,
    );
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.request.toJSON()).toHaveProperty("data");

    expect(response.request.toJSON()).not.toHaveProperty("errors");
    expect(response.headers["content-type"]).not.toMatch(/html/);
    expect(response.status).not.toBe(500);
  });
});

describe("PUT /api/projects/;id", () => {
  it("Should check a inavalid ID in the URL", async () => {
    const projectId = 999999;
    const taskId = 8888888;
    const response = await request(server).put(
      `/api/projects/${projectId}/tasks/${taskId}.send({
      name: "Test Task",
      description: "Test Description",
      })`,
    );
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("There was an error");
  });

  it("Should display validation error message when updated a project", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;
    const taskId = 8888888;
    const response = await request(server)
      .put(`/api/projects/${projectId}/tasks/${taskId}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeTruthy();

    expect(response.status).not.toBe(200);
  });

  it("Validate that the projectName box is empty", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;
    const newTask = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        name: "Task name project",
        description: "Task Description",
      });
    const taskId = newTask.body._id;
    const response = await request(server)
      .put(`/api/projects/${projectId}/tasks/${taskId}`)
      .send({
        name: "Task name project v1",
        description: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toContain(
      "Description of task is required",
    );

    expect(response.status).not.toBe(200);
  });

  it("Validate that the put is sucefully", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;
    const newTask = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        name: "Task name project",
        description: "Task Description",
      });
    const taskId = newTask.body._id;
    const response = await request(server)
      .put(`/api/projects/${projectId}/tasks/${taskId}`)
      .send({
        name: "Task name project v2",
        description: "Task Description v2",
      });
    expect(response.status).toBe(200);
    expect(response.request.toJSON()).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("DELETE /api/projects/:id", () => {
  it("Should check a inavalid ID in the URL", async () => {
    const projectId = 999999;
    const taskId = 8888888;
    const response = await request(server).delete(
      `/api/projects/${projectId}/tasks/${taskId}`,
    );
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("There was an error");

    expect(response.status).not.toBe(201);
  });

  it("Validate that the projectName box is empty", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;
    const newTask = await request(server)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        name: "Task name project v3",
        description: "Task Description v3",
      });
    const taskId = newTask.body._id;
    const response = await request(server).delete(
      `/api/projects/${projectId}/tasks/${taskId}`,
    );
    expect(response.status).toBe(200);
    expect(response.request.toJSON()).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});
