import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  }
  ,email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model("Login", loginSchema);

export default Login;
