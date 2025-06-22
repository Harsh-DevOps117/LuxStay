import Booking from "../models/dash_book.models.js";

const createBooking = async (req, res) => {
  try {
    const { roomId, amount, razorpay_order_id, razorpay_payment_id } = req.body;
    const userId = req.user.userId;

    const booking = new Booking({
      userId,
      propertyId: roomId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      status: "Paid",
    });

    await booking.save();

    res.status(200).json({ success: true, message: "Booking saved!" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Booking failed", error: err.message });
  }
};

export default createBooking;
