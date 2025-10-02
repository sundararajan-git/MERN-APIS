import { Schema } from "mongoose"
import { getDB } from "../../config/db.js"
import validator from "validator"

const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true, validate: {
            validator: validator.isEmail
        }
    },
    password: {
        type: String, required: true
    },
    username: { type: String, unique: true },
    profilePic: { type: String, default: "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1758980337/Avatar_optimized_gxxtqo.jpg" },
    isVerified: { type: Boolean, default: false },
    isLogin: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationExpireAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpireAt: { type: Date },
    lastLogin: { type: Date },
    lastLogout: { type: Date }
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
        delete ret.verificationToken;
        delete ret.verificationExpireAt;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpireAt;
        return ret
    }
})


const db = getDB("auth")
const User = db.model("User", userSchema)

export default User;