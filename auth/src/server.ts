import 'reflect-metadata';
import { logger } from './logger';
import { createConnection } from 'typeorm';
import { validate } from 'class-validator';
import express from 'express';
import { User } from './entity/user';
import { errorHandler } from './middleware/error-handler';

const app = express();

createConnection()
  .then(async (connection) => {
    logger.info('Successfully Connected to PostgreSQL database: neverfood_usersdb');

    // middleware
    app.use(express.json());

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

    app.listen(3001, () => {
      logger.info('Server started listening on port 3001...');
    });

    // const user = new User();
    // user.name = 'Farid Shahy';
    // user.username = '';
    // user.password = '';

    // const errors = await validate(user);
    // if (errors.length > 0) {
    //     errors.forEach(err => {

    //         logger.error(err);

    //     })
    // } else {
    //     await connection.manager.save(user);
    // }
  })
  .catch(err => {
    logger.error(err);
  });