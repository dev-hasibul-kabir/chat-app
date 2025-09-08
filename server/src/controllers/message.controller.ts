import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary";

interface MessageController {
  getUsers: (req: Request, res: Response) => void;
  getMessages: (req: Request, res: Response) => void;
  createMessage: (req: Request, res: Response) => void;
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
  createMessage: async (req, res) => {
    try {
      const myId = req.user._id;
      const { userId: recipientId } = req.params;
      const { text } = req.body;
      // Validate recipient ID
      if (!recipientId || !mongoose.Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ message: "Invalid recipient ID" });
      }
      // Validate recipient existence
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ message: "Recipient not found" });
      }

      const newMeessage = new Message({
        sender: myId,
        recipient: recipientId,
        text: text || "",
        image: req.cloudinaryResult.secure_url || undefined,
      });
      await newMeessage.save();
      /* todo: Emit the message to the recipient via WebSocket or any other real-time mechanism
      ...
      ...
      */
      res.status(201).json(newMeessage);
    } catch (error) {
      console.log("Error creating message:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default messageController;
