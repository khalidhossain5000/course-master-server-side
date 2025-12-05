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



// GET all courses (for dropdown) --add course form
export const getCoursesForAddCourse = async (req, res) => {
  try {
    
    const courses = await Course.find({}, "_id title");
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




// GET all courses with pagination, search, sort, filter
export const getAllCourses = async (req, res) => {
  try {
    // Query Params from frontend
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "",
      category = "",
      instructor = "",
    } = req.query;

    // Pagination Logic
    const skip = (page - 1) * limit;

    
    // BUILD FILTER OBJECT
 
    const filter = {};

    // Search by title or instructor
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by instructor (optional)
    if (instructor) {
      filter.instructor = instructor;
    }

   
    // SORTING LOGIC

    const sortOptions = {};
    if (sort === "price_low") sortOptions.price = 1;
    if (sort === "price_high") sortOptions.price = -1;
    if (sort === "newest") sortOptions.createdAt = -1;
    if (sort === "oldest") sortOptions.createdAt = 1;

   
    // FETCH FROM DATABASE

    const courses = await Course.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const totalCourses = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      pagination: {
        total: totalCourses,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCourses / limit),
      },
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


//upate course
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params; 
    const updateData = req.body; 
console.log(updateData,'update data in ')
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // find course and update
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// Delete Course Controller
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Delete the course
    await Course.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



