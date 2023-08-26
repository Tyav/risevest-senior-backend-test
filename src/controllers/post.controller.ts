import { NextFunction, Request, Response } from "express";
import { CreateUserType, UserDto } from "../interfaces/User";
import catchAsync from "../utils/errors/catch-async";
import userService from "../services/user-service";
import postService from "../services/post.service";

export const postController = {
  createPost: catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const post = await postService.createPost({...body, userId: req.user.id});
    return res.status(200).json(post);
  }),
  getUserPosts: catchAsync(async (req: Request, res: Response) => {
    const posts = await postService.getUserPosts(req.user.id);
    return res.status(200).json({posts});
  }),
};
