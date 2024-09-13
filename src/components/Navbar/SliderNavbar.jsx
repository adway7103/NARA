import React from "react";
import { Link } from "react-router-dom";

const SliderNavbar = ({ isOpen, toggleMenu }) => {
  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 overflow-scroll left-0 h-full w-full transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex h-full flex-col md:flex-row">
          {/* Menu Part */}
          <div className="w-full md:w-1/2 bg-[#f5f5e1] dark:!bg-black p-8 md:p-12">
            <div className="flex justify-between items-center">
              <button className="text-black dark:!text-white font-bold text-lg md:text-xl pl-0">
                Menu
              </button>
              <button
                className="text-black dark:!text-white font-bold text-lg md:text-xl px-3 py-3 border border-[#B5B5B5]"
                onClick={toggleMenu}>
                ✕
              </button>
            </div>
            <div className="mt-10 md:mt-14">
              <ul className="space-y-8 md:space-y-14">
                {/* Menu items */}
                <li>
                  <Link
                    to="/"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    01{" "}
                    <span
                      className="text-green-800 text-3xl md:text-5xl font-semibold not-italic pl-4 md:pl-7"
                      style={{ letterSpacing: "4px md:8px" }}>
                      HOME
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#shop"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    02
                    <span
                      className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8"
                      style={{ letterSpacing: "4px md:8px" }}>
                      OUR SHOP
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    03
                    <span
                      className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8"
                      style={{ letterSpacing: "4px md:8px" }}>
                      ABOUT US
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#behind"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    04
                    <span
                      className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8"
                      style={{ letterSpacing: "4px md:8px" }}>
                      BEHIND THE SCENE
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    05
                    <span
                      className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8"
                      style={{ letterSpacing: "4px md:8px" }}>
                      CONTACT US
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Content and Image Part */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex justify-center items-center bg-white dark:!bg-black relative">
            <div className="text-center md:text-left">
              <h1
                className="text-4xl md:text-6xl font-bold text-[#1F4A403B] dark:!text-[#D8E3B1] tracking-widest"
                style={{ letterSpacing: "12px md:24px", lineHeight: "1.2" }}>
                NEW AGE
              </h1>
              <div className="mt-4 md:mt-6 relative">
                <img
                  src="home/slider.png"
                  alt="Product"
                  className="w-full h-auto"
                />
                <h2
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-semibold text-white bg-opacity-50 px-4 py-2"
                  style={{ letterSpacing: "10px md:20px" }}>
                  REAL
                </h2>
              </div>
              <h1
                className="text-4xl md:text-6xl font-bold text-[#1F4A403B] dark:!text-[#D8E3B1] tracking-widest mt-4 md:mt-6"
                style={{ letterSpacing: "20px md:40px" }}>
                ATTIRE
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderNavbar;
