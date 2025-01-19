import { User } from "../../entities/user";
import { IUserRepository } from "../../repositories/userRepositoryInterface";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
