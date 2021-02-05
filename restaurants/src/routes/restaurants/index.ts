import express from 'express'
import { getRepository } from 'typeorm';
import { Messages } from '../../common/messages';
import { Restaurant } from '../../entity/restaurant.entity';

export const restaurants = express.Router();

restaurants.get('/', async (req, res) => {
    const restaurantRepository = getRepository(Restaurant);

    try {
        const all = await restaurantRepository.find();
        res.send(all);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});

restaurants.post('/', async (req, res) => {
    const restaurantRepository = getRepository(Restaurant);

    try {
        const { name } = req.body;
        const restaurant = new Restaurant();

        restaurant.name = name;

        await restaurantRepository.save(restaurant);

        res.status(201).send(restaurant);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});

restaurants.get('/:id', async (req, res) => {
    const restaurantRepository = getRepository(Restaurant);
    const { id } = req.params;

    try {
        const restaurant = await restaurantRepository.findOne(id);

        if (restaurant) {
            res.send(restaurant);
        } else {
            res.status(404).send({
                message: Messages.ResourceNotFound
            });
        }
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});

restaurants.delete('/:id', async (req, res) => {
    const restaurantRepository = getRepository(Restaurant);
    const { id } = req.params;

    try {
        const restaurant = await restaurantRepository.findOne(id);

        if (restaurant) {
            await restaurantRepository.remove(restaurant);
            res.status(204).send();
        } else {
            res.status(404).send({
                message: Messages.ResourceNotFound
            });
        }
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});