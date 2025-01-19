import { UpdateUserDTO, User } from "../../entities/user";
import { IUserRepository } from "../../repositories/userRepositoryInterface";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<User | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) return null;

    return this.userRepository.update(id, data);
  }
}
