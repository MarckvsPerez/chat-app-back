import { Response } from "express";

import { AuthRequest } from "@/interfaces/express";
import { User } from "@/models/user.model";
import { log } from "@/utils/logs";
import { Message } from "@/models/message.model";
import cloudinary from "@/lib/cloudinary";

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const loggedInUserId = req.user?.id;
        const users = await User.find({ _id: { $ne: loggedInUserId } });
        return res.status(200).json(users);
    } catch (error) {
        log("❌ Error getting users", 'error', __dirname);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

export const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;
        const loggedInUserId = req.user?.id;

        const messages = await Message.find({ $or: [{ senderId: loggedInUserId, receiverId: userId }, { senderId: userId, receiverId: loggedInUserId }] });

        return res.status(200).json(messages);
    } catch (error) {
        log("❌ Error getting messages", 'error', __dirname);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { text, image } = req.body;
        const { userId } = req.params;
        const loggedInUserId = req.user?.id;

        let imageUrl = null;
        
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: loggedInUserId,
            receiverId: userId,
            text,
            image: imageUrl
        });

        const message = await newMessage.save();

        // TODO: Emit message to the receiver
        return res.status(200).json(message);
    } catch (error) {
        log("❌ Error sending message", 'error', __dirname);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

