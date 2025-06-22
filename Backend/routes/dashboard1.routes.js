import express from "express";
import requireAuth from "../middleware/roleAuth.js";
import Booking from "../models/dash_book.models.js";
import Property from "../models/property.model.js";
import Login from "../models/login.models.js";

const router = express.Router();

router.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;

    // ✅ Get user's full name
    const user = await Login.findById(userId).select("fullName");
    const fullName = user?.fullName || "User";

    // ✅ Bookings made by the user
    const bookings = await Booking.find({ userId })
      .populate({
        path: "propertyId",
        select: "propertyTitle",
      })
      .sort({ bookedAt: -1 })
      .lean();

    const totalBookings = bookings.length;
    const upcomingStays = bookings.filter(
      (b) => new Date(b.bookedAt || b.checkIn) > new Date()
    ).length;
    const totalSpent = bookings.reduce((acc, b) => acc + (b.amount || 0), 0);

    // ✅ Hosted properties by the user
    const hostedProperties = await Property.find({ userId }).lean();
    const totalPropertiesListed = hostedProperties.length;

    // ✅ Calculate hosting earnings
    const hostedPropertyIds = hostedProperties.map((p) => p._id);

    const hostingBookings = await Booking.find({
      propertyId: { $in: hostedPropertyIds },
    });

    const totalHostingEarnings = hostingBookings.reduce(
      (acc, b) => acc + (b.amount || 0),
      0
    );

    // ✅ Final response
    return res.status(200).json({
      success: true,
      user: { fullName },
      dashboardStats: {
        totalBookings,
        upcomingStays,
        totalSpent,
        totalPropertiesListed,
        totalHostingEarnings,
      },
      bookings,
      hostedProperties,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: err.message,
    });
  }
});

export default router;
