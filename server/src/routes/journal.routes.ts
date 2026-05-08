import { Router } from 'express';
import { createJournalEntry, getJournalHistory } from '../controllers/journal.controller';

const router = Router();

router.post('/analyze', createJournalEntry);
router.get('/history/:userId', getJournalHistory);

export default router;
