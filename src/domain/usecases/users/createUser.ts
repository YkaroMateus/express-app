import { CreateUserDTO, User } from "../../entities/user";
import { IUserRepository } from "../../repositories/userRepositoryInterface";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    // Aqui poderia ter validações adicionais
    return this.userRepository.create(data);
  }
}
