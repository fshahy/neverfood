import express from 'express'
import { getRepository } from 'typeorm';
import { Food } from '../entity/food.entity';
import { NotFoundError } from '../exceptions/not-found-error';

const router = express.Router();

router.get('/', async (req, res) => {
  const foodRepository = getRepository(Food);

  const all = await foodRepository.find();
  res.send(all);
});

router.post('/', async (req, res) => {
  const foodRepository = getRepository(Food);
  const { name } = req.body;

  const food = new Food();
  food.name = name;

  await foodRepository.save(food);
  res.status(201).send(food);
});

router.get('/:id', async (req, res) => {
  const foodRepository = getRepository(Food);
  const { id } = req.params;

  const food = await foodRepository.findOne(id);

  if (food) {
    res.send(food);
  } else {
    throw new NotFoundError(`food #${id} not found`);
  }

});

router.delete('/:id', async (req, res) => {
  const foodRepository = getRepository(Food);
  const { id } = req.params;

  const food = await foodRepository.findOne(id);

  if (food) {
    await foodRepository.remove(food);
    res.status(204).send();
  } else {
    throw new NotFoundError(`food #${id} not found`)
  }
});

export { router as foodsRouter };