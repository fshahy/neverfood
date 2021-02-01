import 'reflect-metadata';
import { logger } from './logger';
import { createConnection } from 'typeorm';
import { validate } from 'class-validator';
import express from 'express';
import { User } from './entity/User';

createConnection()
    .then(async (connection) => {
        logger.info('Successfully Connected to PostgreSQL database.');

        const user = new User();
        user.name = 'Farid Shahy';
        user.username = '';
        user.password = '';

        const errors = await validate(user);
        if (errors.length > 0) {
            errors.forEach(err => {

                logger.error(err);

            })
        } else {
            await connection.manager.save(user);
        }
    })
    .catch(err => {
        logger.error(err);
    });