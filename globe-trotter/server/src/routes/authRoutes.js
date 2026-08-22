import express from 'express';
import { register, login, demoLogin, getMe, toggleBookmark } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/demo', demoLogin);
router.get('/me', getMe);
router.post('/bookmark', toggleBookmark);

// Mock middlewares to prevent crashes
export const authMiddleware = (req, res, next) => {
  // Pass through for now, as auth is mocked in many places
  req.user = { name: 'Alex Explorer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' };
  next();
};

export const optionalAuth = (req, res, next) => {
  req.user = { name: 'Alex Explorer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' };
  next();
};

export default router;
