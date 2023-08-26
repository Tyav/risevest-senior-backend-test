import express from 'express';
import { userController } from '../controllers/user.controller';
import { Validator } from '../middlewares/Validator';
import { authController } from '../controllers/auth.controller';
import { createPostValidator } from '../validation/post-validation';
import { postController } from '../controllers/post.controller';
import { authenticator } from '../middlewares/authenticator';

const router: express.Router = express.Router();

router.route('/')
  .post([Validator.validate(createPostValidator), authenticator], postController.createPost)
  .get(userController.getUsers);

router.get('/:userId/auth-token', authController.getUserAuthToken);

export default router;
