import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import authController from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: "John Doe"
 *               email: "johndoe@gmail.com"
 *               password: "12345"
 *               role: "lecturer"
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [guest, student, lecturer, security, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and return tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: "johndoe@gmail.com"
 *               password: "12345"
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10, // 10 attempts per 5 minutes
  message: "Too many login attempts, try again later"
});
router.post("/login", loginLimiter, authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               refreshToken: "your_refresh_token_here"
 *     responses:
 *       200:
 *         description: New access token returned
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and invalidate refresh token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post("/logout", verifyToken, authController.logout);

export default router;
