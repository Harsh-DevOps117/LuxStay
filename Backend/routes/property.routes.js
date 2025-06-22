import express from "express";
import hostProperty from "../controller/host.controller.js"; // adjust path as needed
import upload from "../utils/multer.utils.js"; // middleware for handling file uploads
import roleAuth from "../middleware/roleAuth.js";

const router = express.Router();

// Route to create a new property
router.post("/host", roleAuth, upload.array("images", 5), hostProperty);

export default router;
