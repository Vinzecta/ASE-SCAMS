import Schedule from '../models/Schedule.js';

export const createSchedule = async (req, res) => {
  const { teacherId, courseId, room, startTime } = req.body;

  // 1. Calculate End Time (Start Time + 1 Hour)
  const start = new Date(startTime);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // Add 1 hour

  try {
    // 2. CHECK CONFLICTS: Look for overlaps in the same room
    const existingClass = await Schedule.findOne({
      room: room, // MongoDB compares the Room IDs. It's 100% accurate.
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    }).session(session);

    // 3. Create the schedule
    const newSchedule = new Schedule({
      teacher: teacherId,
      course: courseId,
      room: room,
      startTime: start,
      endTime: end,
    });

    const savedSchedule = await newSchedule.save();

    // Optional: Populate names for the response so it's easier to read
    await savedSchedule.populate(['teacher', 'course']);

    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSchedules = async (req, res) => {
  try {
    // Populate shows the actual Name instead of just the ID
    const schedules = await Schedule.find({}).populate('teacher').populate('course');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
