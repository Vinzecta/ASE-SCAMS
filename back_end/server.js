import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import teacherRoutes from './routes/TeacherRoute.js';
import courseRoutes from './routes/CourseRoute.js';
import scheduleRoutes from './routes/ScheduleRoute.js'; // (Uncomment when you make this file)
import roomRoutes from './routes/RoomRoute.js';
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Mount Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/rooms', roomRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
