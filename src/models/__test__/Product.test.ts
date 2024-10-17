import request from "supertest";
import server from "../../server";
import { expect, jest, test } from "@jest/globals";

describe("POST /api/projects", () => {
  it("should crate a new product", async () => {
    const response = await request(server).post("/api/projects").send({
      clientName: "Test Client",
      projectName: "Test Project",
      description: "Test Description",
    });
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

    expect(response.request.toJSON()).not.toHaveProperty("error");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.headers["content-type"]).not.toMatch(/json/);
  });
});
