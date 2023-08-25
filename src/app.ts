import express from 'express';
import * as bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.set('port', process.env.PORT);

app.set('env', process.env.NODE_ENV);

app.use(methodOverride());

const router = express.Router();

router.use(routes);

export default app;
