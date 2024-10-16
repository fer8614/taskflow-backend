import request from "supertest";
import server from "../server";

describe("GET /api", () => {
  it("Should send back a json response", async () => {
    const res = await request(server).get("/api/projects");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(404);
    expect(res.headers["content-type"]).not.toMatch(/html/);
  });
});
