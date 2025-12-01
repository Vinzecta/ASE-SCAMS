import Schedule from '../models/Schedule.js';
import Room from '../models/Room.js';
import { toFrontendSchedule } from '../DTO/schedule_return.dto.js';

// --- Mutex Class (The Queue) ---
// This ensures requests wait in line in the server's memory
class Mutex {
  constructor() {
    this._queue = [];
    this._locked = false;
  }

  async acquire() {
    if (this._locked) {
      // If locked, wait here until it is released
      await new Promise((resolve) => this._queue.push(resolve));
    }
    this._locked = true;
  }

  release() {
    if (this._queue.length > 0) {
      // Let the next person in line proceed
      const nextResolve = this._queue.shift();
      nextResolve();
    } else {
      this._locked = false;
    }
  }
}

// Global Lock instance
const scheduleLock = new Mutex();

// --- Helper: Check Conflict ---
const checkRoomAvailability = async (newSessions) => {
  for (const session of newSessions) {
    const { roomId, day, timeStart, timeEnd, weeks } = session;

    // Query: Find any schedule that has a session conflicting with this one
    const conflict = await Schedule.findOne({
      sessions: {
        $elemMatch: {
          room: roomId, // Same Room
          day: day, // Same Day
          weeks: { $in: weeks }, // Overlapping Weeks

          // Time Overlap Logic: (Start A < End B) AND (End A > Start B)
          timeStart: { $lt: timeEnd },
          timeEnd: { $gt: timeStart },
        },
      },
    }).populate('sessions.room');

    if (conflict) {
      const roomDetails = await Room.findById(roomId);
      const roomName = roomDetails ? roomDetails.name : 'Unknown Room';
      return {
        isConflict: true,
        message: `Conflict detected in Room ${roomName} on Day ${day} (${timeStart}-${timeEnd}).`,
      };
    }
  }
  return { isConflict: false };
};

// --- Create Schedule (Serialized with Semaphore) ---
export const createSchedule = async (req, res) => {
  // 1. ACQUIRE LOCK
  // Everyone stops here and waits their turn.
  await scheduleLock.acquire();

  try {
    const { courseId, teacherId, groupId, credit, sessions } = req.body;

    // 2. CHECK (Safe because we are the only one running this code right now)
    const availability = await checkRoomAvailability(sessions);

    if (availability.isConflict) {
      return res.status(409).json({ message: availability.message });
    }

    // 3. ACT (Save)
    const newSchedule = new Schedule({
      course: courseId,
      teacher: teacherId,
      group: groupId,
      credit: credit,
      sessions: sessions.map((s) => ({
        day: s.day,
        timeStart: s.timeStart,
        timeEnd: s.timeEnd,
        weeks: s.weeks,
        room: s.roomId,
      })),
    });

    const saved = await newSchedule.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    // 4. RELEASE LOCK
    // Crucial: Must run even if there is an error, or the server will hang forever.
    scheduleLock.release();
  }
};

// --- Get All Schedules ---
export const getSchedules = async (req, res) => {
  try {
    const rawSchedules = await Schedule.find()
      .populate('course', 'name code')
      .populate('teacher', 'name email')
      .populate('sessions.room', 'name location');

    const frontendData = rawSchedules
      .map((schedule) => toFrontendSchedule(schedule))
      .filter((item) => item !== null);

    res.json(frontendData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
