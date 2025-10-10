import { Router } from "express";
import userRoutes from "./auth/userRoutes.js";
import emartProductsRoutes from "./emart/productRoutes.js"

import connectChatsRoutes from "./connect/chatRoutes.js"
import connectMessageRoutes from "./connect/messageRoute.js"
import connectUserRoutes from "./connect/userRoutes.js"

const router = Router();

// auth
router.use("/auth", userRoutes);


// emart
router.use("/emart", emartProductsRoutes)

// connect
router.use("/connect/chats", connectChatsRoutes)
router.use("/connect/message", connectMessageRoutes)
router.use("/connect/user", connectUserRoutes)


export default router;
