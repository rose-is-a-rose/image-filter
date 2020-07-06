import express from 'express';
import bodyParser from 'body-parser';
import { deleteTempLocalFiles } from './util/util';
import { IndexRouter } from './routes/router';

(async () => {
  deleteTempLocalFiles();

  // Init the Express application
  const app = express();

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  app.use('/', IndexRouter);

  // Set the network port
  const port = process.env.PORT || 8082;

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();