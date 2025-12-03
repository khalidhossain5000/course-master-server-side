import express from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/auth.controller.js";


const router = express.Router()

//register route
router.post('/register', registerUser)
router.post("/login", loginUser);
router.get("/refresh", refreshToken);
export default router;