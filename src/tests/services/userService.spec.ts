import UserService from "../../services/userService";
import prisma from "../../lib/prisma";

// Mock do Prisma
jest.mock("../../lib/prisma", () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all users", async () => {
      const mockUsers = [
        { id: "1", name: "John", email: "john@example.com" },
        { id: "2", name: "Jane", email: "jane@example.com" },
      ];

      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await UserService.findAll();

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findById", () => {
    it("should return user when found", async () => {
      const mockUser = { id: "1", name: "John", email: "john@example.com" };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserService.findById("1");

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should return null when user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await UserService.findById("999");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create and return a new user", async () => {
      const userData = {
        name: "New User",
        email: "new@example.com",
      };

      const mockCreatedUser = { id: "1", ...userData };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await UserService.create(userData);

      expect(result).toEqual(mockCreatedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });
});
