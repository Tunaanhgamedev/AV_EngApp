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
        let serviceAccount = null;
        const envVal = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (envVal) {
            let trimmed = envVal.trim();
            // Auto-repair missing curly braces if the value contains service account markers
            if (!trimmed.startsWith('{') && (trimmed.includes('"project_id"') || trimmed.includes('"private_key"'))) {
                trimmed = '{' + trimmed;
            }
            if (!trimmed.endsWith('}') && (trimmed.includes('"project_id"') || trimmed.includes('"private_key"'))) {
                trimmed = trimmed + '}';
            }
            if (trimmed.startsWith('{')) {
                // It is raw JSON content
                serviceAccount = JSON.parse(trimmed);
                console.log('Firebase Admin: parsed configuration from environment variable JSON string');
            }
            else {
                // It might be a filename/path (like "firebase-service-account.json")
                const fs = require('fs');
                const resolvedPath = path_1.default.isAbsolute(trimmed) ? trimmed : path_1.default.join(process.cwd(), trimmed);
                if (fs.existsSync(resolvedPath)) {
                    const fileContent = fs.readFileSync(resolvedPath, 'utf8');
                    serviceAccount = JSON.parse(fileContent.trim());
                    console.log(`Firebase Admin: loaded configuration from file path pointed to by environment variable: ${resolvedPath}`);
                }
                else {
                    throw new Error(`FIREBASE_SERVICE_ACCOUNT env var is set to "${trimmed}", but it is not valid JSON and the file does not exist at resolved path: ${resolvedPath}`);
                }
            }
        }
        else {
            // Default fallback if no env variable is specified
            const defaultPath = path_1.default.join(process.cwd(), 'firebase-service-account.json');
            const fs = require('fs');
            if (fs.existsSync(defaultPath)) {
                const fileContent = fs.readFileSync(defaultPath, 'utf8');
                serviceAccount = JSON.parse(fileContent.trim());
                console.log('Firebase Admin: loaded configuration from default local JSON file');
            }
            else {
                console.warn('Firebase Admin: No credentials found. Admin SDK might fail to authenticate incoming requests.');
            }
        }
        if (serviceAccount) {
            // Normalize private key newlines if they are escaped as double backslashes
            if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
                serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
            }
            // Normalize malformed URLs (e.g. single slash after https:)
            const urlKeys = ['auth_uri', 'token_uri', 'auth_provider_x509_cert_url', 'client_x509_cert_url'];
            for (const key of urlKeys) {
                if (serviceAccount[key] && typeof serviceAccount[key] === 'string') {
                    if (serviceAccount[key].startsWith('https:/') && !serviceAccount[key].startsWith('https://')) {
                        serviceAccount[key] = serviceAccount[key].replace('https:/', 'https://');
                    }
                }
            }
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(serviceAccount),
            });
            console.log('Firebase Admin initialized successfully');
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
