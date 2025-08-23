import { Request, Response } from "express";
import User from "../models/user.model";

interface MessageController {
  getUsers: (req: Request, res: Response) => void;
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
};

export default messageController;
