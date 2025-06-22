import express from "express";
import { register, login, logout } from "../controller/auth.controller.js";
import { getMe } from "../controller/me.controller.js";
import requireAuth from "../middleware/roleAuth.js";
const router = express.Router();

import Login from "../models/login.models.js";

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", requireAuth, async (req, res) => {
  console.log("🍪 Cookies:", req.cookies); 
  const userId = req.user.userId;
  const user = await Login.findById(userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
});

export default router;
