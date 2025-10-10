import Chat from "../../models/connect/chatModel.js";
import Message from "../../models/connect/messageModel.js";

export const accessChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    try {
        let chat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [req.userId, userId] },
        })
            .populate("users", "-password")
            .populate("latestMessage");

        if (!chat) {
            chat = await Chat.create({
                chatName: "sender",
                isGroupChat: false,
                users: [req.userId, userId],
            });
            chat = await Chat.findById(chat._id).populate("users", "-password");
        }

        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.userId } },
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate({
                path: "latestMessage",
                populate: { path: "sender", select: "name email" },
            })
            .sort({ updatedAt: -1 });

        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createGroupChat = async (req, res) => {
    const { users, name } = req.body;

    if (!users || !name)
        return res.status(400).json({ message: "Please fill all fields" });

    if (users.length < 2)
        return res
            .status(400)
            .json({ message: "Group must have at least 3 users including you" });

    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: [...users, req.userId],
            isGroupChat: true,
            groupAdmin: req.userId,
        });

        const fullGroupChat = await Chat.findById(groupChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(201).json(fullGroupChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId)
        return res.status(400).json({ message: "Invalid data" });

    try {
        let message = await Message.create({
            sender: req.userId,
            content,
            chat: chatId,
        });

        message = await message
            .populate("sender", "name email")
            .populate("chat");

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
