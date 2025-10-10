import { Schema, Types } from "mongoose";
import { getDB } from "../../config/db.js";

const messageSchema = Schema(
    {
        sender: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        messageType: {
            type: String,
            enum: ["text", "image", "file", "video"],
            default: "text",
        },
        fileUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

const db = getDB("connect")
const Message = db.model("Message", messageSchema);

export default Message