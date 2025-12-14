export const toFrontendSchedule = (dbSchedule) => {
  // 1. Safety check: If the course relation is broken/missing, return null
  if (!dbSchedule.course) {
    console.warn('Schedule missing course:', dbSchedule._id);
    return {
      courseCode: 'UNKNOWN',
      courseName: 'Unknown Course',
      group: dbSchedule.group,
      credit: dbSchedule.credit,
      sessions: dbSchedule.sessions.map((s) => ({
        weeks: s.weeks,
        day: s.day,
        timeStart: s.timeStart,
        timeEnd: s.timeEnd,
        room: s.room?.name ?? 'TBA',
      })),
    };
  }

  return {
    // Map database fields to your frontend interface names
    courseCode: dbSchedule.course.code, // e.g. "CO3049"
    courseName: dbSchedule.course.name, // e.g. "Web Programming"
    group: dbSchedule.group, // e.g. "CC01"
    credit: dbSchedule.credit, // e.g. 3

    // Map the sessions array
    sessions: dbSchedule.sessions.map((session) => ({
      weeks: session.weeks, // [38, 41, 44...]
      day: session.day, // 2
      timeStart: session.timeStart, // "12:00"
      timeEnd: session.timeEnd, // "13:50"

      // Crucial: Extract the Room Name string from the populated object
      // If room is missing/null, fallback to "TBA"
      room: session.room ? session.room.name : 'TBA',
    })),
  };
};
