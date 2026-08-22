import express from 'express';
import { register, login, demoLogin, getMe, toggleBookmark } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/demo', demoLogin);
router.get('/me', getMe);
router.post('/bookmark', toggleBookmark);

export default router;
