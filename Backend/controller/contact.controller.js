import contactModel from "../models/ContactUs.models.js";

const contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new contactModel({ name, email, message });
    await contact.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export default contactUs;
