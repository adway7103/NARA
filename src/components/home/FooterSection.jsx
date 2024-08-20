import React from "react";
import topVideo from "../../assets/home/backgroundVideo.mp4";

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="relative lg:min-h-screen">
        <div className="grid grid-cols-4 w-full max-w-full">
          {/* Top Row Images */}
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f1.png"
              alt="Image 1"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f2.png"
              alt="Image 2"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-2 w-full h-40 md:h-96">
            <video
              autoPlay
              loop
              muted
              src={topVideo}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Bottom Row Images */}
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f4.png"
              alt="Image 4"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f5.png"
              alt="Image 5"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f4.png"
              alt="Image 6"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f7.png"
              alt="Image 7"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        {/* Subscribe Section */}
        <div className="absolute bottom-0 left-[80px] sm:left-[150px] lg:left-[250px] w-2/3 h-[230px] sm:h-[400px] lg:h-3/5 bg-white p-8 sm:p-16 lg:p-32">
          <h2 className="text-lg md:text-3xl font-bold italic tracking-widest text-black mb-4 md:mb-8 text-left">
            JOIN US AT NARA
          </h2>
          <p className="text-black font-normal mb-4 md:mb-20 tracking-widest text-[10px] md:text-lg">
            We promise to NOT spam you. Share your email ID, so that we can keep
            you informed about our exclusive drops and offers.
          </p>
          <div className="flex justify-center items-center">
            <div className="relative w-full md:w-full ">
              <input
                type="email"
                placeholder="Email ID"
                className="border border-[#C4C4C4] p-2 md:p-6 w-full pr-24"
              />
              <button className="absolute top-0 right-0 bg-[#1E7B74] text-white py-2 px-2 sm:px-4">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] text-center pt-8 relative">
        <div
          className="top-2  text-[#1E7B74] text-sm cursor-pointer mt-16"
          onClick={scrollToTop}>
          <p>Scroll up</p>
          <div className="text-2xl">
            <i className="fas fa-chevron-up"></i>
          </div>
        </div>
        <div className="hidden lg:block text-[#C4C4C4] my-10">
          <div className="flex flex-wrap justify-center space-x-5 mb-4">
            {Array(42)
              .fill(null)
              .map((_, index) => (
                <img
                  key={index}
                  src="/home/footer/star.png"
                  alt="Decoration"
                  className="w-4 h-4"
                />
              ))}
          </div>
          <div className="flex flex-wrap justify-center space-x-5">
            {Array(42)
              .fill(null)
              .map((_, index) => (
                <img
                  key={index}
                  src="/home/footer/star.png"
                  alt="Decoration"
                  className="w-4 h-4"
                />
              ))}
          </div>
        </div>
        {/* Footer Links */}
        <div className="text-[#1F4A40] text-[5px] sm:text-[8px] lg:text-[14px] font-bold my-4 md:mb-4">
          <div className="flex justify-center space-x-3 md:space-x-20">
            <a href="#" className="underline">
              Contact us
            </a>
            <a href="#" className="underline">
              Track order
            </a>
            <a href="#" className="underline">
              Privacy policies
            </a>
            <a href="#" className="underline">
              Terms of use
            </a>
            <a href="#" className="underline">
              Shipping policies
            </a>
          </div>
        </div>
        <div className="bg-black text-[10px] font-bold text-white py-4 tracking-widest">
          <p>Copyright © 2024 NARA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
