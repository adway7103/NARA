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
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center md:px-10 pl-4 pr-2 py-4 transition-colors duration-300 ${
          isScrolled
            ? theme === "light"
              ? "bg-white text-black" // Light mode when scrolled
              : "bg-black text-white" // Dark mode when scrolled
            : theme === "light"
            ? "bg-transparent text-black" // Light mode when at top
            : "bg-transparent text-white" // Dark mode when at top
        }`}>
        <div className="flex items-center">
          <button
            className={`md:text-4xl text-4xl font-bold ${
              isScrolled && theme === "light" ? "text-black" : "text-white"
            }`}
            onClick={toggleMenu}>
            &#9776;
          </button>
          <img
            src="home/navbar/logo.svg"
            className="h-[40px] md:ml-10 ml-4"
            alt="logo"
          />
        </div>
        <div className="flex items-center md:space-x-5 space-x-2">
          <button onClick={toggleTheme} className="text-4xl rounded-full ">
            {theme === "light" ? (
              isScrolled ? (
                <img src="home/navbar/light_icon1.svg" alt="light mode icon" />
              ) : (
                <img
                  src="home/navbar/light_icon1.svg"
                  className="white-icon"
                  alt="light mode icon"
                />
              )
            ) : (
              <img src="home/navbar/icon4.svg" alt="dark mode icon" />
            )}
          </button>
          {theme === "light" ? (
            isScrolled ? (
              <>
                <img src="home/navbar/icon1.svg" alt="light mode icon" />
                <img src="home/navbar/user.svg" alt="light mode icon" />
                <img
                  src="home/navbar/shoppingCart.svg"
                  className="md:flex hidden"
                  alt="light mode icon"
                />
              </>
            ) : (
              <>
                <img
                  src="home/navbar/icon1.svg"
                  className="white-icon"
                  alt="light mode icon"
                />
                <img
                  src="home/navbar/user.svg"
                  className="white-icon"
                  alt="light mode icon"
                />
                <img
                  src="home/navbar/shoppingCart.svg"
                  className="white-icon md:flex hidden"
                  alt="light mode icon"
                />
              </>
            )
          ) : (
            <>
              <img
                src="home/navbar/icon1.svg"
                className="white-icon"
                alt="dark mode icon"
              />
              <img
                src="home/navbar/user.svg"
                className="white-icon"
                alt="light mode icon"
              />
              <img
                src="home/navbar/shoppingCart.svg"
                className="white-icon md:flex hidden"
                alt="light mode icon "
              />
            </>
          )}
        </div>
      </div>
      <SliderNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
