import 'reflect-metadata';
import { logger } from './logger';
import { createConnection } from 'typeorm';
import express, { json } from 'express';
import { cities } from './routes/cities';
import { foods } from './routes/foods';
import { restaurants } from './routes/restaurants'

createConnection().then(async (connection) => {
    logger.info('Successfully Connected to PostgreSQL database: neverfood_restaurantsdb');

    const app = express();
    app.use(json());

    app.use('/cities', cities);
    app.use('/foods', foods);
    app.use('/restaurants', restaurants);



    app.listen(3004, () => {
        logger.info('Server started listening on port 3004...');
    });

}).catch(err => {
    logger.error(err);
});