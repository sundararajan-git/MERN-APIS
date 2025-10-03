import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js"

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new AppError("No token provied", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new AppError("Invalid token provied", 400);
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        next(err);
    }
};