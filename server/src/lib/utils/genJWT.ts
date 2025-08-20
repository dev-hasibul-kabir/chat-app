import { Response } from "express";
import jwt from "jsonwebtoken";

export default function generateJWT(userId: string, res: Response): string {
  const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production ex. http | https. locallhost in development
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
}
