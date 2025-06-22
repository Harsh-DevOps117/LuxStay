import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import api from "@/axios";

// --- Keep only the FullScreenLoader import, assuming this is your desired component ---
import FullScreenLoader from "../Components/Loader"; // Ensure this path is correct

import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
  FaBath,
  FaUpload,
  FaChevronDown,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaSnowflake,
  FaFire,
  FaRupeeSign,
} from "react-icons/fa";
import { LuSofa } from "react-icons/lu";

interface AmenityOption {
  name: string;
  icon?: JSX.Element;
}

const HostPage: React.FC = () => {
  const [propertyTitle, setPropertyTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [maxGuests, setMaxGuests] = useState<number>(1);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [pricePerNight, setPricePerNight] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Already defined, good!

  const amenitiesOptions: AmenityOption[] = [
    { name: "Wi-Fi", icon: <FaWifi /> },
    { name: "Parking", icon: <FaParking /> },
    { name: "Pool", icon: <FaSwimmingPool /> },
    { name: "AC", icon: <FaSnowflake /> },
    { name: "Heating", icon: <FaFire /> },
    { name: "Kitchen", icon: <LuSofa /> },
    { name: "Washer", icon: <FaHome /> },
    { name: "TV", icon: <FaHome /> },
  ];

  const handleAmenityChange = (amenityName: string) => {
    setSelectedAmenities((prevAmenities) =>
      prevAmenities.includes(amenityName)
        ? prevAmenities.filter((name) => name !== amenityName)
        : [...prevAmenities, amenityName]
    );
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setValidationError(null); // Clear previous errors

      // Image validation
      if (newFiles.length === 0) {
        setValidationError("Please select at least one image.");
        setImageFiles([]);
        return;
      }
      if (newFiles.length > 5) {
        setValidationError("You can upload a maximum of 5 images.");
        setImageFiles([]);
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      for (const file of newFiles) {
        if (!allowedTypes.includes(file.type)) {
          setValidationError(
            "Only JPG, PNG, and GIF image formats are allowed."
          );
          setImageFiles([]);
          return;
        }
        if (file.size > maxSize) {
          setValidationError(
            `Image "${file.name}" is too large. Maximum size is 5MB.`
          );
          setImageFiles([]);
          return;
        }
      }

      setImageFiles(newFiles);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      setValidationError("Please upload at least one image for your property.");
      return;
    }
    if (imageFiles.length > 5) {
      setValidationError("You can upload a maximum of 5 images.");
      return;
    }

    setIsLoading(true); // Start loading
    setValidationError(null);

    const formData = new FormData();
    formData.append("propertyTitle", propertyTitle);
    formData.append("location", location);
    formData.append("propertyType", propertyType);
    formData.append("maxGuests", String(maxGuests));
    formData.append("bedrooms", String(bedrooms));
    formData.append("bathrooms", String(bathrooms));
    formData.append("pricePerNight", pricePerNight);
    formData.append("description", description);
    selectedAmenities.forEach((amenity) =>
      formData.append("selectedAmenities", amenity)
    );
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await api.post("/host", formData); // uses baseURL from .env
      toast.success("Property added successfully!");

      // Clear form only after successful post
      setPropertyTitle("");
      setLocation("");
      setPropertyType("");
      setMaxGuests(1);
      setBedrooms(1);
      setBathrooms(1);
      setPricePerNight("");
      setDescription("");
      setSelectedAmenities([]);
      setImageFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* --- RENDER THE FULL SCREEN LOADER HERE --- */}
      {/* We are using FullScreenLoader, assuming that's the one you want */}
      <FullScreenLoader isLoading={isLoading} />

      <div
        className="min-h-screen min-w-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans overflow-x-hidden"
        id="host"
      >
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight text-center">
            Become a Host
          </h1>
          <p className="text-md sm:text-lg text-gray-700 mb-10 text-center max-w-xl mx-auto">
            Share your unique space and earn. It's simple, secure, and
            rewarding!
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              List Your Property
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Property Title */}
              <div>
                <label
                  htmlFor="propertyTitle"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Property Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="propertyTitle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                    placeholder="e.g., Cozy Beachfront Villa"
                    value={propertyTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPropertyTitle(e.target.value)
                    }
                    required
                    disabled={isLoading}
                  />
                  <FaHome className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                </div>
              </div>
              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                    placeholder="e.g., Goa, India"
                    value={location}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setLocation(e.target.value)
                    }
                    required
                    disabled={isLoading}
                  />
                  <FaMapMarkerAlt className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                </div>
              </div>
              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Property Type
                </label>
                <div className="relative">
                  <select
                    id="propertyType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                    value={propertyType}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setPropertyType(e.target.value)
                    }
                    required
                    disabled={isLoading}
                  >
                    <option value="" disabled>
                      Select a property type
                    </option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Cabin">Cabin</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Other">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-base" />
                </div>
              </div>
              {/* Guests, Bedrooms, Bathrooms in a Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="maxGuests"
                    className="block text-gray-700 text-sm font-semibold mb-1"
                  >
                    Max Guests
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="maxGuests"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                      min="1"
                      value={maxGuests}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setMaxGuests(parseInt(e.target.value) || 1)
                      }
                      required
                      disabled={isLoading}
                    />
                    <FaUsers className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bedrooms"
                    className="block text-gray-700 text-sm font-semibold mb-1"
                  >
                    Bedrooms
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="bedrooms"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                      min="1"
                      value={bedrooms}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBedrooms(parseInt(e.target.value) || 1)
                      }
                      required
                      disabled={isLoading}
                    />
                    <FaBed className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bathrooms"
                    className="block text-gray-700 text-sm font-semibold mb-1"
                  >
                    Bathrooms
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="bathrooms"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                      min="1"
                      value={bathrooms}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBathrooms(parseInt(e.target.value) || 1)
                      }
                      required
                      disabled={isLoading}
                    />
                    <FaBath className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  </div>
                </div>
              </div>
              {/* Amenities Checkboxes */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  {amenitiesOptions.map((amenity) => (
                    <label
                      key={amenity.name}
                      className="flex items-center text-gray-800 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-gray-900 rounded focus:ring-gray-700 transition-colors duration-200"
                        checked={selectedAmenities.includes(amenity.name)}
                        onChange={() => handleAmenityChange(amenity.name)}
                        disabled={isLoading}
                      />
                      <span className="ml-2 flex items-center">
                        {amenity.icon && (
                          <span className="mr-1 text-gray-600 text-base">
                            {amenity.icon}
                          </span>
                        )}
                        {amenity.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 text-sm"
                  placeholder="Describe your property, its unique features, and what guests can expect..."
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  required
                  disabled={isLoading}
                ></textarea>
              </div>
              {/* Price per Night */}
              <div>
                <label
                  htmlFor="pricePerNight"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Price Per Night <br></br>Enter the price{" "}
                  <span className="text-yellow-500 font-semibold">
                    carefully
                  </span>{" "}
                  as it can only be set once to avoid discrepancies.
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="pricePerNight"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pl-8 text-sm"
                    min="0"
                    step="any"
                    value={pricePerNight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPricePerNight(e.target.value)
                    }
                    required
                    disabled={isLoading}
                  />
                  <FaRupeeSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                </div>
              </div>
              {/* Image Upload Area */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Property Images
                </label>
                <div
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 p-4
                           ${
                             isLoading
                               ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                               : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                           }`}
                  onClick={() =>
                    !isLoading &&
                    document.getElementById("imageUpload")?.click()
                  }
                >
                  <FaUpload className="w-10 h-10 mb-2 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-500 text-center">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    ( Only 5 images, max 5MB per image, JPG, PNG, GIF)
                  </p>
                  {imageFiles.length > 0 && (
                    <div className="mt-2 text-sm text-gray-700">
                      <p className="font-semibold">Selected Images:</p>
                      <ul className="list-disc list-inside">
                        {imageFiles.map((file, index) => (
                          <li key={index} className="text-xs">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <input
                    id="imageUpload"
                    type="file"
                    name="images"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/jpeg,image/png,image/gif"
                    disabled={isLoading}
                  />
                </div>
                {validationError && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {validationError}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 px-6 rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md text-base
                           disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Uploading Property..." : "List My Property"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default HostPage;
