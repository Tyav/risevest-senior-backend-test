import express from 'express';
import { userController } from '../controllers/user.controller';
import { Validator } from '../middlewares/Validator';
import { createUserValidator } from '../validation/user-validation';
import { authController } from '../controllers/auth.controller';
import { userMiddlewares } from '../middlewares/user.middleware';

const router: express.Router = express.Router();

router.param('userId', userMiddlewares.getUserByParamUserId);

router.route('/')
  .post(Validator.validate(createUserValidator),userController.createUser)
  .get(userController.getUsers);

router.get('/:userId/auth-token', authController.getUserAuthToken);

export default router;
