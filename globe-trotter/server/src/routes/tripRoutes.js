import express from 'express';
import {
  getMyTrips,
  getTripById,
  getSharedTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  addStopToTrip
} from '../controllers/tripController.js';

const router = express.Router();

router.get('/', getMyTrips);
router.post('/', createTrip);
router.get('/share/:shareSlug', getSharedTrip);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.post('/:id/stops', addStopToTrip);

export default router;
