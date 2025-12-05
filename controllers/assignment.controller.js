import Assignment from "../models/assignment.model.js";


import Course from "../models/course.model.js";

export const createAssignment = async (req, res) => {
  try {
    const { courseId, title, description, dueDate, totalMarks } = req.body;

    if (!courseId || !title || !dueDate || !totalMarks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Push assignment into course
    const newAssignment = { title, description, dueDate, totalMarks };
    course.assignments.push(newAssignment);

    await course.save();

    res.status(201).json({
      success: true,
      message: "Assignment added to course successfully",
      data: newAssignment, 
    });
  } catch (error) {
    console.error("Assignment Create Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add assignment",
      error: error.message,
    });
  }
};