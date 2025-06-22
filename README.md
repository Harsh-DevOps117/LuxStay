# 🌟 LuxStay – Your AI-Powered Smart Booking Platform

**LuxStay** is a full-featured hotel and property booking platform where users can **book dream stays**, **host their own properties**, and even **chat with an AI-powered travel assistant**. Whether you're a traveler looking for the next destination or a host ready to monetize your space, LuxStay does it all — with style.

> ✨ First full-stack MERN project made by me.

---

## 🚀 Core Features

### 👤 User Authentication & Roles
- Secure **JWT-based login** with persistent cookies.
- Seamless **role management** for guests and hosts.

### 🏠 Host Your Property
- Upload a listing with title, location, price, and images.
- Set amenities, capacity, and property type.
- Images are stored securely via **Cloudinary**.

### 📅 Book Stays Instantly
- View available properties with images and details.
- **Razorpay integration** for real-time payments.
- Booking data saved and shown in personalized dashboard.

### 🧠 GenAI Travel Chatbot
- Type in any city and get:
  - 🗺️ **Top 3 Tourist Spots**
  - 🏛️ **2 Historical Landmarks**
  - 🪩 **2 Nightlife Hotspots**
  - 🍽️ **Famous Local Foods to Try**
- Powered by **OpenRouter + Mistral AI** with a fun tone and emoji-based formatting.

### 📊 Dynamic User Dashboard
- See your:
  - Total bookings
  - Upcoming stays
  - Total spent
  - Hosted properties
  - Earnings from hosted listings

---

## 🛠️ Tech Stack

| Layer         | Technology                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **Frontend**  | React, Vite, Tailwind CSS, Framer Motion, React Carousel, React Hot Toast  |
| **Backend**   | Node.js, Express, MongoDB, Mongoose, JWT, Cookie-Parser                     |
| **Payments**  | Razorpay                                             |
| **Image Uploads** | Cloudinary , Multer                                                          |
| **AI Chatbot**| OpenRouter (Mistral model via fetch)                                       |

---

## 🔐 Auth & Security

- JWT-based auth with `httpOnly` cookies for secure sessions.
- Role-based access (user vs host).
- Backend protected routes via `requireAuth` middleware.

---

## 🧠 AI Chat Assistant Example

Ask: `"Tell me cool things in Jaipur"`

You get:

- 🗺️ **Top 3 Tourist Attractions**: Hawa Mahal, Amer Fort, Jal Mahal  
- 🏛️ **Historical Sites**: City Palace, Nahargarh Fort  
- 🪩 **Nightlife**: Blackout Club, Club Naila  
- 🍛 **Must-Eat**: Dal Baati Churma, Laal Maas

---


