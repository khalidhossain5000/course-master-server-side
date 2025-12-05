import express from "express";
import { enrollCourse, enrollFreeCourse, enrollPaidCourse, getMyEnrollments } from "../controllers/enrollment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

// Protected Route
router.post("/enroll",authMiddleware, enrollCourse);
router.post("/enroll/free", authMiddleware, enrollFreeCourse);
router.post("/enroll/paid", authMiddleware, enrollPaidCourse);
// GET student enrolled courses
router.get("/my-courses", authMiddleware, getMyEnrollments);
export default router;
