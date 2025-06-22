// The file you provided is already clean and mostly production-ready.
// Here's the updated version with the following small improvements:
// ✅ Better type safety
// ✅ A fallback image for broken image URLs
// ✅ Minor tweaks to formatting and structure

import React, { useEffect, useState } from "react";
import axios from "axios"; // Optional: Can be removed if you only use `api`
import api from "@/axios";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";

const Page2 = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  type Room = {
    _id: string;
    propertyTitle: string;
    description: string;
    pricePerNight: number;
    imageUrls: string[];
    location: string;
    maxGuests: number;
    selectedAmenities: string[];
  };

  const [rooms, setRooms] = useState<Room[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [guestsFilter, setGuestsFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredRooms = rooms.filter((room) => {
    const matchesLocation = room.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());
    const matchesGuests =
      guestsFilter === "" || room.maxGuests >= parseInt(guestsFilter, 10);
    return matchesLocation && matchesGuests;
  });

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Room[]>("/fetch");
        setRooms(response.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to fetch rooms. Please try again later.");
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = async (
    roomId: string,
    propertyTitle: string,
    price: number
  ) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await api.post("/pay", {
        amount: price, // or room.pricePerNight
      });

      const { orderId, amount, currency } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount / 100,
        currency,
        name: "BookMyStay",
        description: `Booking for ${propertyTitle}`,
        image: "/logo.png",
        order_id: orderId,
        handler: async function (response: any) {
          toast.success("Razorpay Payment Successful");
          console.log("Razorpay Payment Response:", response);

          // Optional: Save payment to DB
          await api.post("/booking", {
            roomId, // from earlier
            amount,
            razorpay_order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
          });
        },
        prefill: {
          name: "Harsh Kharwar",
          email: "harsh@example.com",
          contact: "9999999999",
        },
        notes: {
          property_id: roomId,
        },
        theme: {
          color: "#1a202c",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong while creating payment");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center font-sans text-gray-900"
      id="Page2"
    >
      <div className="w-full max-w-3xl mt-5 mb-5 px-6">
        <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-2xl sm:rounded-full shadow-lg overflow-hidden">
          <div className="flex-1 p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-200">
            <label
              htmlFor="location"
              className="block text-xs font-semibold text-black uppercase mb-0.5"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Where are you going? (e.g., Goa)"
              className="w-full text-sm md:text-base placeholder-gray-400 focus:outline-none bg-transparent"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          <div className="flex-1 p-3 sm:p-4 flex items-center justify-between">
            <div>
              <label
                htmlFor="guests"
                className="block text-xs font-semibold text-black uppercase mb-0.5"
              >
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                placeholder="Add guests"
                className="w-full text-sm md:text-base placeholder-gray-400 focus:outline-none bg-transparent"
                value={guestsFilter}
                onChange={(e) => setGuestsFilter(e.target.value)}
              />
            </div>
            <button className="flex sm:hidden p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700">
              🔍
            </button>
          </div>

          <button className="hidden sm:flex items-center p-3 sm:p-4 bg-gray-800 text-white rounded-r-full hover:bg-gray-700">
            🔍 <span className="ml-2">Search</span>
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl w-full px-6 lg:px-0 pb-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Our Inspiring Room Selections
        </h2>

        {loading && (
          <p className="text-center text-lg mt-12">Loading rooms...</p>
        )}
        {error && (
          <p className="text-center text-red-600 text-lg mt-12">{error}</p>
        )}

        {!loading && !error && filteredRooms.length === 0 && (
          <p className="text-center text-black text-lg mt-12">
            No rooms found matching your search. Try another location or fewer
            guests.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <motion.div
              key={room._id}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 overflow-hidden">
                {room.imageUrls?.length > 0 ? (
                  <Carousel
                    showArrows
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    interval={5000}
                    transitionTime={500}
                    className="h-full"
                  >
                    {room.imageUrls.map((url, i) => (
                      <div key={i} className="h-48">
                        <img
                          src={url}
                          alt={`${room.propertyTitle} - ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/fallback.jpg";
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs rounded-full">
                  ₹{room.pricePerNight}/night
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold line-clamp-1">
                  {room.propertyTitle}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {room.description}
                </p>
                <p className="text-xs text-gray-600 mt-2">📍 {room.location}</p>
                <p className="text-xs text-gray-600">
                  👥 Max {room.maxGuests} guests
                </p>

                <div className="flex flex-wrap gap-1 mt-2 mb-4">
                  {room.selectedAmenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() =>
                    handleBookNow(
                      room._id,
                      room.propertyTitle,
                      room.pricePerNight
                    )
                  }
                  className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold text-sm hover:bg-gray-700"
                >
                  Easy Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page2;
