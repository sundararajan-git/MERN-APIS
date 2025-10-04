import asyncHandler from "express-async-handler"
import { AppError } from "../../utils/AppError.js"
import User from "../../models/auth/userModels.js"
import bcrypt from "bcryptjs"
import { generateJwtToken, resetPasswordToken, verificationToken } from "../../utils/generateTokens.js"
import { sanitaize } from "../../utils/helperFunctions.js"
import MailService from "../../utils/sendMailHandler.js";

export const signup = asyncHandler(async (req, res) => {
    const { email, password, software } = req.body

    if (!software) {
        throw new AppError("Software is required", 400)
    }

    if (!email?.trim() || !password?.trim()) {
        throw new AppError("Email and password are required", 400)
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
        throw new AppError("Password does not meet the requirements", 400);
    }

    const exits = await User.findOne({ email })
    if (exits) {
        if (exits.isVerified) {
            return res.status(400).json({ message: "User already exits , Please login", status: "ALREADY_VERIFIED", exits })
        }

        if (exits.verificationExpireAt < Date.now()) {
            await exits.deleteOne()
        } else {
            const subject = "Verify Your Email";
            await MailService.sendVerificationMail(email, subject, exits.verificationToken, software);
            return res.status(200).json({
                message: "Verification email resent",
                status: "RESEND_VERIFICATION"
            });
        }
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)


    const user = await User.create({
        email, password: hashed, verificationToken: verificationToken(), verificationExpireAt: Date.now() + 24 * 60 * 60 * 1000
    })

    if (!user) {
        throw new AppError("User creation failed", 500)
    }

    const subject = "Verify Your Email";
    await MailService.sendVerificationMail(email, subject, user.verificationToken, software);


    const safeUser = sanitaize(user, ["_id", "email", "username", "profilePic", "isVerified", "isLogin", "updatedAt"])

    res.status(201).json({ message: "User created successfully", status: "NEW_USER", user: safeUser })
})

export const login = asyncHandler(async (req, res) => {
    const { email, password, software } = req.body

    if (!email?.trim() || !password?.trim()) {
        throw new AppError("Email and password are required", 400)
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError("User not found", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new AppError("Invalid password", 401)
    }


    if (!user.isVerified) {
        if (user.verificationExpireAt < Date.now()) {
            user.verificationToken = verificationToken();
            user.verificationExpireAt = Date.now() + 24 * 60 * 60 * 1000
            await user.save()
        }
        const subject = "Verify Your Email";
        await MailService.sendVerificationMail(email, subject, user.verificationToken, software);
        return res.status(200).json({ message: "Please verify your email to login", status: "RESEND_VERIFICATION" })
    }

    if (user.verificationToken) {
        user.verificationToken = undefined
        user.verificationExpireAt = undefined
    }

    user.isLogin = true
    user.lastLogin = Date.now()
    await user.save()

    const safeUser = sanitaize(user, ["_id", "email", "username", "profilePic", "isVerified", "isLogin", "updatedAt"])

    const jwtToken = await generateJwtToken(user._id)

    res.status(200).json({ message: "User logged in successfully", user: { ...safeUser }, jwtToken, status: "LOGINED" })
})

export const verifyEmail = asyncHandler(async (req, res) => {
    const { code, software } = req.body
    const { id } = req.params

    if (!code?.trim()) {
        throw new AppError("Verification Code is required", 400)
    }
    if (code.length !== 6) {
        throw new AppError("Invalid Code", 400)
    }
    if (!id?.trim()) {
        throw new AppError("User id is required", 400)
    }

    const user = await User.findOne({ _id: id })

    if (!user) {
        throw new AppError("User not found", 400)
    }

    if (user.isVerified) {
        throw new AppError("Email already verified", 400)
    }

    if (user.verificationExpireAt < Date.now()) {
        throw new AppError("Verification Code Expired", 400)
    }

    if (user.verificationToken !== code) {
        throw new AppError("Invalid Code", 400)
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationExpireAt = undefined
    await user.save()

    const subject = "Welcome";
    await MailService.sendWelcomeCall(user.email, subject, software);


    const safeUser = sanitaize(user, ["_id", "email", "username", "profilePic", "isVerified", "isLogin", "updatedAt"])

    res.status(200).json({ message: "Email verified successfully", user: { ...safeUser }, status: "VERIFIED" })
})


export const forgotPassword = asyncHandler(async (req, res) => {
    const { email, software } = req.body
    if (!email?.trim()) {
        throw new AppError("Email is required", 400)
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError("User not found", 404)
    }
    user.resetPasswordToken = resetPasswordToken()
    user.resetPasswordExpireAt = Date.now() + 60 * 60 * 1000
    await user.save()

    const subject = "Forgot password";
    const link = `${process.env.VITE_APP_URL}/resetpassword/${user.resetPasswordToken}`;
    await MailService.forgotPassword(user.email, subject, link, software);

    const safeUser = sanitaize(user, ["_id", "email", "username", "profilePic", "isVerified", "isLogin", "updatedAt"])

    res.status(200).json({ message: "Password reset link sent to email", user: { ...safeUser }, status: "FORGOT_PASSWORD_REQUEST" })
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { password, software } = req.body
    if (!token?.trim()) {
        throw new AppError("Token is required", 400)
    }
    if (!password?.trim()) {
        throw new AppError("Password is required", 400)
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
        throw new AppError("Password does not meet the requirements", 400);
    }

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpireAt: { $gt: Date.now() } })
    if (!user) {
        throw new AppError("Invalid or expired token", 400)
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    user.password = hashed
    user.resetPasswordToken = undefined
    user.resetPasswordExpireAt = undefined
    await user.save()

    const subject = "Password reset sucessfull";
    await MailService.passwordRestSuccess(user.email, subject, software);


    const safeUser = sanitaize(user, ["_id", "email", "username", "profilePic", "isVerified", "isLogin", "updatedAt"])

    res.status(200).json({ message: "Password reset successfully", user: { ...safeUser }, status: "PASSWORD_RESET_DONE" })
})

export const logout = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new AppError("User ID is required", 400);
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (!user.isLogin) {
        throw new AppError("User is not logged in", 400);
    }
    user.isLogin = false;
    user.lastLogout = Date.now();
    await user.save();

    res.status(200).json({ message: "User logged out successfully", status: "LOGOUT" })
})

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.userId })
    const safeUser = sanitaize(user, ["_id", "email", "username", "profilePic", "isVerified", "isLogin", "updatedAt"])
    return res.status(200).json({ user: safeUser, status: "USER EXITS" })
})




