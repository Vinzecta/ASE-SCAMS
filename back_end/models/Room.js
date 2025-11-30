import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // No duplicate room names allowed
  },
  capacity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['Classroom', 'Lab', 'Hall'], // Restrict to specific types
    default: 'Classroom',
  },
});

export default mongoose.model('Room', roomSchema);
