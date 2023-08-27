import { Request, Response } from "express";
import { CreateUserType } from "../interfaces/User";
import catchAsync from "../utils/errors/catch-async";
import userService from "../services/user-service";

export const userController = {
  createUser: catchAsync(async (req: Request, res: Response) => {
    const body = <CreateUserType>req.body;
    const user = await userService.createUser(body);
    console.log("No error")
    return res.status(201).json(user);
  }),
  getUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      users
    })
  }),
  getUserById: catchAsync(async(req:Request, res: Response) => {
    const userId = <string>req.params.userId
    const user = await userService.getUserByIdOrError(userId)
    return res.status(200).json(user);
  }),
  getTopUsersWithLatestComment: catchAsync(async(req:Request, res: Response) => {
    const limit = <string>req.query['limit'] || '3'
    const topUsersWithLatestComment = await userService.getTopUsersWithLatestComment(limit)
    return res.status(200).json({ users: topUsersWithLatestComment });
  })
}
