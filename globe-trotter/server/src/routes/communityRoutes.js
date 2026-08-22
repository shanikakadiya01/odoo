import express from 'express';
import { getPosts, createPost, upvotePost, addComment } from '../controllers/communityController.js';
import { authMiddleware, optionalAuth } from './authRoutes.js';

const router = express.Router();

router.get('/', optionalAuth, getPosts);
router.post('/', authMiddleware, createPost);
router.put('/:id/upvote', optionalAuth, upvotePost);
router.post('/:id/comment', authMiddleware, addComment);

export default router;
