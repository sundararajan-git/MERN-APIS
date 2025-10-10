import express from "express";
import { getContacts } from "../../controllers/connect/userController.js";

const router = express.Router();

router.get("/contacts", getContacts);

export default router;
