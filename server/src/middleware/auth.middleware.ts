import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Parse JSON string from environment variable
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin initialized via environment variable successfully');
    } else {
      const serviceAccountPath = path.join(process.cwd(), 'firebase-service-account.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
      });
      console.log('Firebase Admin initialized successfully from local JSON file');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase Auth Error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
