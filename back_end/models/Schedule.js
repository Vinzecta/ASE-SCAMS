import mongoose from 'mongoose';

// 1. Define the Session sub-schema (matches the 'sessions' array in your JSON)
const sessionSchema = new mongoose.Schema(
  {
    weeks: [{ type: Number }],
    day: { type: Number, required: true },
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true },

    // Link to the Room model
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
  },
  { _id: false }
); // No separate _id for sessions needed usually

// 2. Define the main Schedule Schema
const scheduleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },

  group: { type: String, required: true }, // e.g., "CC02"
  credit: { type: Number, default: 0 }, // e.g., 0

  sessions: [sessionSchema],
});

export default mongoose.model('Schedule', scheduleSchema);
