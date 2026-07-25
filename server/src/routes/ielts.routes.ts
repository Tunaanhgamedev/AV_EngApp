import { Router } from 'express';
import { generatePractice, generateFullTest, submitPractice, getHistory, generateStudyPlan } from '../controllers/ielts.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/full-test', authenticate, generateFullTest);
router.get('/practice/:skill', authenticate, generatePractice);
router.post('/submit', authenticate, submitPractice);
router.get('/history/:userId', authenticate, getHistory);
router.get('/study-plan/:userId', authenticate, generateStudyPlan);

export default router;
