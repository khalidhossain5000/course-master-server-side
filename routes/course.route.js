import { createCourse, deleteCourse, getAllCourses, getCoursesForAddCourse } from "../controllers/course.controller.js"
import express from "express"


const router = express.Router()

router.post('/create',createCourse)
router.get("/course-dropdown", getCoursesForAddCourse);
router.get("/", getAllCourses);
router.delete("/:id", deleteCourse);
export default router;
