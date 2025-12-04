import express from "express";
import { loginUser, logoutUser, refreshToken, registerUser } from "../controllers/auth.controller.js";


const router = express.Router()

//register route
router.post('/register', registerUser)
router.post("/login", loginUser);
router.get("/refresh", refreshToken);
router.post("/logout", logoutUser);
export default router;