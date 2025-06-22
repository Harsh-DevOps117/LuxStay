import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect_db;
