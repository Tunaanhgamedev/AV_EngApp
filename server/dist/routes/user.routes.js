"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Sync user after login
router.post('/sync', auth_middleware_1.authenticate, user_controller_1.syncUser);
// Leaderboard & Gamification routes
router.get('/leaderboard', auth_middleware_1.authenticate, user_controller_1.getLeaderboard);
router.post('/add-xp', auth_middleware_1.authenticate, user_controller_1.addXP);
router.post('/checkin', auth_middleware_1.authenticate, user_controller_1.dailyCheckin);
router.get('/checkin-status', auth_middleware_1.authenticate, user_controller_1.getCheckinStatus);
router.get('/checkin-history', auth_middleware_1.authenticate, user_controller_1.getCheckinHistory);
// Manage users
router.get('/', auth_middleware_1.authenticate, user_controller_1.getUsers);
router.post('/', auth_middleware_1.authenticate, user_controller_1.createUser);
exports.default = router;
