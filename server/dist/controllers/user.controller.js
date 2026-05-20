"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckinHistory = exports.getCheckinStatus = exports.dailyCheckin = exports.addXP = exports.getLeaderboard = exports.createUser = exports.getUsers = exports.syncUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const syncUser = async (req, res) => {
    const firebaseUser = req.user;
    if (!firebaseUser) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        // Upsert user: Create if doesn't exist, update if it does
        const user = await prisma_1.default.user.upsert({
            where: { email: firebaseUser.email },
            update: {
                username: firebaseUser.name || firebaseUser.email?.split('@')[0] || 'User',
                avatarUrl: firebaseUser.picture,
            },
            create: {
                id: firebaseUser.uid, // Use Firebase UID as Primary Key
                email: firebaseUser.email,
                username: firebaseUser.name || firebaseUser.email?.split('@')[0] || 'User',
                avatarUrl: firebaseUser.picture,
                xp: 0,
                level: 1,
                streak: 0,
            }
        });
        res.json(user);
    }
    catch (error) {
        console.error('Sync User Error:', error);
        res.status(500).json({ error: 'Failed to sync user with database' });
    }
};
exports.syncUser = syncUser;
const getUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    const { username, email, avatarUrl } = req.body;
    try {
        const user = await prisma_1.default.user.create({
            data: { username, email, avatarUrl }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};
exports.createUser = createUser;
// ─── NEW LEADERBOARD & XP ENDPOINTS ──────────────────────────────────────────
const getLeaderboard = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            orderBy: { xp: 'desc' },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
                xp: true,
                level: true,
                streak: true,
                createdAt: true,
            }
        });
        res.json(users);
    }
    catch (error) {
        console.error('Leaderboard Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
};
exports.getLeaderboard = getLeaderboard;
const addXP = async (req, res) => {
    const userId = req.user?.uid;
    const { xpToAdd, reason } = req.body;
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    if (typeof xpToAdd !== 'number' || xpToAdd <= 0) {
        return res.status(400).json({ error: 'Invalid xpToAdd value' });
    }
    try {
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newXp = user.xp + xpToAdd;
        // Balanced leveling system: e.g. 200 XP per level
        const newLevel = Math.floor(newXp / 200) + 1;
        const updatedUser = await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                xp: newXp,
                level: newLevel > user.level ? newLevel : user.level
            }
        });
        res.json({ success: true, xp: updatedUser.xp, level: updatedUser.level });
    }
    catch (error) {
        console.error('Add XP Error:', error);
        res.status(500).json({ error: 'Failed to award XP' });
    }
};
exports.addXP = addXP;
const dailyCheckin = async (req, res) => {
    const userId = req.user?.uid;
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        const now = new Date();
        // Convert to Vietnam timezone ICT (UTC+7)
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ictTime = new Date(utcTime + (3600000 * 7));
        const today = new Date(ictTime.getFullYear(), ictTime.getMonth(), ictTime.getDate());
        // Check if daily activity already marked with a high sentinel (>9000) representing checkin
        const existingActivity = await prisma_1.default.userDailyActivity.findFirst({
            where: {
                userId,
                activityDate: today
            }
        });
        if (existingActivity && existingActivity.totalMinutes >= 9000) {
            return res.status(400).json({ error: 'Bạn đã điểm danh hôm nay rồi!' });
        }
        // Award 50 XP and increment streak
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newStreak = user.streak + 1;
        const newXp = user.xp + 50;
        const newLevel = Math.floor(newXp / 200) + 1;
        await prisma_1.default.$transaction([
            prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    xp: newXp,
                    level: newLevel > user.level ? newLevel : user.level,
                    streak: newStreak
                }
            }),
            prisma_1.default.userDailyActivity.upsert({
                where: {
                    userId_activityDate: { userId, activityDate: today }
                },
                update: {
                    totalMinutes: { increment: 9999 } // Sentinel value representing checked-in status
                },
                create: {
                    userId,
                    activityDate: today,
                    totalMinutes: 9999
                }
            })
        ]);
        res.json({
            success: true,
            message: 'Điểm danh thành công! +50 XP',
            xp: newXp,
            level: newLevel > user.level ? newLevel : user.level,
            streak: newStreak
        });
    }
    catch (error) {
        console.error('Checkin Error:', error);
        res.status(500).json({ error: 'Failed to complete daily checkin' });
    }
};
exports.dailyCheckin = dailyCheckin;
const getCheckinStatus = async (req, res) => {
    const userId = req.user?.uid;
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        const now = new Date();
        // Convert to Vietnam timezone ICT (UTC+7)
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ictTime = new Date(utcTime + (3600000 * 7));
        const today = new Date(ictTime.getFullYear(), ictTime.getMonth(), ictTime.getDate());
        const activity = await prisma_1.default.userDailyActivity.findFirst({
            where: {
                userId,
                activityDate: today
            }
        });
        const checkedIn = activity ? activity.totalMinutes >= 9000 : false;
        res.json({ checkedIn });
    }
    catch (error) {
        console.error('Get Checkin Status Error:', error);
        res.status(500).json({ error: 'Failed to get checkin status' });
    }
};
exports.getCheckinStatus = getCheckinStatus;
const getCheckinHistory = async (req, res) => {
    const userId = req.user?.uid;
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        const activities = await prisma_1.default.userDailyActivity.findMany({
            where: {
                userId,
                totalMinutes: { gte: 9000 }
            },
            select: {
                activityDate: true
            },
            orderBy: {
                activityDate: 'asc'
            }
        });
        res.json(activities.map(a => a.activityDate));
    }
    catch (error) {
        console.error('Get Checkin History Error:', error);
        res.status(500).json({ error: 'Failed to get checkin history' });
    }
};
exports.getCheckinHistory = getCheckinHistory;
