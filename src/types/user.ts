import { User as PrismaUser } from "@prisma/client";

export type User = PrismaUser;
export type CreateUserDTO = Omit<User, "id" | "createdAt">;
export type UpdateUserDTO = Partial<CreateUserDTO>;
