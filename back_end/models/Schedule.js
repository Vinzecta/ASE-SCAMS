import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },

  // UPDATE THIS PART:
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Now it points to the Room model
    required: true,
  },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

export default mongoose.model('Schedule', scheduleSchema);
