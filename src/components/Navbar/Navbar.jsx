import React, { useState, useEffect } from "react";
import SliderNavbar from "./SliderNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  const handleScroll = () => {
    const topSectionHeight =
      document.querySelector(".carousel-inner").offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > topSectionHeight - 100); // Adjust the value as needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center md:px-10 px-4 py-4 transition-colors duration-300 ${
          theme === "dark" && isScrolled
            ? "bg-black text-white"
            : "bg-transparent text-black dark:text-white"
        }`}>
        <div className="flex items-center">
          <button
            className="md:text-4xl text-4xl font-bold text-white"
            onClick={toggleMenu}>
            &#9776;
          </button>
          <img src="home/logo.png" className="md:ml-10 ml-4" alt="logo" />
        </div>
        <div className="flex items-center md:space-x-7 space-x-4">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 leading-9 text-4xl rounded-full m-1 text-white">
            <ion-icon name={theme === "light" ? "sunny" : "moon"}></ion-icon>
          </button>
          <i className="fas fa-music fa-2x text-white md:flex hidden"></i>
          <i className="fas fa-user fa-2x text-white md:flex hidden"></i>
          <i className="fas fa-shopping-cart fa-2x text-white"></i>
        </div>
      </div>
      <SliderNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
