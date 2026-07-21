"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toeic_writing_controller_1 = require("../controllers/toeic-writing.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/challenge', auth_middleware_1.authenticate, toeic_writing_controller_1.getChallenge);
router.post('/evaluate', auth_middleware_1.authenticate, toeic_writing_controller_1.evaluateChallenge);
exports.default = router;
