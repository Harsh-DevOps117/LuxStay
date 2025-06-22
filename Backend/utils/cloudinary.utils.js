import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// ✅ FIX: Typo in API_SECRET (was: API_SECREAT)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // auto-detects images, videos, etc.
    });

    // Optional: delete the local file after upload
    fs.unlinkSync(filePath);

    console.log("Upload successful:", result.secure_url); // prefer secure_url over url
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error("Upload failed:", error);
    return null;
  }
};

export default uploadImage;
