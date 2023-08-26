import { Request, Response } from "express";
import { CreateUserType, UserDto } from "../interfaces/User";
import catchAsync from "../utils/errors/catch-async";
import userService from "../services/user-service";

export const userController = {
  createUser: catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const user = await userService.createUser(body);
    return res.status(201).json(user);
  }),
  getUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      users
    })
  })
}
