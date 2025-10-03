import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import express from 'express';
import cors from "cors"
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from "express-rate-limit"
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';


const creatApp = async () => {
    dotenv.config();
    await connectDB()
    const app = express();
    const PORT = process.env.PORT || 8080

    const whiteList = ["http://localhost:5173",]
    const corsOptions = {
        origin: (origin, callback) => {
            if (whiteList.includes(origin) || !origin) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        }
    }
    // middlewars 
    app.use(cors(corsOptions))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet())
    app.use(morgan("dev"))

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
    // app.use(limiter)

    const apiRoutes = (await import('./routes/index.js')).default;
    app.use("/api", apiRoutes)

    app.use(notFound)
    app.use(errorHandler)


    app.listen(PORT, () => console.log(`Server is running on port ${PORT} ✅`))
}

creatApp()