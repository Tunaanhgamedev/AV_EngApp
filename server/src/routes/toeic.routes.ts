import { Router } from 'express';
import { generatePractice, submitPractice, getHistory } from '../controllers/toeic.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/practice/:part', authenticate, generatePractice);
router.post('/submit', authenticate, submitPractice);
router.get('/history/:userId', authenticate, getHistory);

export default router;
