import express from 'express';
import { getCities, getCityById, getFeaturedCities, seedCities } from '../controllers/cityController.js';

const router = express.Router();

router.get('/', getCities);
router.get('/featured', getFeaturedCities);
router.post('/seed', seedCities);
router.get('/:id', getCityById);

export default router;
