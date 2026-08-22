import express from 'express';
import { getTravelSuggestions } from '../controllers/aiController.js';

const router = express.Router();

router.post('/suggest', getTravelSuggestions);

export default router;
