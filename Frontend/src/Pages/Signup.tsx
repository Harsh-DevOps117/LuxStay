import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FaEnvelope, FaLock, FaUser, FaGoogle } from "react-icons/fa";
import signupUser from "@/axios_singup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signupUser(fullName, email, password);
      toast.success(res.message + " Redirecting to login page..."); // Update toast message
      // Redirect to login page on successful signup
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  // const handleGoogleSignUp = () => {
  //   console.log("Initiating Google Sign-Up...");
  //   alert(
  //     "Google Sign-Up functionality not implemented. This would redirect to Google OAuth."
  //   );
  //   // In a real application, this would typically involve redirecting the user
  //   // to Google's authentication flow or using a service like Firebase Authentication.
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans px-4">
      <div className="text-center bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 max-w-sm mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Join LuxStay
        </h1>
        <p className="text-md text-gray-600 mb-8">
          Create your account today and start your journey!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                required
              />
              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                placeholder="Email Address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900 pr-9 text-sm"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
              <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 px-6 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-base shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Separator */}
        {/* <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div> */}

        {/* Google Sign-Up Button */}

        {/* Link to Login Page */}
        <p className="text-sm text-gray-600 mt-6">
          Already have an account?
          <a
            href="/login" // Assuming your login page is at /login
            className="ml-1 font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
