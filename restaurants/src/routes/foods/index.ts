import express from 'express'
import { getRepository } from 'typeorm';
import { Messages } from '../../common/messages';
import { Food } from '../../entity/food.entity';

export const foods = express.Router();

foods.get('/', async (req, res) => {
    const foodRepository = getRepository(Food);

    try {
        const all = await foodRepository.find();
        res.send(all);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});

foods.post('/', async (req, res) => {
    const foodRepository = getRepository(Food);
    const { name } = req.body;

    const food = new Food();
    food.name = name;

    try {
        await foodRepository.save(food);
        res.status(201).send(food);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});

foods.get('/:id', async (req, res) => {
    const foodRepository = getRepository(Food);
    const { id } = req.params;

    try {
        const food = await foodRepository.findOne(id);

        if (food) {
            res.send(food);
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

foods.delete('/:id', async (req, res) => {
    const foodRepository = getRepository(Food);
    const { id } = req.params;

    try {
        const food = await foodRepository.findOne(id);

        if (food) {
            await foodRepository.remove(food);
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