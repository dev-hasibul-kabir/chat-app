import multer from "multer";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../lib/cloudinary";

// Extend Express Request to include cloudinaryResult
declare module "express-serve-static-core" {
  interface Request {
    cloudinaryResult?: any;
  }
}

// Temp storage
const upload = multer({ dest: "public/uploads/" });

export const fileUpload = (fieldName: string) => {
  return [
    upload.single(fieldName),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        // clear local server file
        fs.unlinkSync(req.file.path);

        req.cloudinaryResult = result;

        next();
      } catch (err: any) {
        return res.status(500).json({ error: err.message });
      }
    },
  ];
};
