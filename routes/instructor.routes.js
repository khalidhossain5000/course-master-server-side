import express from "express";
import createInstructor, { getAllInstructors } from "../controllers/instructor.controller.js";

const router = express.Router();


router.post("/create", createInstructor);
router.get("/", getAllInstructors);
export default router;
