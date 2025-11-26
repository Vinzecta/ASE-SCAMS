import Course from '../models/Course.js';

// --- CREATE A NEW COURSE ---
export const createCourse = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Check if course code already exists
    const courseExists = await Course.findOne({ code });
    if (courseExists) {
      return res.status(400).json({ message: 'Course code already exists' });
    }

    const course = await Course.create({
      name,
      code
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET ALL COURSES ---
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};