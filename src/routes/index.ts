import express from 'express';
import { unknownRouteError } from '../utils/errors/error-handlers';
import userRoutes from './user.routes';

const router: express.Router = express.Router();

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use('/users', userRoutes)

//Handle 404 unknown route
router.use(unknownRouteError);

export default router;
