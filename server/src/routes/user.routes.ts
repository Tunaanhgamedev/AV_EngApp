import { Router } from 'express';
import { getUsers, createUser, syncUser } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Sync user after login
router.post('/sync', authenticate, syncUser);

// Manage users
router.get('/', authenticate, getUsers);
router.post('/', authenticate, createUser);

export default router;
