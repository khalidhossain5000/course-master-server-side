import Assignment from "../models/assignment.model.js";



// // Create Assignment
// export const createAssignment = async (req, res) => {
//   try {
//     const { title, description, dueDate, courseName,courseId } = req.body;
// console.log(req.body,'this is req boyd here re')

//     if (!title || !description || !dueDate || !courseName) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if course exists
//     const existingCourse = await Course.findById(courseId);
//     if (!existingCourse) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Create Assignment
//     const newAssignment = await Assignment.create({
//       title,
//       description,
//       dueDate,
//       courseId,
//       courseName,

//     });

//     res.status(201).json({
//       success: true,
//       message: "Assignment created successfully",
//       data: newAssignment,
//     });
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// };











//newd
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
      data: newAssignment, // শুধু নতুন added assignment return
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