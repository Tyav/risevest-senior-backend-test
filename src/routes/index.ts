import express from 'express';
import { unknownRouteError } from '../utils/errors/error-handlers';

const router: express.Router = express.Router();

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

//Handle 404 unknown route
router.use(unknownRouteError);

export default router;
