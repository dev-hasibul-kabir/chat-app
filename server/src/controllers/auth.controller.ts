import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateJWT from "../lib/utils/genJWT";

interface AuthController {
  login: (req: Request, res: Response) => void;
  register: (req: Request, res: Response) => void;
  logout: (req: Request, res: Response) => void;
}

const authController: AuthController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      }) as typeof User.prototype;

      if (newUser) {
        generateJWT(newUser._id, res);
        await newUser.save();
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      } else {
        return res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error during registration:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  login: (req, res) => {
    // Logic for user login
    res.send("User logged in");
  },

  logout: (req, res) => {
    // Logic for user logout
    res.send("User logged out");
  },
};

export default authController;
