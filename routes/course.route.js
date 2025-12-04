import { createCourse } from "../controllers/course.controller.js"
import express from "express"


const router = express.Router()

router.post('/create',createCourse)

export default router;
