"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const path_1 = __importDefault(require("path"));
// Initialize Firebase Admin
if (!firebase_admin_1.default.apps.length) {
    try {
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            // Parse JSON string from environment variable
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(serviceAccount),
            });
            console.log('Firebase Admin initialized via environment variable successfully');
        }
        else {
            const serviceAccountPath = path_1.default.join(process.cwd(), 'firebase-service-account.json');
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(serviceAccountPath),
            });
            console.log('Firebase Admin initialized successfully from local JSON file');
        }
    }
    catch (error) {
        console.error('Firebase Admin initialization error:', error);
    }
}
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error('Firebase Auth Error:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
exports.authenticate = authenticate;
