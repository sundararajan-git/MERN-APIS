import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from "express-rate-limit";
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const creatApp = async () => {
    dotenv.config();
    connectDB();
    const app = express();
    const PORT = process.env.PORT || 8080;

    const whiteList = ["http://localhost:5173", "https://emart-5040.firebaseapp.com"];
    const corsOptions = {
        origin: (origin, callback) => {
            if (whiteList.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan("dev"));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    });
    // app.use(limiter);

    const apiRoutes = (await import('./routes/index.js')).default;
    app.use("/api", apiRoutes);

    app.use(notFound);
    app.use(errorHandler);

    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: whiteList,
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    // const connectNS = io.of("/connect1");

    // connectNS.use((socket, next) => {
    //     const token = socket.handshake.auth?.token;
    //     if (!token) return next(new Error("Unauthorized"));
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         socket.userId = decoded.userId;
    //         next();
    //     } catch (err) {
    //         next(new Error("Invalid Token"));
    //     }
    // });

    // connectNS.on("connection", (socket) => {
    //     console.log("User connected to Connect App:", socket.userId);

    //     socket.on("join-chat", (chatId) => socket.join(chatId));

    //     socket.on("send-message", ({ chatId, message }) => {
    //         socket.to(chatId).emit("receive-message", message);
    //     });

    //     socket.on("disconnect", () => {
    //         console.log("User disconnected from Connect App:", socket.userId);
    //     });
    // });


    server.listen(PORT, () => console.log(`Server is running on port ${PORT} ✅`));
};

creatApp();
