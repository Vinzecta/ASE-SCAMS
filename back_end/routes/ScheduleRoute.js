import express from 'express';
import { createSchedule, getSchedules } from '../controllers/ScheduleController.js';

const router = express.Router();

router.post('/', verifyToken,allowRoles('admin', 'lecturer'), createSchedule);
router.get('/', verifyToken,allowRoles('admin', 'lecturer'), getSchedules);

export default router;