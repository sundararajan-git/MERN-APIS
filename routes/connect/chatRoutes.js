import express from "express";
import { validUser } from "../../middlewares/validUser.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../../controllers/connect/chatController.js";

const router = express.Router();

router.post("/", validUser, accessChat);
router.get("/", validUser, fetchChats);
router.post("/group", validUser, createGroupChat);
router.put("/rename", validUser, renameGroup);
router.put("/groupadd", validUser, addToGroup);
router.put("/groupremove", validUser, removeFromGroup);

export default router;
