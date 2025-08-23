import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import mongoose from "mongoose";

interface MessageController {
  getUsers: (req: Request, res: Response) => void;
  getMessages: (req: Request, res: Response) => void;
}

const messageController: MessageController = {
  getUsers: async (req, res) => {
    try {
      const myId = req.user._id;

      const users = await User.find({ _id: { $ne: myId } }).select(
        "-password -createdAt -updatedAt"
      );
      res.status(200).json(users);
    } catch (error) {
      console.log("Error fetching users:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getMessages: async (req, res) => {
    try {
      const myId = req.user._id;
      const { userId: chatPartnerId } = req.params;

      // Validate chat partner ID
      if (!chatPartnerId || !mongoose.Types.ObjectId.isValid(chatPartnerId)) {
        return res.status(400).json({ message: "Invalid chat partner ID" });
      }
      // Validate chat partner existence
      const partner = await User.findById(chatPartnerId);
      if (!partner) {
        return res.status(404).json({ message: "Chat partner not found" });
      }

      // Fetch messages between the authenticated user and the chat partner
      const messages = await Message.find({
        $or: [
          { sender: myId, recipient: chatPartnerId },
          { sender: chatPartnerId, recipient: myId },
        ],
      }).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order

      res.status(200).json(messages);
    } catch (error) {
      console.log("Error fetching messages:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default messageController;
