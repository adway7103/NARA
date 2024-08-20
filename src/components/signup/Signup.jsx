import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import LoginImage from "../../assets/LoginImage.png";
import LoginMobile from "../../assets/loginMobile.png";
import logo from "../../assets/NaraLogo.png";
import { MuiTelInput } from "mui-tel-input";
import SignupApi from "../../apis/SignupApi";
import { toast } from "sonner";

function SignupSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [actualPhone, setActualPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    isLoading && toast.loading("Signing up...");
    try {
      const response = await SignupApi({
        name,
        phone,
        email,
        password,
      });
      toast.success("Signup successful!");
      console.log("Signup successful:", response);
      // Handle successful signup (e.g., redirect)
    } catch (error) {
      toast.error("Signup failed: " + error.message);
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[100%] flex lg:flex-row flex-col">
      <div className="lg:w-[50%] h-full object-cover lg:fixed">
        <img
          src={LoginImage}
          className="h-full w-full object-cover lg:flex hidden"
        />
        <img
          src={LoginMobile}
          className="h-full w-full object-cover lg:hidden"
        />
      </div>
      <div className="lg:w-[50%] lg:ml-[50%] min-h-full px-8 py-16 flex justify-center items-center overflow-scroll">
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
              <p className="text-[#626262] text-sm">Your Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                type="text"
              />
            </div>{" "}
            <div className="">
              <p className="text-[#626262] text-sm">Phone Number</p>
              <MuiTelInput
                value={phone}
                required={true}
                onChange={(v, info) => {
                  setPhone(v);
                  setActualPhone(info.nationalNumber);
                  setCountry(`+${info.countryCallingCode}`);
                }}
                name="phone"
                id="phone"
                placeholder="Phone*"
                defaultCountry="US"
                size="small"
                variant="outlined"
                className="w-full bg-[#F7F7F7] border-3"
              />
            </div>
            <div className="w-full">
              <p className="text-[#626262] text-sm">Email Id</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                type="text"
              />
            </div>{" "}
            <div>
              <p className="text-[#626262] text-sm">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border-1 border-[#A7A7A766] bg-[#F7F7F7] w-full"
                type="password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#1F4A40] text-white font-semibold px-2 py-2 mt-2"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
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
              Sign up with Google
            </button>
          </div>
          <div className="flex gap-1 justify-center">
            Already have an account?
            <a className="text-[#1F4A40] font-semibold" href="/login">
              Login.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupSection;
