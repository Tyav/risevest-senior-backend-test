import { Repository } from "typeorm";
import { User } from "../entities/User";
import { CreateUserType, UserDto } from "../interfaces/User";
import dataSource from "../typeorm-config";
import { ConflictError } from "../utils/errors/error-handlers";
import handleGetRepository from "../utils/connection";

export class UserService {
  constructor(private userRepository: Repository<User>) {}
  /**
   * Creates a user
   * @param {CreateUserType} data 
   * @returns {Promise<User>}
   */
  async createUser(data: CreateUserType): Promise<User> {
    if (await this.doesUserExistByEmail(data.email)) {
      throw new ConflictError({ message: "User already exist." });
    }
    const user = await this.userRepository
      .create({ email: data.email, name: data.name })
      .save();

    return user;
  }
  /**
   * Checks if a user's record exist in DB and returns true
   */
  async doesUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return !!user;
  }
  /**
   * Retrieves all users in database
   */
  async getAllUsers(): Promise<User[]> {
    // TODO: consider pagination
    const users = await this.userRepository.find();
    return users
  }
}

export default new UserService(handleGetRepository(User));
