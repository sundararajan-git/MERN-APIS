import asyncHandler from "express-async-handler"
import User from "../../models/auth/userModels.js"

export const getContacts = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users);
})
