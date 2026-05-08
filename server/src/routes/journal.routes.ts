import { Router } from 'express';
import { createJournalEntry, getJournalHistory } from '../controllers/journal.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/analyze', authenticate, createJournalEntry);
router.get('/history/:userId', authenticate, getJournalHistory);

export default router;
