import Course from '../models/Course.js';
import Room from '../models/Room.js';
// import Teacher from '../models/Teacher.js'; // Uncomment if you add teacher lookup later

/**
 * Transforms raw JSON input into a Mongoose-ready Schedule object.
 * Performs database lookups to convert Codes/Names into ObjectIds.
 * * @param {Object} rawData - The JSON body from the request
 * @returns {Promise<Object>} - The object ready to be passed to Schedule.create()
 */
export const toScheduleDatabaseFormat = async (rawData) => {
  // 1. Find the Course ObjectId based on the code (e.g., "SA0002")
  const courseDoc = await Course.findOne({ code: rawData.courseCode });

  if (!courseDoc) {
    throw new Error(`Course with code "${rawData.courseCode}" not found.`);
  }

  // 2. Transform the sessions array (Resolve Room Strings -> Room ObjectIds)
  // We use Promise.all because we are doing multiple async DB lookups inside a map
  const processedSessions = await Promise.all(
    rawData.sessions.map(async (session) => {
      // Find the room by name (e.g., "CS-LTK")
      const roomDoc = await Room.findOne({ name: session.room });

      if (!roomDoc) {
        throw new Error(`Room with name "${session.room}" not found.`);
      }

      return {
        weeks: session.weeks,
        day: session.day,
        timeStart: session.timeStart,
        timeEnd: session.timeEnd,
        room: roomDoc._id, // <--- The key transformation
      };
    })
  );

  // 3. Return the clean object strictly matching your Mongoose Schema
  return {
    course: courseDoc._id, // The ObjectId reference
    group: rawData.group,
    credit: rawData.credit,
    sessions: processedSessions,
  };
};
