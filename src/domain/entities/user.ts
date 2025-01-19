import { User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {}
export interface CreateUserDTO extends Omit<User, "id" | "createdAt"> {}
export interface UpdateUserDTO extends Partial<CreateUserDTO> {}
