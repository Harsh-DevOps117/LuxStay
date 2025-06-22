import React, { useEffect, useState } from "react";
import api from "@/axios";
import axios from "axios";
import {
  ArrowLeft,
  Home,
  CalendarDays,
  CreditCard,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hostedProperties, setHostedProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/dashboard"); // ✅ baseURL + withCredentials already handled
        console.log(res.data);
        setUser(res.data.user);
        setStats(res.data.dashboardStats);
        setBookings(res.data.bookings || []);
        setHostedProperties(res.data.hostedProperties || []);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      await api.delete(`/property/${propertyId}`); // baseURL & credentials already set

      // Remove from UI
      setHostedProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );

      // Optionally update stats
      setStats((prev: any) => ({
        ...prev,
        totalPropertiesListed: prev.totalPropertiesListed - 1,
      }));
    } catch (err) {
      console.error("Failed to delete property", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={18} /> Home
        </button>
      </div>

      {/* Welcome */}
      <div className="bg-white shadow-md p-5 rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Hello, {user?.fullName || "User"}!
        </h2>
        <p className="text-sm text-gray-600">
          Welcome to your dashboard. Here you can view your bookings, upcoming
          stays, and total spent.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm">
          <Home size={20} className="mx-auto mb-2 text-gray-600" />
          <p className="text-lg font-bold">{stats?.totalBookings || 0}</p>
          <p className="text-sm text-gray-600">Total Bookings</p>
        </div>

        {/* <div className="bg-gray-900 text-white p-4 rounded-lg text-center shadow-sm">
          <CalendarDays size={20} className="mx-auto mb-2" />
          <p className="text-lg font-bold">{stats?.upcomingStays || 0}</p>
          <p className="text-sm">Upcoming Stays</p>
        </div> */}

        <div className="bg-white p-4 rounded-lg text-center shadow-sm">
          <CreditCard size={20} className="mx-auto mb-2 text-gray-600" />
          <p className="text-lg font-bold">
            ₹{(stats?.totalHostingEarnings / 100 || 0).toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-600">
            Earnings from Hosted Properties
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm">
          <CreditCard size={20} className="mx-auto mb-2 text-gray-600" />
          <p className="text-lg font-bold">
            ₹{(stats?.totalSpent / 100 || 0).toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-600">Total Spent</p>
        </div>
      </div>

      {/* Hosted Properties */}
      {stats?.totalPropertiesListed !== undefined && (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase size={24} className="text-gray-700" /> Hosted Listings
          </h3>
          <p className="text-gray-700 text-lg mb-4">
            You have listed {hostedProperties.length}{" "}
            {hostedProperties.length === 1 ? "property" : "properties"}.
          </p>

          <div className="space-y-3">
            {hostedProperties.map((property) => (
              <div
                key={property._id}
                className="flex justify-between items-center p-4 bg-gray-50 border rounded-md"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {property.propertyTitle}
                  </p>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
                <button
                  onClick={() => handleDeleteProperty(property._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      {bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Recent Bookings
          </h3>
          <div className="space-y-4">
            {bookings?.map((booking, index) => (
              <div key={index} className="bg-white p-4 rounded shadow border">
                <p className="text-sm text-gray-500">Booking #{index + 1}</p>
                <p className="text-lg font-semibold">
                  {booking?.propertyId?.propertyTitle || "Unknown Property"}
                </p>
                <p className="text-gray-700">
                  ₹{(booking?.amount / 100 || 0).toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(booking.bookedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverviewPage;
