import { Request, Response } from "express";

interface MessageController {
  getUsers: (req: Request, res: Response) => void;
}

const messageController: MessageController = {
  getUsers: async (req, res) => {
    res.send("Get users");
  },
};

export default messageController;
