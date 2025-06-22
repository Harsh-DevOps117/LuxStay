import uploadImage from "../utils/cloudinary.utils.js";
import PropertyModel from "../models/property.model.js";

const hostProperty = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing form data" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const {
      propertyTitle,
      location,
      propertyType,
      maxGuests,
      bedrooms,
      bathrooms,
      description,
      pricePerNight,
      selectedAmenities,
    } = req.body;

    // Ensure selectedAmenities is always an array
    const amenitiesArray = Array.isArray(selectedAmenities)
      ? selectedAmenities
      : [selectedAmenities];

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map((file) => uploadImage(file.path));
    const cloudinaryResults = await Promise.all(imageUploadPromises);
    const imageUrls = cloudinaryResults.map((result) => result.secure_url);

    // ✅ Create new property document
    const newProperty = new PropertyModel({
      userId: req.user.userId || "6631f8a0c82b6f29c86f2cb2", // temp fallback for now
      propertyTitle,
      location,
      propertyType,
      maxGuests,
      bedrooms,
      bathrooms,
      description,
      pricePerNight,
      selectedAmenities: amenitiesArray,
      imageUrls,
    });

    await newProperty.save();

    res.status(201).json({ message: "Property hosted successfully" });
  } catch (error) {
    console.error("Host property error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default hostProperty;
