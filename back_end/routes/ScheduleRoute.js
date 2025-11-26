import express from 'express';
import { createSchedule, getSchedules } from '../controllers/ScheduleController.js';

const router = express.Router();

router.post('/', createSchedule);
router.get('/', getSchedules);

export default router;