import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/user.routes';
import vocabularyRoutes from './routes/vocabulary.routes';
import journalRoutes from './routes/journal.routes';
import chatRoutes from './routes/chat.routes';
import aiRoutes from './routes/ai.routes';
import toeicRoutes from './routes/toeic.routes';
import ieltsRoutes from './routes/ielts.routes';
import toeicWritingRoutes from './routes/toeic-writing.routes';

const app: Application = express();

// Rate limiter: Max 150 requests per minute per IP to protect the server
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 150,
  message: { error: 'Quá nhiều yêu cầu từ địa chỉ IP này. Vui lòng thử lại sau.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression()); // Nén toàn bộ API JSON payload bằng Gzip/Brotli
app.use(morgan('dev'));
app.use('/api/', limiter); // Áp dụng rate limiting cho tất cả API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/toeic', toeicRoutes);
app.use('/api/toeic-writing', toeicWritingRoutes);
app.use('/api/ielts', ieltsRoutes);
// DB Fix: SSL authorized


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to AVEngApp API' });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
