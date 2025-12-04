// routes/quiz.routes.js
import express from "express";
import { createQuiz } from "../controllers/quiz.controller.js";


const router = express.Router();

// Create Quiz Route
router.post("/create", createQuiz);

export default router;
