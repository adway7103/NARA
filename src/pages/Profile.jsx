import { useState } from "react";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";
import AddressesSection from "../components/profile/AddressesSection";
import expandIcon from "../assets/icons/expand.svg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("../");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`flex flex-col min-h-screen dark:bg-black dark:text-white ${isMenuOpen ? "h-screen overflow-hidden" : ""}`}>
      <Header onBack={handleBack} onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      <MainContent isMenuOpen={isMenuOpen} />
    </div>
  );
}


function Header({ onBack, onMenuToggle, isMenuOpen }) {
  return (
    <header className="font-bold py-2 px-4 border-b-2 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <button className="lg:hidden text-3xl dark:text-white" onClick={onMenuToggle}>
          &#9776;
        </button>
        <h1 className="text-2xl font-bold">MY ACCOUNT</h1>
      </div>
      <button onClick={onBack} className="border-2 w-12 text-4xl border-[#B5B5B5]">
        &times;
      </button>
    </header>
  );
}

function MainContent({ isMenuOpen }) {
  return (
    <main className="flex flex-grow flex-col lg:flex-row relative dark:bg-black">
      <Sidebar isMenuOpen={isMenuOpen} />
      <ContentArea />
    </main>
  );
}

function Sidebar({ isMenuOpen }) {
  return (
    <aside
      className={`absolute lg:relative bottom-0 top-0 transition-transform duration-500 ease-in-out transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:block lg:w-1/4 w-1/2 dark:bg-black bg-[#ffff] border-r p-4 flex flex-col gap-1`}
    >
      <div className="text-sm font-semibold bg-[#D8E3B180] border-l-2 border-l-[#1F4A40] p-2 flex justify-between">
        <h2>Account Details</h2>
        <img src={expandIcon} alt="expand icon" />
      </div>
      <h2 className="text-sm font-semibold border-b-2 p-2">My Orders</h2>
      <h2 className="text-sm font-semibold border-b-2 p-2">Payment Methods</h2>
    </aside>
  );
}

function ContentArea() {
  return (
    <section className="lg:w-3/4 flex-grow pt-4 pb-4 pl-8 lg:pr-24 pr-8 overflow-y-auto">
      <PersonalInfoSection />
      <AddressesSection />
    </section>
  );
}
