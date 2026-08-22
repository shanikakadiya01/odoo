import express from 'express';
import { getPlatformStats } from '../controllers/adminController.js';
import { authMiddleware } from './authRoutes.js';

const router = express.Router();

// Ideally, an isAdmin check middleware would go here
router.get('/stats', authMiddleware, getPlatformStats);

export default router;
