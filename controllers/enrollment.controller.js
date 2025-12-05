import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";





export const enrollFreeCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    // Already enrolled check
    const exists = await Enrollment.findOne({ user: userId, course: courseId });
    if (exists) return res.status(400).json({ message: "Already enrolled" });

    // Create enrollment
    const enrollment = await Enrollment.create({ user: userId, course: courseId });

    // Optional: update course's enrolledStudents
    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });

    res.status(200).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};




export const enrollPaidCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId, transactionId, method, amount } = req.body;

    // Already enrolled check
    const exists = await Enrollment.findOne({ user: userId, course: courseId });
    if (exists) return res.status(400).json({ message: "Already enrolled" });

    // Create enrollment with payment details
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      paymentStatus: "paid",
      paymentDetails: {
        transactionId,
        method,
        amount,
        status: "success",
        paidAt: new Date(),
      },
    });

    // Update enrolledStudents in course
    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });

    res.status(200).json({ message: "Payment successful, enrolled!", enrollment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};













export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { courseId } = req.body;

    // 1 Already enrolled check
    const alreadyEnrolled = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    // 2 Create Enrollment document
    const newEnrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      paymentStatus: "free", // Free course by default
    });

    // Optionally: Add user to enrolledStudents array in Course (professional)
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId }, // duplicate avoid
    });

    res.status(200).json({
      message: "Enrollment successful!",
      enrollment: newEnrollment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
