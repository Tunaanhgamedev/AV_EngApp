import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import vocabularyRoutes from './routes/vocabulary.routes';
import journalRoutes from './routes/journal.routes';
import chatRoutes from './routes/chat.routes';
import aiRoutes from './routes/ai.routes';


const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);
// DB Fix: SSL authorized


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to AVEngApp API' });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
