// import Quiz from "../models/quiz.model.js";



import Course from "../models/course.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { courseId, title, dueDate, questions, courseName } = req.body;

    if (!courseId || !title || !dueDate || !questions || !courseName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Push quiz into course
    const newQuiz = { title, dueDate, questions, courseName };
    course.quizzes.push(newQuiz);

    await course.save();

    res.status(201).json({
      success: true,
      message: "Quiz added to course successfully",
      data: newQuiz, // শুধু নতুন added quiz return করছি
    });
  } catch (error) {
    console.error("Quiz Create Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add quiz",
      error: error.message,
    });
  }
};