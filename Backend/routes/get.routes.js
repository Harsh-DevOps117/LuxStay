import express from "express";
import PropertyModel from "../models/property.model.js";

const router = express.Router();

// Fetch all properties
router.get("/fetch", async (req, res) => {
  try {
    const properties = await PropertyModel.find();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

export default router;
