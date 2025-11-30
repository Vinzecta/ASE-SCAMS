import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Math 101"
  code: { type: String, required: true }  // e.g., "MTH101"
});

export default mongoose.model('Course', courseSchema);