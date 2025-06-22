import React, { FormEvent, useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import axios from "axios";
import api from "@/axios";
import toast from "react-hot-toast"; // Make sure react-hot-toast is installed

const ContactUsPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state

    try {
      const response = await api.post("/contact", formData);

      toast.success(response.data.message);

      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);

      if (error.response) {
        // Server-side error
        toast.error(
          error.response.data.message ||
            "Failed to send message. Please try again."
        );
      } else {
        // Network or unexpected error
        toast.error("Failed to send message. Check your internet connection.");
      }
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    // You might want to get the email value from the input here
    // For now, it just shows a toast.
    toast("Subscribed!"); // Changed from toast.success to generic toast()
    // In a real app, you'd send this email to a newsletter service
  };

  const reviews = [
    {
      id: 1,
      name: "Anjali Sharma",
      city: "Delhi",
      rating: 5,
      comment:
        "Absolutely loved my stay! The Luxury Ocean View Suite was breathtaking, and the service was impeccable. Highly recommend this place for a serene getaway.",
      date: "May 20, 2025",
    },
    {
      id: 2,
      name: "Rohit Kumar",
      city: "Mumbai",
      rating: 4,
      comment:
        "Great location and comfortable Executive City Skyline Room. The city views at night were stunning. Only wish the breakfast had more options.",
      date: "April 15, 2025",
    },
    {
      id: 3,
      name: "Priya Singh",
      city: "Bengaluru",
      rating: 5,
      comment:
        "The Exclusive Penthouse Loft exceeded all expectations. Modern, luxurious, and the panoramic views were incredible. A truly indulgent experience!",
      date: "March 10, 2025",
    },
    {
      id: 4,
      name: "Vikram Reddy",
      city: "Hyderabad",
      rating: 4,
      comment:
        "Charming Garden View Retreat was peaceful and relaxing. Perfect for unwinding. The staff was very courteous. Would visit again.",
      date: "February 28, 2025",
    },
    {
      id: 5,
      name: "Sneha Das",
      city: "Kolkata",
      rating: 5,
      comment:
        "Our family comfort suite in Ooty was perfect. Plenty of space for the kids and a cozy living area. Excellent amenities and great value!",
      date: "January 5, 2025",
    },
    {
      id: 6,
      name: "Arjun Mehta",
      city: "Chennai",
      rating: 4,
      comment:
        "Stayed at the Mountain View Cabin in Manali. The views were spectacular, and the cabin was very cozy. Some minor improvements in dining could make it perfect.",
      date: "December 1, 2024",
    },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans overflow-x-hidden">
      {/* Customer Reviews Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12">
          What Our Guests Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col"
            >
              <div className="flex items-center mb-4">
                {/* User Icon */}
                <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">{review.city}</p>
                </div>
              </div>
              <div className="flex items-center text-yellow-500 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      review.rating > i ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4 flex-grow">
                "{review.comment}"
              </p>
              <p className="text-xs text-gray-500 self-end">
                Reviewed on {review.date}
              </p>
            </div>
          ))}
        </div>
      </section>
      <hr className="my-12 border-gray-200" />{" "}
      {/* Added a horizontal rule for separation */}
      {/* Contact Us Section - Streamlined & Compact */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        <h1
          className="text-4xl sm:text-5xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight text-center"
          id="Page3"
        >
          Get in Touch
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-12 text-center max-w-2xl mx-auto">
          Have a question or suggestion? We'd love to hear from you!<br></br>
          <span className="font-bold text-yellow-500">No Login Required</span>
        </p>

        {/* Main contact block with two distinct panels, now more compact */}
        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Left Panel: Contact Information - Black & White Theme */}
          <div className="lg:w-1/2 p-8 md:p-10 bg-gray-900 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Contact Info</h2>
            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-6 h-6 mr-3 text-white flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Our Location</p>
                  <p className="text-gray-300 text-sm">
                    123 Grand Hotel Avenue, Varanasi, India
                  </p>
                </div>
              </div>
              {/* Call Us */}
              <div className="flex items-center">
                <FaPhone className="w-6 h-6 mr-3 text-white flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Call Us</p>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
              </div>
              {/* Email Us */}
              <div className="flex items-center">
                <FaEnvelope className="w-6 h-6 mr-3 text-white flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Email Us</p>
                  <p className="text-gray-300 text-sm">info@luxstay.com</p>
                </div>
              </div>
              {/* Working Hours */}
              <div className="flex items-center">
                <FaClock className="w-6 h-6 mr-3 text-white flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Working Hours</p>
                  <p className="text-gray-300 text-sm">24/7 Front Desk</p>
                </div>
              </div>
            </div>
            {/* Social Media within the dark panel */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-white">Connect</h3>
              <div className="flex space-x-5">
                <a
                  href="https://www.instagram.com/yourhotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
                >
                  {/* Changed Instagram icon to match theme */}
                  <FaInstagram className="w-7 h-7" />
                </a>
                <a
                  href="https://twitter.com/yourhotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
                >
                  <FaTwitter className="w-7 h-7" />
                </a>
                <a
                  href="https://www.facebook.com/yourhotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
                >
                  {/* Changed Facebook icon to match theme */}
                  <FaFacebook className="w-7 h-7" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Contact Form - Black & White Theme */}
          <div className="lg:w-1/2 p-8 md:p-10 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send a Message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {" "}
              {/* onSubmit on form tag */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name} // Controlled component
                  onChange={handleChange} // Handle change
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900"
                  placeholder="Your Full Name"
                  required // Added required attribute for basic validation
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email} // Controlled component
                  onChange={handleChange} // Handle change
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900"
                  placeholder="Your Email Address"
                  required // Added required attribute
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject" // Added name attribute
                  value={formData.subject} // Controlled component
                  onChange={handleChange} // Handle change
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900"
                  placeholder="Regarding your inquiry..."
                  required // Added required attribute
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message} // Controlled component
                  onChange={handleChange} // Handle change
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 text-gray-900"
                  placeholder="Tell us how we can help you..."
                  required // Added required attribute
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting} // Disable button when submitting
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <hr className="my-12 border-gray-200" />{" "}
      {/* Added a horizontal rule for separation */}
      {/* Refined Black & White Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle Motion Background (requires CSS definitions in your global stylesheet) */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          {/* Ensure animate-gradient-shift and bg-repeating-linear-gradient are defined in your global CSS */}
          <div className="animate-gradient-shift w-full h-full bg-repeating-linear-gradient"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Brand/About */}
          <div>
            <h3 className="text-3xl font-extrabold mb-4 text-white">LuxStay</h3>
            <p className="text-gray-400 text-sm mb-4">
              Where luxury meets serenity. Crafting unforgettable experiences in
              the heart of incredible destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Our Rooms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Special Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Hotel Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Hotel Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Concierge
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Dining Options
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Event Spaces
                </a>
              </li>
              <li>
                <a
                  href="#"
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Wellness & Spa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Airport Shuttle
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and updates!
            </p>
            <form className="flex" onSubmit={handleNewsletterSubmit}>
              {" "}
              {/* Added onSubmit to newsletter form */}
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow p-3 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="submit"
                className="bg-gray-700 text-white p-3 rounded-r-md font-semibold hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="relative z-10 text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-700 border-opacity-50">
          &copy; {new Date().getFullYear()} LuxStay. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ContactUsPage;
