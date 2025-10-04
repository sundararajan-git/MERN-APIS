import express from "express";
import { forgotPassword, getUser, login, logout, resetPassword, signup, verifyEmail } from "../../controllers/auth/userController.js";
import { validUser } from "../../middlewares/validUser.js";


const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/verify-email/:id", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.put("/reset-password/:token", resetPassword)
router.post("/logout", validUser, logout)
router.get("/valid-user", validUser, getUser)

export default router