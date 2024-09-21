import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import LoginImage from "../../assets/LoginImage.png";
import LoginMobile from "../../assets/loginMobile.png";
import logo from "../../assets/NaraLogo.png";
import LoginApi from "../../apis/LoginApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCart, setActiveCartId, setAuthStatus, setCheckoutUrl, setProductsinCart, setTotalQuantityInCart } from "../../store";
function LoginSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = { email, password };
    try {
      const accessToken = await LoginApi(userData);
      toast.success("Login successful!");
      dispatch(setAuthStatus({accessToken, isAuthenticated: true}));
      dispatch(deleteCart());
      localStorage.removeItem("cartId");
      navigate("/");
     
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-[100%] h-screen flex lg:flex-row flex-col">
      <div className="lg:w-[50%] h-full object-cover">
        <img
          src={LoginImage}
          className="h-full w-full object-cover lg:flex hidden"
        />
        <img
          src={LoginMobile}
          className="h-full w-full object-cover lg:hidden"
        />
      </div>
      <div className="lg:w-[50%] h-full px-8 py-16 flex justify-center items-center">
        <div className="max-w-[480px] flex-col flex gap-[30px]">
          <div className="w-full h-full flex flex-col gap-[10px]">
            <p className="font-extrabold text-2xl">Welcome to</p>
            <div>
              <img src={logo} alt="logo" className="w-[200px] lg:w-[300px]" />
            </div>{" "}
            <p className="font-light lg:text-xl text-md mt-2">
              Today is a new day. It's your day. You shape it. You style it. Be
              the best version of yourself
            </p>
          </div>{" "}
          <div className="w-full h-full flex flex-col gap-[10px]">
            <div className="w-full">
              <p className="text-[#626262] text-sm">Email Id</p>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                type="text"
              />
            </div>{" "}
            <div>
              <p className="text-[#626262] text-sm">Password</p>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                type="password"
              />
            </div>
            <p className="text-[#1F4A40] text-right items-end">
              Forgot Password?
            </p>
            <button
              onClick={handleLogin}
              className="bg-[#1F4A40] text-white font-semibold px-2 py-2"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="py-[0.5px] bg-[#CFDFE2] w-full"></div>
            <p>Or</p>
            <div className="py-[0.5px] bg-[#CFDFE2] w-full"></div>
          </div>
          <div>
            {" "}
            <button className="font-semibold px-2 py-2 w-full bg-blue-50">
              Sign in with Google
            </button>
          </div>
          <div className="flex gap-1 justify-center">
            Dont have an account?
            <a className="text-[#1F4A40] font-semibold" href="/signup">
              Sign Up.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;
