import express from 'express';
import { createTeacher, getTeachers } from '../controllers/TeacherController.js';

const router = express.Router();

router.post('/', verifyToken, allowRoles('admin'), createTeacher); // POST /api/teachers
router.get('/', verifyToken, allowRoles('admin', 'lecturer'), getTeachers); // GET /api/teachers

export default router;
