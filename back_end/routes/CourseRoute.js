import express from 'express';
import { createCourse, getCourses } from '../controllers/CourseController.js';
import { verifyToken } from '../middlewares/auth.js';
import { allowRoles } from '../middlewares/role.js';
const router = express.Router();

router.post('/', verifyToken, allowRoles('admin'), createCourse); // POST /api/courses
router.get('/', verifyToken, allowRoles('admin', 'lecturer'), getCourses); // GET /api/courses

export default router;
