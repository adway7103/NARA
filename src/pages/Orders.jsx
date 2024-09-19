import { useState } from "react";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";
import AddressesSection from "../components/profile/AddressesSection";
import expandIcon from "../assets/icons/expand.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../store";
import { LiaPowerOffSolid } from "react-icons/lia";

export default function Orders() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={` h-[100vh] dark:bg-black dark:text-white`}>
      <Header
        onBack={handleBack}
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMenuOpen}
      />
      <MainContent isMenuOpen={isMenuOpen} />
    </div>
  );
}

function Header({ onBack, onMenuToggle, isMenuOpen }) {
  return (
    <header className="font-bold py-2 px-4 border-b-2 flex justify-between items-center h-[4em]">
      <div className="flex gap-4 items-center">
        <button
          className="lg:hidden text-3xl dark:text-white"
          onClick={onMenuToggle}
        >
          &#9776;
        </button>
        <h1 className="text-2xl font-bold">MY ACCOUNT</h1>
      </div>
      <div className="border-2 w-12 text-4xl border-[#B5B5B5] flex items-center justify-center  ">
        <button onClick={onBack}>&times;</button>
      </div>
    </header>
  );
}

function MainContent({ isMenuOpen }) {
  return (
    <main className="flex flex-grow relative dark:bg-black h-[calc(100vh-4em)]">
      <Sidebar isMenuOpen={isMenuOpen} />
      <ContentArea />
    </main>
  );
}

function Sidebar({ isMenuOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    dispatch(setAuthStatus({ setAccessToken: null, isAuthenticated: false }));

    navigate("/");
  };
  return (
    <aside
      className={`absolute z-[10000] lg:relative top-0 bottom-0 transition-transform duration-500 ease-in-out transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 flex flex-col xl:justify-between   lg:w-1/4 w-4/5 dark:bg-black bg-[#ffff] border-r p-4 gap-12`}
    >
      <div>
        <Link to={"/profile"}>
          <h2 className="text-sm font-semibold border-b-2 p-2">
            Account Details
          </h2>
        </Link>

        <div className="text-sm font-semibold bg-[#D8E3B180] border-l-2 border-l-[#1F4A40] p-2 flex justify-between">
          <h2>My Orders</h2>
          <img src={expandIcon} alt="expand icon" />
        </div>
      </div>
      <button
        className="flex items-center justify-center gap-2 font-bold dark:text-[#ffff] border-2 p-1 text-lg"
        onClick={logoutHandler}
      >
        {" "}
        <LiaPowerOffSolid size={24} /> <span>Log out</span>
      </button>
    </aside>
  );
}
import { GoKebabHorizontal } from "react-icons/go";
function ContentArea() {
  return (
    
   
    <section className="flex-grow  lg:w-[calc(100vw-25%)] overflow-y-auto">
      
       
    <div className="bg-[#F5F5F5] p-3 font-outfit flex gap-2 justify-center items-center">
            <button className="rounded-full border-2 border-[#D8E3B1] px-2 bg-[#D8E3B1]">In Progress</button>
            <button className="border-2 px-2 border-[#C4C4C4] rounded-full">Completed</button>
        </div>

      <div className="pt-2 pb-4 pl-2 lg:pr-8 pr-8">

        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
      </div>
    </section>
  
  );
}

function OrderItem (){
  return (
    <div>
    {/* Order Item */}
    <div className="flex lg:flex-row flex-wrap gap-12 lg:gap-2  justify-around  p-4  lg:justify-between  border-b-2 border-gray-200 pb-4">
         
    {/* image and order id section */}

    <div className="flex flex-row lg:gap-2 justify-between gap-4 ">

    <div className="w-[100px] h-[106px] ">
       <img
         className="object-cover w-full h-full"
         src="https://cdn.shopify.com/s/files/1/0713/4265/3695/files/MG_5764_1.jpg?v=1726065990"
         alt=""
       />
     </div>
     {/* Information */}

     <div className="flex flex-col justify-between ">
       <div className="flex gap-2">
         <span className="bg-[#D8E3B1] px-2 py-1 font-bold text-xs">
           In Progress
         </span>
         <span className="bg-[#F5F5F5] px-2 py-1 font-bold  text-xs">
           {" "}
           Cash On Delivery
         </span>
       </div>

       <div className="font-antikor flex flex-col gap-2 ">
         <h1 className="font-black text-md tracking-tighter">Order ID: #NA1008456789</h1>
         <h2 className="text-xs tracking-tighter font-bold">Roglan mili pannelled dress</h2>

         <div className="flex items-center text-xs ">
           <span className=" border-r-2 border-r-black pr-4">
             Quantity: <strong>1</strong>
           </span>
           <span className="pl-4">
             Size: <strong>M</strong>
           </span>
         </div>
       </div>
     </div>

    </div>
     {/* Progress */}
     <Stepper />
     {/* Action Section */}

     <div className="flex items-center  justify-between lg:gap-6 w-full xl:w-auto ">
       <div className="flex xl:flex-col justify-between w-full xl:w-auto xl:text-right text-xs">
         <span>
           Order date: <strong>5 Aug, 2024</strong>
         </span>
         <span>
           Expected Delivery date: <strong>13 Aug, 2024</strong>
         </span>
       </div>

       {/* <GoKebabHorizontal size={24} className="rotate-90" /> */}
     </div>
   </div>
   </div>
  )
}

function Stepper() {
  return (
    <div className="font-antikor font-bold text-[10px]  flex justify-center -mt-3 ">
      {/* Order Placed */}
      
      <div className=" mt-auto mb-auto flex items-center ">
        <div className="bg-gray-200 h-[2px] w-8"></div>
        <div className="bg-[#1F4A40] border-2 border-[#1F4A40] rounded-full w-2 h-2 relative">
          <span className=" absolute top-4 left-1/2 transform -translate-x-1/2">
            Order&nbsp;Placed
          </span>
        </div>
      </div>

      {/* In Progress */}
      <div className="mt-auto mb-auto flex items-center">
        <div className="bg-gray-200 h-[2px] w-20"></div>
        <div className="border-2 border-[#1F4A40] rounded-full w-2 h-2 relative">
          <span className=" absolute top-4 left-1/2 transform -translate-x-1/2">
            In&nbsp;Progress
          </span>
        </div>
      </div>


        {/* Shipped*/}
        <div className="mt-auto mb-auto flex items-center">
        <div className="bg-gray-200 h-[2px] w-16"></div>
        <div className="bg-gray-200 border-2 border-gray-200 rounded-full w-2 h-2 relative">
          <span className=" absolute top-4 left-1/2 transform -translate-x-1/2">
            Shipped
          </span>
        </div>
      </div>

      {/* Shipped*/}
      <div className="mt-auto mb-auto flex items-center">
        <div className="bg-gray-200 h-[2px] w-16"></div>
        <div className="bg-gray-200 border-2 border-gray-200 rounded-full w-2 h-2 relative">
          <span className=" absolute top-4 left-1/2 transform -translate-x-1/2">
            Delivered
          </span>
        </div>
      </div>

      {/* End*/}
      <div className="mt-auto mb-auto flex items-center">
        <div className="bg-gray-200 h-[2px] w-8"></div>
       
      </div>
    </div>
  );
}
