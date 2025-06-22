import PropertyModel from "../models/property.model.js";

const hostProperty = async (req, res) => {
  try {
    if (!req.body || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Missing form data or images" });
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

    const amenitiesArray = Array.isArray(selectedAmenities)
      ? selectedAmenities
      : [selectedAmenities];

    // ✅ Get secure Cloudinary URLs directly
    const imageUrls = req.files.map((file) => file.path);

    const newProperty = new PropertyModel({
      userId: req.user.userId || "6631f8a0c82b6f29c86f2cb2", // fallback for testing
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
