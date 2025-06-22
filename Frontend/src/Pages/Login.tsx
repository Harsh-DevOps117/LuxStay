import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import loginUser from "@/login";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password); // loginUser already has withCredentials

      toast.success(res.message || "Login successful");
      navigate("/"); // Redirect to home page or dashboard
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans px-4">
      <div className="text-center bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 max-w-sm mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Welcome Back!
        </h1>
        <p className="text-md text-gray-600 mb-8">Log in to your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm"
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

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm"
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

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 px-6 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-gray-900 hover:text-gray-700"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
