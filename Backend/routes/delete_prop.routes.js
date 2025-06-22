import express from "express";
import Property from "../models/property.model.js";
import requireAuth from "../middleware/roleAuth.js";

const router = express.Router();

router.delete("/property/:id", requireAuth, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId, // secure delete
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

export default router;
