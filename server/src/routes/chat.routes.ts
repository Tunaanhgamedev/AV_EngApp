import { Router } from 'express';
import { sendMessage, getChatHistory, getAvailableSkills } from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/message', authenticate, sendMessage);
router.get('/history/:userId/:sessionId', authenticate, getChatHistory);
router.get('/skills', authenticate, getAvailableSkills);

export default router;
