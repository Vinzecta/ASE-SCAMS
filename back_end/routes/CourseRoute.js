import express from 'express';
import { createCourse, getCourses } from '../controllers/CourseController.js';

const router = express.Router();

router.post('/', createCourse); // POST /api/courses
router.get('/', getCourses);    // GET /api/courses

export default router;