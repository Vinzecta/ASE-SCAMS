import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';

// Swagger Setup
import { swaggerUi, swaggerSpec } from './config/swagger.js';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import teacherRoutes from './routes/TeacherRoute.js';
import courseRoutes from './routes/CourseRoute.js';
import scheduleRoutes from './routes/ScheduleRoute.js'; // (Uncomment when you make this file)
import roomRoutes from './routes/RoomRoute.js';
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err && (err.stack || err));
  const message = err?.message || String(err || "Unknown error");
  res.status(err?.statusCode || 500).json({ message });
});

app.use(express.json());
app.use(cors());
app.use(helmet());

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/teachers', teacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/rooms', roomRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
