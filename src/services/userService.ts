import { User, CreateUserDTO, UpdateUserDTO } from "../types/user";
import prisma from "../lib/prisma";

class UserService {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(userData: CreateUserDTO): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async update(id: string, userData: UpdateUserDTO): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}

export default new UserService();
