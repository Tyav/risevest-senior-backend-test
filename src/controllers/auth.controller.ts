import { Request, Response } from "express";
import catchAsync from "../utils/errors/catch-async";
import authService from "../services/auth-service";
import userService from "../services/user-service";

export const authController = {
  getUserAuthToken: catchAsync(async (req: Request, res: Response) => {
    const userId = req.params['userId']
    const user = await userService.getUserByIdOrError(userId)
    const token = await authService.getAuthToken(user.id);
    return res.status(201).json({ token });
  })
}
