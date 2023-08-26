import { CreateUserType, UserDto } from "../interfaces/User";
import dataSource from "../typeorm-config";
import { ConflictError } from "../utils/errors/error-handlers";

export const userService = {
  create: async (data: CreateUserType): Promise<UserDto> => {
    // check if user exist
    const userExist = (await dataSource.query('SELECT EXISTS ( SELECT 1 from Users WHERE email = $1 )', [data.email]))[0];
    if (userExist?.exists) {
      throw new ConflictError({ message: 'User already exist.'})
    }
    // create user
    await dataSource.query('INSERT INTO users (name, email) VALUES ($1, $2)', [ data.name, data.email ]);

    const user = await <Promise<UserDto[]>>dataSource.query('SELECT id, name, email FROM Users WHERE email = $1', [ data.email]);

    return user[0];
  }
}