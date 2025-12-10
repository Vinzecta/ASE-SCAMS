import express from 'express';
import { createRoom, getRooms } from '../controllers/RoomController.js';
import { verifyToken } from '../middlewares/auth.js';
import { allowRoles } from '../middlewares/role.js';

const router = express.Router();

router.post('/', verifyToken, allowRoles('admin'), createRoom);
router.get('/', verifyToken, allowRoles('admin', 'lecturer'), getRooms);

export default router;
