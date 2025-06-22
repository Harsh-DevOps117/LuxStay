import React from "react";
import Navbar5 from "@/Components/navbar-5"; // Assuming Navbar5 is designed for a dark/light theme already
import { Link } from "react-scroll";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const Page1 = () => {
  return (
    <div
      className="min-h-screen min-w-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-start font-sans text-gray-900 overflow-x-hidden pt-12"
      id="home"
    >
      {/* Navbar at the top - standard UX practice */}
      <Navbar5 />

      {/* Main content container. 
          Ensuring min-h to take up available space for vertical centering.
          'lg:items-center' will vertically center both left and right columns.
      */}
      <div className="max-w-screen-xl w-full px-6 lg:px-0 h-auto min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center lg:justify-between py-8 lg:py-0">
        {/* Left Section: Hero Content and Search - Now LEFT and VERTICALLY CENTERED */}
        {/* Changed justify-center to justify-start and added pt-16 to move content up slightly for left-center positioning */}
        <div className="flex-1 min-h-[50vh] lg:min-h-[auto] mb-10 lg:mb-0 p-4 sm:p-6 lg:p-0 flex flex-col justify-start pt-16 lg:pt-8 items-start text-left z-10 xl:mb-[10rem]">
          <div className="heading">
            {/* Heading text is naturally left-aligned due to parent. */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
              Inspiring
              <br />
              Locations
              <br />
              to Lodge
            </h1>
            {/* Paragraph text is naturally left-aligned. */}
            <p className="text-md sm:text-lg font-medium mt-3 text-gray-700 max-w-lg leading-relaxed">
              Create memorable travel moments by choosing a designer house with
              a warm ambiance as your accommodation.
            </p>
          </div>

          {/* Search Bar Section - now also left-aligned */}
          <Link
            to="Page2"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="mt-6 w-full max-w-sm flex items-center justify-center bg-black rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-gray-300 hover:scale-110"
          >
            <button
              className="flex items-center justify-center w-full px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50  transform transition-all duration-300"
              aria-label="Explore More"
            >
              Explore More
            </button>
          </Link>
        </div>

        {/* Right Section: Aesthetic Block Arrangement */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 flex-shrink-0">
          {/* Top Hero Image Card */}
          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transform transition-transform duration-500 hover:-translate-y-1">
            <img
              src="https://external-preview.redd.it/_IPMs180QDcnwnWOkNIhmgamF9pD1sJQLmo8IDOY-DQ.jpg?auto=webp&s=051c03c8e9c3b3040a21feb389ed1ff8412edd00"
              alt="Exceptional Properties in Stunning Surroundings"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                Exceptional Properties
                <br />
                Located in Stunning Surroundings
              </h2>
              <button className="self-start mt-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md text-black px-5 py-2 rounded-full text-sm font-semibold border border-white border-opacity-30 hover:bg-opacity-30 active:bg-opacity-40 transition-all duration-300 flex items-center group-hover:px-7 group-hover:py-2.5">
                <Link
                  activeClass="active"
                  to="Page2"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  Show More
                </Link>
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Grid of Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex flex-col justify-between h-[120px] sm:h-[140px] md:h-[160px] transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
              <h3 className="text-3xl sm:text-4xl font-extrabold">2,000+</h3>
              <p className="text-lg font-medium">Unique Places</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-[120px] sm:h-[140px] md:h-[160px] transform transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="https://th.bing.com/th/id/OIP.6UTg7f8xqThjtorqGjtACwHaFj?rs=1&pid=ImgDetMain&cb=idpwebpc2"
                alt="Recommended Places"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="text-base sm:text-lg font-bold">
                  Exotic Destinations
                </h3>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-[120px] sm:h-[140px] md:h-[160px] transform transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="https://i.pinimg.com/originals/81/5b/b6/815bb62d95c47e6c05b14c3fa415cf27.jpg"
                alt="Private Island Rentals"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="text-base sm:text-lg font-bold">
                  Private Island Rentals
                </h3>
              </div>
            </div>

            <div className="bg-gray-100 text-gray-900 p-4 rounded-2xl shadow-xl flex flex-col justify-between h-[120px] sm:h-[140px] md:h-[160px] transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="text-gray-600 mb-0.5">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
              <h3 className="text-base font-bold">Best Value</h3>
              <button className="self-start mt-0.5 text-gray-700 text-sm flex items-center hover:text-gray-900 transition-colors active:text-gray-800">
                Budget Friendly
                <svg
                  className="ml-1 w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Page2></Page2>
      <Page3></Page3>
      <Page4></Page4>
    </div>
  );
};

export default Page1;
