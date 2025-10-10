import Chat from "../../models/connect/chatModel.js";
import Message from "../../models/connect/messageModel.js";


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
            .populate("sender", "name email profilePic")
            .populate("chat");

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    if (!chatId) return res.status(400).json({ message: "Chat ID is required" });

    try {
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name email profilePic")
            .populate("chat");

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
