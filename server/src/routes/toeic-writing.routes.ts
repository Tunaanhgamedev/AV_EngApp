import { Router } from 'express';
import { getChallenge, evaluateChallenge } from '../controllers/toeic-writing.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/challenge', authenticate, getChallenge);
router.post('/evaluate', authenticate, evaluateChallenge);

export default router;
