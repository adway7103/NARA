import React from "react";
import TopSection from "../components/home/TopSection";
import Navbar from "../components/Navbar/Navbar";
import BehindTheScreen from "../components/home/BehindTheScreen";
import Spotlight from "../components/home/Spotlight";
import MidSection from "../components/home/MidSection";
import FooterSection from "../components/home/FooterSection";

const Home = ({ isOpen }) => {
  return (
    <>
      <Navbar />
      <TopSection />
      <BehindTheScreen />
      <Spotlight />
      <MidSection />
      <FooterSection />
    </>
  );
};

export default Home;
