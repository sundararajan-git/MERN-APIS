import express from "express";

import { validUser } from "../../middlewares/validUser.js";
import { getMessages, sendMessage } from "../../controllers/connect/messageController.js";

const router = express.Router();

router.post("/", validUser, sendMessage);
router.get("/:chatId", validUser, getMessages);

export default router;
