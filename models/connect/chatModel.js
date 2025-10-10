import { Schema, Types } from "mongoose";
import { getDB } from "../../config/db.js";

const chatSchema = Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage: {
            type: Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {
            type: Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const db = getDB("connect")
const Chat = db.model("Chat", chatSchema);

export default Chat