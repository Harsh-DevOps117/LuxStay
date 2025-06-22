import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY, // ✅ typo fixed
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "luxstay", // Your Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export { cloudinary, storage };
