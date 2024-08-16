import React from "react";
import TopSection from "../components/home/TopSection";
import Navbar from "../components/Navbar/Navbar";

const Home = ({ isOpen }) => {
  return (
    <>
      <Navbar />
      <TopSection />
    </>
  );
};

export default Home;
