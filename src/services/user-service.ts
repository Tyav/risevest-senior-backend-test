import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserType } from "../interfaces/User";
import {
  ConflictError,
  ResourceNotFoundError,
} from "../utils/errors/error-handlers";
import handleGetRepository from "../utils/connection";

export class UserService {
  constructor(private userRepository: Repository<User>) {}
  /**
   * Creates a user
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
    return users;
  }

  /**
   * Retrieves user of an id.
   * @param userId
   * @returns
   */
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: Number(userId),
      },
    });
    return user;
  }
  /**
   * Retrieves user of an id. errors if user is not found
   * @param userId
   * @returns
   */
  async getUserByIdOrError(userId: string): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ResourceNotFoundError({
        message: `User with id: ${userId} does not exist`,
      });
    }
    return user;
  }
}

export default new UserService(handleGetRepository(User));
