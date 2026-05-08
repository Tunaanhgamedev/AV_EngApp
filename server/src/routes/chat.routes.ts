import { Router } from 'express';
import { sendMessage, getChatHistory } from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/message', authenticate, sendMessage);
router.get('/history/:userId/:sessionId', authenticate, getChatHistory);

export default router;
