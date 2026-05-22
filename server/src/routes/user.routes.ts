import { Router } from 'express';
import { 
  getUsers, 
  createUser, 
  syncUser, 
  getLeaderboard, 
  addXP, 
  dailyCheckin, 
  getCheckinStatus,
  getCheckinHistory,
  updateProfile
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Sync user after login
router.post('/sync', authenticate, syncUser);

// Profile management
router.put('/profile', authenticate, updateProfile);

// Leaderboard & Gamification routes
router.get('/leaderboard', authenticate, getLeaderboard);
router.post('/add-xp', authenticate, addXP);
router.post('/checkin', authenticate, dailyCheckin);
router.get('/checkin-status', authenticate, getCheckinStatus);
router.get('/checkin-history', authenticate, getCheckinHistory);

// Manage users
router.get('/', authenticate, getUsers);
router.post('/', authenticate, createUser);

export default router;
