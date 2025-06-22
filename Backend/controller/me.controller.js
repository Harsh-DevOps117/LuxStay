 const getMe = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ userId: decoded.userId });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { getMe };
