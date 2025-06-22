import express from "express";
import requireAuth from "../middleware/roleAuth.js";
import createBooking from "../controller/booking.controller.js";

const router = express.Router();

router.post("/booking", requireAuth, createBooking);

export default router;
