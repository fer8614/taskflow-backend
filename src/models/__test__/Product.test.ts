import request from "supertest";
import server from "../../server";
import { expect, jest, test } from "@jest/globals";

describe("POST /api/projects", () => {
  it("Should display validation errors", async () => {
    const response = await request(server).post("/api/projects").send({});
    expect(response.status).toBe(400);
    expect(response.request.toJSON().data).toEqual({});
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(3);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(4);

    expect(response.request.toJSON().data).not.toEqual({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
  });

  it("should create a new project", async () => {
    const response = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });

    expect(response.request.toJSON()).toHaveProperty("data");

    expect(response.status).toBe(201);
    expect(response).toHaveProperty("req");
    expect(response.request.url).toEqual(
      expect.stringContaining("/api/projects"),
    );
    expect(response.request.toJSON()).toEqual(
      expect.objectContaining({
        data: {
          clientName: "Test Client",
          description: "Test Description",
          projectName: "Test Project",
        },
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        url: expect.stringContaining("/api/projects"),
      }),
    );
    expect(response.request.toJSON().data).toEqual({
      clientName: "Test Client",
      description: "Test Description",
      projectName: "Test Project",
    });
    expect(response.body).toHaveProperty("projectName");

    expect(response.body.projectName).toContain("Test Project");

    expect(response.request.toJSON()).not.toHaveProperty("errors");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.headers["content-type"]).not.toMatch(/html/);
  });
});

describe("GET /api/projects/", () => {
  it("Should check if api/projects url exist", async () => {
    const response = await request(server).get("/api/projects");
    expect(response.status).not.toBe(404);
  });

  it("Get a JSON response with projects", async () => {
    const response = await request(server).get("/api/projects");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.request.toJSON()).toHaveProperty("data");
    expect(response.body).toEqual(expect.arrayContaining([]));

    expect(response.request.toJSON()).not.toHaveProperty("errors");
  });
});

describe("GET /api/projects/:id", () => {
  it("Should check a inavalid ID in the URL", async () => {
    const productId = 999999;
    const response = await request(server).get(`/api/projects/${productId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toContain("Invalid project id");
  });

  it("Get a JSON response for a single project", async () => {
    const newProject = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
    const projectId = newProject.body._id;
    const response = await request(server).get(`/api/projects/${projectId}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});
