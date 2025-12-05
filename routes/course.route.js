import { createCourse, deleteCourse, getAllCourses, getCoursesForAddCourse, updateCourse } from "../controllers/course.controller.js"
import express from "express"


const router = express.Router()

router.post('/create',createCourse)
router.get("/course-dropdown", getCoursesForAddCourse);
router.get("/", getAllCourses);
router.delete("/:id", deleteCourse);
// Update Course
router.put("/update/:courseId", updateCourse);
export default router;
