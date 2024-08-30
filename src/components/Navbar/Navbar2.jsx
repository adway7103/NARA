import React, { useState, useEffect } from "react";
import SliderNavbar from "./SliderNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white dark:!bg-black md:px-10 px-4 py-4 bg-opacity-80">
        <div className="flex items-center">
          <button
            className="text-4xl font-bold text-black dark:!text-white"
            onClick={toggleMenu}>
            &#9776;
          </button>
          <img src="about/logo.png" className=" md:ml-10 ml-4" alt="logo" />
          {/* <img src="home/logo.png" className="dark md:ml-10 ml-4" alt="logo" /> */}
        </div>
        <div className="flex items-center space-x-4 md:space-x-7">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 leading-9 text-4xl rounded-full m-1 text-[#1F4A40] dark:!text-white">
            <ion-icon name={theme === "light" ? "sunny" : "moon"}></ion-icon>
          </button>
          <i className="fas fa-music fa-2x text-[#1F4A40] dark:!text-white md:flex hidden"></i>
          <i className="fas fa-user fa-2x text-[#1F4A40] dark:!text-white md:flex hidden"></i>
          <i className="fas fa-shopping-cart fa-2x text-[#1F4A40] dark:!text-white"></i>
        </div>
      </div>

      {/* Sidebar */}
      <SliderNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar2;
