import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
    propertyTitle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    amount: {
      type: Number, // ✅ MUST be present
      required: true,
    },
    checkIn: Date,
    checkOut: Date,
    totalPrice: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
