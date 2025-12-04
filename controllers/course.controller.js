import Course from "../models/course.model.js";
import courseValidation from "../validators/course.validation.js";

// create course controller
export const createCourse = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    // 1. validate incoming data
    const { error } = courseValidation.validate(req.body);
    console.log(error, "this is vlaidtaion eror");
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // 2. save to database
    const newCourse = await Course.create(req.body);
    console.log(
      "this is req boadyt ",
      newCourse,
      "this is newcousere",
      req.body,
      "re.bodye is here hwith"
    );
    // 3. send response
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
    console.log(err, "error in catcg");
  }
};
