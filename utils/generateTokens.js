import jwt from "jsonwebtoken"
import crypto from "crypto"

export const generateJwtToken = async (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

export const verificationToken = () => (Math.floor(100000 + (Math.random() * 900000))).toString()

export const resetPasswordToken = () => crypto.randomBytes(32).toString("hex");