import { User } from "../../entities/user";
import { IUserRepository } from "../../repositories/userRepositoryInterface";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
