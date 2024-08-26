import React, { useState } from "react";
import SliderNavbar from "./SliderNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white md:px-10 px-4 py-4 bg-opacity-80">
        <div className="flex items-center">
          <button
            className="text-4xl font-bold text-black"
            onClick={toggleMenu}>
            &#9776;
          </button>
          <img src="about/logo.png" className="md:ml-10 ml-4" alt="logo" />
        </div>
        <div className="flex items-center space-x-4 md:space-x-7">
          <i className="fas fa-music fa-2x text-[#1F4A40] md:flex hidden"></i>
          <i className="fas fa-user fa-2x text-[#1F4A40]"></i>
          <i className="fas fa-shopping-cart fa-2x text-[#1F4A40]"></i>
        </div>
      </div>

      {/* Sidebar */}
      <SliderNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar2;
