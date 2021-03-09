import express from 'express'
import { getRepository } from 'typeorm';
import { Restaurant } from '../entity/restaurant.entity';
import { NotFoundError } from '../exceptions/not-found-error';

const router = express.Router();

router.get('/', async (req, res) => {
  const restaurantRepository = getRepository(Restaurant);

  const all = await restaurantRepository.find();
  res.send(all);
});

router.post('/', async (req, res) => {
  const restaurantRepository = getRepository(Restaurant);

  const { name } = req.body;
  const restaurant = new Restaurant();

  restaurant.name = name;

  await restaurantRepository.save(restaurant);

  res.status(201).send(restaurant);

});

router.get('/:id', async (req, res) => {
  const restaurantRepository = getRepository(Restaurant);
  const { id } = req.params;

  const restaurant = await restaurantRepository.findOne(id);

  if (restaurant) {
    res.send(restaurant);
  } else {
    throw new NotFoundError(`restaurant #${id} not found`);
  }
});

router.delete('/:id', async (req, res) => {
  const restaurantRepository = getRepository(Restaurant);
  const { id } = req.params;

  const restaurant = await restaurantRepository.findOne(id);

  if (restaurant) {
    await restaurantRepository.remove(restaurant);
    res.status(204).send();
  } else {
    throw new NotFoundError(`restaurant #${id} not found`);
  }
});

export { router as restaurantsRouter };