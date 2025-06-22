import User from "../models/login.models.js";
import Property from "../models/property.model.js";
import Booking from "../models/booking.models.js";

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("fullName");

    // 1. Get user's hosted properties
    const hostedProperties = await Property.find({ userId }).lean();
    const hostedPropertyIds = hostedProperties.map((p) => p._id.toString());

    // 2. Bookings made by user (as guest)
    const myBookings = await Booking.find({ userId })
      .populate("propertyId")
      .lean();

    const totalBookings = myBookings.length;
    const upcomingStays = myBookings.filter(
      (b) => new Date(b.bookedAt || b.checkIn) > new Date()
    ).length;

    const totalSpent = myBookings.reduce(
      (sum, b) => sum + (b.amount || b.totalPrice || 0),
      0
    );

    // 3. Bookings received on properties hosted by this user
    const bookingsOnHostedProps = await Booking.find({
      propertyId: { $in: hostedPropertyIds },
    }).lean();

    const totalHostingEarnings = bookingsOnHostedProps.reduce(
      (sum, b) => sum + (b.amount || b.totalPrice || 0),
      0
    );

    // 4. Return response
    return res.status(200).json({
      success: true,
      user: { fullName: user.fullName },
      dashboardStats: {
        totalBookings,
        upcomingStays,
        totalSpent,
        totalPropertiesListed: hostedProperties.length,
        totalHostingEarnings,
      },
      bookings: myBookings,
      hostedProperties,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: err.message,
    });
  }
};

export default getDashboardData;
