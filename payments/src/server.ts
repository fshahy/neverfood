import 'reflect-metadata';
import { logger } from './logger';
import { createConnection } from 'typeorm';
import express from 'express';
import { errorHandler } from './middleware/error-handler';

const app = express();

createConnection().then(async (connection) => {
  logger.info('Successfully Connected to PostgreSQL database: neverfood_restaurantsdb');

  // middleware
  app.use(express.json());

  // routes

  // global error handler
  app.use(errorHandler);

  // all other paths and methods are ignored
  app.all("/*", (req, res) => {
    res.status(405).send({
      errors: [{
        message: "method is not allowded"
      }]
    });
  });


  app.listen(3003, () => {
    logger.info('Server started listening on port 3003...');
  });

}).catch(err => {
  logger.error(err);
});