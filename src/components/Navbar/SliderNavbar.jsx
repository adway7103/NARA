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
          <div className="w-full md:w-1/2 bg-[#f5f5e1] dark:!bg-black pt-8 px-8 md:p-12">
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
                    <span className="text-green-800 text-3xl md:text-5xl font-semibold not-italic pl-2 md:pl-5 md:tracking-widest">
                      HOME
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#shop"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    02
                    <span className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8 md:tracking-widest">
                      OUR SHOP
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    03
                    <span className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8 md:tracking-widest">
                      ABOUT US
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#behind"
                    className="text-lg md:text-xl  text-[#5D5D5D] italic">
                    04
                    <span className="text-3xl md:text-5xl font-semibold text-black dark:!text-[#D8E3B1] not-italic pl-4 md:pl-8 md:tracking-widest">
                      BEHIND THE SCENE
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:fixed bottom-0 left-0 w-full text-black pb-6 pt-10 md:p-10 md:pl-12">
              <div className="flex md:space-x-3 space-x-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src="home/navbar/fb.svg" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src="home/navbar/insta.svg" />
                </a>
                <div className="flex items-center space-x-1  md:space-x-2  bg-white px-2 rounded-xl ">
                  <a
                    href="mailto:firstname.lastname@gmail.com"
                    className="text-black text-xs md:text-[16px] font-sans font-medium">
                    firstname.lastname@gmail.com
                  </a>
                  <img src="home/navbar/file.svg" />
                </div>
              </div>
            </div>
            {/* <div className="fixed bottom-0 left-0 w-full text-black p-10 pl-12">
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src="home/navbar/fb.svg" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src="home/navbar/insta.svg" />
                </a>
                <div className="flex items-center space-x-2 bg-white rounded-xl px-3">
                  <a
                    href="mailto:firstname.lastname@gmail.com"
                    className="text-black dark:text-white">
                    firstname.lastname@gmail.com
                  </a>
                  <img src="home/navbar/file.svg" />
                </div>
              </div>
            </div> */}
          </div>
          {/* Content and Image Part */}
          <div className="w-full md:w-1/2 p-10 md:p-8 flex justify-center items-center bg-white dark:!bg-black relative">
            <div className="text-center ">
              <h1
                className="text-4xl md:text-6xl font-extrabold text-[#1F4A403B] dark:!text-[#D8E3B1] tracking-[0.60em] md:tracking-[0.40em]"
                style={{ lineHeight: "1.2" }}>
                NEW AGE
              </h1>
              <div className="mt-2 relative">
                <img
                  src="home/slider.svg"
                  alt="Product"
                  className="w-full h-auto"
                />
                <h2
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-semibold text-white bg-opacity-50 px-4 py-2"
                  style={{ letterSpacing: "20px" }}>
                  REAL
                </h2>
              </div>
              <h1 className="text-4xl md:text-6xl pl-4 md:pl-6 font-extrabold text-[#1F4A403B] dark:!text-[#D8E3B1] mt-2 tracking-[0.74em] md:tracking-[0.60em]">
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
