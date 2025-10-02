import express from "express";
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail } from "../../controllers/auth/userController.js";


const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/verify-email/:id", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.put("/reset-password/:token", resetPassword)
router.post("/logout", logout)

export default router