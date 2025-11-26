import Teacher from '../models/Teacher.js';

// --- CREATE A NEW TEACHER ---
export const createTeacher = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const teacher = await Teacher.create({
      name,
      email
    });

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET ALL TEACHERS ---
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};