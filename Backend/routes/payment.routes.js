import express from "express";
import createOrder from "../controller/payment.controller.js";
import authPlugins from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/pay", authPlugins, createOrder);

export default router;
