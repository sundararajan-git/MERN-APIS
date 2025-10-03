import { Router } from "express";
import userRoutes from "./auth/userRoutes.js";
import emartProductsRoutes from "./emart/productRoutes.js"

const router = Router();

// auth
router.use("/auth", userRoutes);


// emart
router.use("/emart", emartProductsRoutes)


export default router;
