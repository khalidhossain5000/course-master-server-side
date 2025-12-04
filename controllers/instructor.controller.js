import Instructor from "../models/instructor.model.js";
import instructorValidation from "../validators/instructor.validation.js";

const createInstructor = async (req, res) => {
  try {
    // 1. Validate incoming data
    const { error } = instructorValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // 2. Save to database
    const newInstructor = await Instructor.create(req.body);

    // 3. Send response
    res.status(201).json({
      success: true,
      message: "Instructor added successfully",
      data: newInstructor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

export default createInstructor;