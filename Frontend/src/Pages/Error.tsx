import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans px-4">
      <div className="text-center bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
        <h1 className="text-9xl font-extrabold text-gray-900 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/" // Link back to the home page (you can adjust this path)
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
