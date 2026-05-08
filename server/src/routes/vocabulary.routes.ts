import { Router } from 'express';
import { 
  getDueWords, 
  learnNewWord, 
  submitReview,
  searchWord
} from '../controllers/vocabulary.controller';

const router = Router();

router.get('/due/:userId', getDueWords);
router.get('/search/:word', searchWord);
router.post('/learn', learnNewWord);
router.post('/review', submitReview);

export default router;
