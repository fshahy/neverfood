import express from 'express';
import 'express-async-errors';
import { getRepository } from 'typeorm';
import { City } from '../entity/city.entity';
import { NotFoundError } from '../exceptions/not-found-error';

const router = express.Router();

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  const cityRepository = getRepository(City);
  const { id } = req.params;
  const city = await cityRepository.findOne(id);

  if (city) {
    res.send(city)
  } else {
    throw new NotFoundError(`city #${id} not found`);
  }
});

router.delete('/:id', async (req, res) => {
  const cityRepository = getRepository(City);
  const { id } = req.params;
  const city = await cityRepository.findOne(id);

  if (city) {
    await cityRepository.remove(city);
    res.status(204).send();
  } else {
    throw new NotFoundError(`city #${id} not found`)
  }
});

export { router as citiesRouter };