"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const vocabulary_routes_1 = __importDefault(require("./routes/vocabulary.routes"));
const journal_routes_1 = __importDefault(require("./routes/journal.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const toeic_routes_1 = __importDefault(require("./routes/toeic.routes"));
const ielts_routes_1 = __importDefault(require("./routes/ielts.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/vocabulary', vocabulary_routes_1.default);
app.use('/api/journal', journal_routes_1.default);
app.use('/api/chat', chat_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
app.use('/api/toeic', toeic_routes_1.default);
app.use('/api/ielts', ielts_routes_1.default);
// DB Fix: SSL authorized
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to AVEngApp API' });
});
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
exports.default = app;
