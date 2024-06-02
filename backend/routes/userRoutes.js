import express from 'express';
import { register, login, logout, bookmarks, getMyProfile, getOtherUsers, follow, unFollow } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

// API Routes

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.put('/bookmark/:id', isAuthenticated, bookmarks);
router.get('/profile/:id', isAuthenticated, getMyProfile);
router.get('/other-users/:id', isAuthenticated, getOtherUsers);
router.post('/follow/:id', isAuthenticated, follow);
router.post('/unfollow/:id', isAuthenticated, unFollow);



export default router;