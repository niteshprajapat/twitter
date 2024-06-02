import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislikeTweet } from '../controllers/tweetController.js';

const router = express.Router();

// API Routes
router.post('/create', isAuthenticated, createTweet);
router.delete('/delete/:id', isAuthenticated, deleteTweet);
router.put('/like/:id', isAuthenticated, likeOrDislikeTweet);
router.get('/all-tweets/:id', isAuthenticated, getAllTweets);
router.get('/following-tweets/:id', isAuthenticated, getFollowingTweets);





export default router;