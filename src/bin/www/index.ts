import dotenv from "dotenv";
dotenv.config();
import app from "../../app";
import dataSource from '../../typeorm-config';

(async () => {
  dataSource
    .initialize()
    .then(() => {
      // Start express server
      console.log('Connected to DB successfully.')
      app.listen(process.env.PORT || 3000, () => {
        const port = app.get('port');

        console.log(`Service Started at http://localhost:${port}`);
        console.log('Press CTRL+C to stop\n');
      });

    }).catch(error => console.error('DB connection failed : ' + error));
})();
