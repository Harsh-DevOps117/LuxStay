import mongoose from "mongoose";
import Login from "./login.models.js";

const propertySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login", // assuming you have a "User" or "Login" schema
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["House", "Apartment", "Villa", "Cabin", "Bungalow", "Other"],
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    selectedAmenities: {
      type: [String], // array of amenity strings like ["Wi-Fi", "TV", "Kitchen"]
      required: true,
    },
    imageUrls: {
      type: [String], // array of image URLs from Cloudinary
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);
