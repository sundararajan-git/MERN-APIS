import { Router } from "express";
import userRoutes from "./auth/userRoutes.js";

const router = Router();

// auth
router.use("/auth", userRoutes);


// emart


export default router;
