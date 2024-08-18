import React, { useState } from "react";
import SliderNavbar from "./SliderNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center md:px-10 px-4 pt-4 bg-opacity-80">
        <div className="flex items-center">
          <button
            className="md:text-4xl text-4xl font-bold text-white"
            onClick={toggleMenu}
          >
            &#9776;
          </button>
          <img src="home/logo.png" className="md:ml-10 ml-4" alt="logo" />
        </div>
        <div className="flex items-center md:space-x-7 space-x-4">
          <i className="fas fa-music fa-2x text-white md:flex hidden"></i>
          <i className="fas fa-user fa-2x text-white"></i>
          <i className="fas fa-shopping-cart fa-2x text-white"></i>
        </div>
      </div>

      {/* Sidebar */}
      <SliderNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
