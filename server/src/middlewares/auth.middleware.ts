import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

export default async function authorizedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized! No token provided" });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.log("JWT secret not configured");
      return res.status(500).json({ message: "Internal server error" });
    }

    const decoded = jwt.verify(token, secretKey) as { userId: string };
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized! Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized! User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in authorize route middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
