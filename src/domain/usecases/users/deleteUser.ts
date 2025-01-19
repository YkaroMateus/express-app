import { IUserRepository } from "../../repositories/userRepositoryInterface";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) return false;

    await this.userRepository.delete(id);
    return true;
  }
}
