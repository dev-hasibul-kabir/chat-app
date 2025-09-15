import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary";
import { getSocketIdByUserId, io } from "../lib/socket-io";

interface MessageController {
  getUsers: (req: Request, res: Response) => void;
  getActiveChatPartner: (req: Request, res: Response) => void;
  getMessages: (req: Request, res: Response) => void;
  createMessage: (req: Request, res: Response) => void;
}

const messageController: MessageController = {
  getUsers: async (req, res) => {
    try {
      const myId = req.user._id;

      const searchQuery = req.query.search || "";
      const searchRegex = new RegExp(searchQuery as string, "i"); // Case-insensitive regex

      const users = await User.find({
        _id: { $ne: myId },
        $or: [{ name: searchRegex }, { email: searchRegex }],
      }).select("-password -createdAt -updatedAt");

      res.status(200).json(users);
    } catch (error) {
      console.log("Error fetching users:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getActiveChatPartner: async (req, res) => {
    try {
      const { userId: chatPartnerId } = req.params;
      const user = await User.findById(chatPartnerId).select(
        "-password -createdAt -updatedAt"
      );
      if (!user)
        return res.status(404).json({ message: "Chat partner not found" });
      res.status(200).json(user);
    } catch (error) {
      console.log("Error fetching active chat partner:", error);
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
        image: req.cloudinaryResult?.secure_url || undefined,
      });
      await newMeessage.save();

      //  Emit the message to the recipient via socket.io
      const receiverSocketId = getSocketIdByUserId(recipientId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMeessage);
      }
      //

      res.status(201).json(newMeessage);
    } catch (error) {
      console.log("Error creating message:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default messageController;
