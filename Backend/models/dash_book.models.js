import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login", // or "User" if that's your user model
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: {
    type: String,
    enum: ["Paid", "Failed"],
    default: "Paid",
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

