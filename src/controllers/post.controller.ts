import { Request, Response } from "express";
import catchAsync from "../utils/errors/catch-async";
import postService from "../services/post.service";
import userService from "../services/user-service";

export const postController = {
  createPost: catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const userId = req.params['userId'];
    const user = await userService.getUserByIdOrError(userId);
    const post = await postService.createPost({...body, user: user});
    return res.status(200).json(post);
  }),
  getUserPosts: catchAsync(async (req: Request, res: Response) => {
    const userId = req.params['userId'];
    const user = await userService.getUserByIdOrError(userId);
    const posts = await postService.getUserPosts(user.id);
    return res.status(200).json({posts});
  }),
};
