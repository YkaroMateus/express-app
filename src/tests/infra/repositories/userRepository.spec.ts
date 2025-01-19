import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../../infra/database/repositories/userRepository";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

describe("UserRepository", () => {
  let prisma: DeepMockProxy<PrismaClient>;
  let userRepository: UserRepository;

  beforeEach(() => {
    prisma = mockDeep<PrismaClient>();
    userRepository = new UserRepository(prisma);
  });

  describe("create", () => {
    it("should create a user", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
      };

      const expectedUser = {
        id: "1",
        ...userData,
        createdAt: new Date(),
      };

      prisma.user.create.mockResolvedValue(expectedUser);

      const result = await userRepository.create(userData);
      expect(result).toEqual(expectedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });

  describe("findAll", () => {
    it("should return all users", async () => {
      const expectedUsers = [
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

      prisma.user.findMany.mockResolvedValue(expectedUsers);

      const result = await userRepository.findAll();
      expect(result).toEqual(expectedUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe("findById", () => {
    it("should return user by id", async () => {
      const expectedUser = {
        id: "1",
        name: "John",
        email: "john@example.com",
        createdAt: new Date(),
      };

      prisma.user.findUnique.mockResolvedValue(expectedUser);

      const result = await userRepository.findById("1");
      expect(result).toEqual(expectedUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });
  });
});
