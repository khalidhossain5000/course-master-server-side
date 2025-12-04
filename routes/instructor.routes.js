import express from "express";
import createInstructor from "../controllers/instructor.controller.js";

const router = express.Router();


router.post("/create", createInstructor);

export default router;
