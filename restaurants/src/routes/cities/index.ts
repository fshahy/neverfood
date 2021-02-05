import express from 'express';
import { getRepository } from 'typeorm';
import { City } from '../../entity/city.entity';
import { Messages } from '../../common/messages';

export const cities = express.Router();

cities.get('/', async (req, res) => {
    const cityRepository = getRepository(City);

    try {
        const all = await cityRepository.find();
        res.send(all);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
});

cities.post('/', async (req, res) => {
    const { name } = req.body;

    const cityRepository = getRepository(City);

    const city: City = new City();
    city.name = name;

    try {
        await cityRepository.save(city);
        res.status(201).send(city);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }

});

cities.get('/:id', async (req, res) => {
    const cityRepository = getRepository(City);
    const { id } = req.params;

    try {
        const city = await cityRepository.findOne(id);

        if (city) {
            res.send(city)
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

cities.delete('/:id', async (req, res) => {
    const cityRepository = getRepository(City);
    const { id } = req.params;

    try {
        const city = await cityRepository.findOne(id);

        if (city) {
            await cityRepository.remove(city);
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