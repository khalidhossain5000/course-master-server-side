import express from "express";
import { createAssignment } from "../controllers/assignment.controller.js";

const router = express.Router();

// POST create assignment
router.post("/create-assignment", createAssignment);

export default router;
