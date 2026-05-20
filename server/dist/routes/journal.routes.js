"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journal_controller_1 = require("../controllers/journal.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/analyze', auth_middleware_1.authenticate, journal_controller_1.createJournalEntry);
router.get('/history/:userId', auth_middleware_1.authenticate, journal_controller_1.getJournalHistory);
exports.default = router;
