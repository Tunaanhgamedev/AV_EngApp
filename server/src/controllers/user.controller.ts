import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const syncUser = async (req: AuthRequest, res: Response) => {
  const firebaseUser = req.user;

  if (!firebaseUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    // Upsert user: Create if doesn't exist, update if it does
    const user = await prisma.user.upsert({
      where: { email: firebaseUser.email },
      update: {
        username: firebaseUser.name || firebaseUser.email?.split('@')[0] || 'User',
        avatarUrl: firebaseUser.picture,
      },
      create: {
        id: firebaseUser.uid, // Use Firebase UID as Primary Key
        email: firebaseUser.email!,
        username: firebaseUser.name || firebaseUser.email?.split('@')[0] || 'User',
        avatarUrl: firebaseUser.picture,
        xp: 0,
        level: 1,
        streak: 0,
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Sync User Error:', error);
    res.status(500).json({ error: 'Failed to sync user with database' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, avatarUrl } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email, avatarUrl }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
