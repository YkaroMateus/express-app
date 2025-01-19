import { UserRepository } from "../../../infra/database/repositories/userRepository";
import prisma from "../../../infra/database/prisma";

export const makeUserRepository = (): UserRepository => {
  return new UserRepository(prisma);
};
