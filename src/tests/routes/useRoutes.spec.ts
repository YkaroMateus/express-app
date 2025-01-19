import request from "supertest";
import app from "../../app";
import prisma from "../../lib/prisma";

describe("User Routes (E2E)", () => {
  beforeAll(async () => {
    // Setup - ex: migrations, seeds
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("User CRUD Operations", () => {
    it("should perform full CRUD cycle", async () => {
      // CREATE
      const createResponse = await request(app).post("/api/users").send({
        name: "Test User",
        email: "test@example.com",
      });
      expect(createResponse.status).toBe(201);
      const userId = createResponse.body.id;

      // READ
      const getResponse = await request(app).get(`/api/users/${userId}`);
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.name).toBe("Test User");

      // UPDATE
      const updateResponse = await request(app)
        .put(`/api/users/${userId}`)
        .send({
          name: "Updated User",
        });
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.name).toBe("Updated User");

      // DELETE
      const deleteResponse = await request(app).delete(`/api/users/${userId}`);
      expect(deleteResponse.status).toBe(204);

      // Verify deletion
      const verifyResponse = await request(app).get(`/api/users/${userId}`);
      expect(verifyResponse.status).toBe(404);
    });
  });
});
