import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    let serviceAccount: any = null;
    const envVal = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (envVal) {
      const trimmed = envVal.trim();
      if (trimmed.startsWith('{')) {
        // It is raw JSON content
        serviceAccount = JSON.parse(trimmed);
        console.log('Firebase Admin: parsed configuration from environment variable JSON string');
      } else {
        // It might be a filename/path (like "firebase-service-account.json")
        const fs = require('fs');
        const resolvedPath = path.isAbsolute(trimmed) ? trimmed : path.join(process.cwd(), trimmed);
        if (fs.existsSync(resolvedPath)) {
          const fileContent = fs.readFileSync(resolvedPath, 'utf8');
          serviceAccount = JSON.parse(fileContent.trim());
          console.log(`Firebase Admin: loaded configuration from file path pointed to by environment variable: ${resolvedPath}`);
        } else {
          throw new Error(`FIREBASE_SERVICE_ACCOUNT env var is set to "${trimmed}", but it is not valid JSON and the file does not exist at resolved path: ${resolvedPath}`);
        }
      }
    } else {
      // Default fallback if no env variable is specified
      const defaultPath = path.join(process.cwd(), 'firebase-service-account.json');
      const fs = require('fs');
      if (fs.existsSync(defaultPath)) {
        const fileContent = fs.readFileSync(defaultPath, 'utf8');
        serviceAccount = JSON.parse(fileContent.trim());
        console.log('Firebase Admin: loaded configuration from default local JSON file');
      } else {
        console.warn('Firebase Admin: No credentials found. Admin SDK might fail to authenticate incoming requests.');
      }
    }

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin initialized successfully');
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
