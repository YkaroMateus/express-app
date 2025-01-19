import request from "supertest";
import app from "../../app";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const mockUsers = [
        {
          id: "1",
          name: "John",
          email: "john@example.com",
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Jane",
          email: "jane@example.com",
          createdAt: new Date(),
        },
      ];

      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("email");
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
      };

      const mockCreatedUser = {
        id: "1",
        ...userData,
        createdAt: new Date(),
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject(userData);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });

    it("should return 400 for invalid data", async () => {
      const invalidData = {
        email: "test@example.com",
        // name está faltando
      };

      const response = await request(app)
        .post("/api/users")
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Name is required");
    });

    it("should return 400 for invalid email", async () => {
      const invalidData = {
        name: "Test User",
        email: "invalid-email",
      };

      const response = await request(app)
        .post("/api/users")
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid email format");
    });
  });
});
