import express from "express";
import { registerUser } from "../controllers/auth.controller.js";


const router = express.Router()

//register route
router.post('/register', registerUser)

export default router;