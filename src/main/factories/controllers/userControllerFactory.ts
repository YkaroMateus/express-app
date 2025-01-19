import { UserController } from "../../../infra/http/controllers/userController";
import { makeUserRepository } from "../repositories/userRepositoryFactory";

export const makeUserController = (): UserController => {
  const userRepository = makeUserRepository();
  return new UserController(userRepository);
};
