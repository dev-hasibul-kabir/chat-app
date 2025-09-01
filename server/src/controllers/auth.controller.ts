import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateJWT from "../lib/utils/genJWT";
import cloudinary from "../lib/cloudinary";

interface AuthController {
  login: (req: Request, res: Response) => void;
  register: (req: Request, res: Response) => void;
  logout: (req: Request, res: Response) => void;
  getProfile: (req: Request, res: Response) => void;
  updateProfile: (req: Request, res: Response) => void;
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
        generateJWT(String(newUser._id), res);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      } else {
        return res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error during registration:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      generateJWT(String(user._id), res);
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.log("Error during login:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  logout: (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.log("Error during logout:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log("Error getting profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const result = req.cloudinaryResult;
      const userId = req.user._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: result.secure_url },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error updating profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default authController;
