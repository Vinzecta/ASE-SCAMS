import express from 'express';
import { createTeacher, getTeachers } from '../controllers/TeacherController.js';

const router = express.Router();

router.post('/', createTeacher); // POST /api/teachers
router.get('/', getTeachers); // GET /api/teachers

export default router;
