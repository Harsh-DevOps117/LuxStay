import User from "../models/login.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in secure httpOnly cookie
   res.setHeader("Set-Cookie", cookie.serialize("token", token, {
   httpOnly: true,
   secure: true,         // ✅ false for localhost, true for HTTPS production (like Vercel)
   sameSite: "Lax",       // ✅ allows cross-origin cookies on navigation and fetch
   maxAge: 60 * 60 * 24,  // 1 day
   path: "/",
   }));


    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.setHeader("Set-Cookie", cookie.serialize("token", "", {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 0,
  path: "/",
  }));

  res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, logout };
