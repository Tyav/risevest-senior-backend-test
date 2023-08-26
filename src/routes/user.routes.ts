import express from 'express';
import { userController } from '../controllers/user.controllers';
import { Validator } from '../middlewares/Validator';
import { createUserValidator } from '../validation/user-validation';

const router: express.Router = express.Router();

router.route('/').post(Validator.validate(createUserValidator),userController.create);

export default router;
