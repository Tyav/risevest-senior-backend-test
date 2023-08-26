import { Repository } from "typeorm";
import { User } from "../entities/User";
import { CreateUserType, UserDto } from "../interfaces/User";
import dataSource from "../typeorm-config";
import { ConflictError } from "../utils/errors/error-handlers";
import handleGetRepository from "../utils/connection";

export class UserService {
  constructor(private userRepository: Repository<User>) {}
  async create(data: CreateUserType): Promise<User> {
    if (await this.doesUserExistByEmail(data.email)) {
      throw new ConflictError({ message: "User already exist." });
    }
    const user = await this.userRepository
      .create({ email: data.email, name: data.name })
      .save();

    return user;
  }
  async doesUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return !!user;
  }
}

export default new UserService(handleGetRepository(User));
