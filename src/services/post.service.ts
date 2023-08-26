import { Repository } from "typeorm";
import handleGetRepository from "../utils/connection";
import { Post } from "../entities/post.entity";
import { CreatePostType } from "../interfaces/IPost";

export class PostService {
  constructor(private postRepository: Repository<Post>) {}
  /**
   * Creates a user
   */
  async createPost(data: CreatePostType): Promise<Post> {
    const post = await this.postRepository.create({ user: { id: data.userId }, title: data.title, content: data.content }).save();
    return post;
  }
  
}

export default new PostService(handleGetRepository(Post));
