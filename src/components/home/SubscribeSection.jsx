import React from "react";

const SubscribeSection = () => {
  return (
    <div>
      <div className="relative lg:min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-full">
          {/* Top Row Images */}
          <div className="col-span-1 w-full h-full md:h-96">
            <img
              src="/home/footer/f3.jpeg"
              alt="Image 1"
              className="bloc w-full h-full object-center object-cover"
            />
          </div>
          <div className="col-span-1 w-full h-full md:h-96">
            <img
              src="/home/footer/f2.JPG"
              alt="Image 2"
              className="bloc w-full h-full object-cover object-center"
            />
          </div>
          <div className="hidden md:col-span-2 w-full h-96 md:block">
            <img
              src="/home/footer/f1.jpeg"
              alt="Image 2"
              className="bloc w-full h-full object-cover object-center"
            />
          </div>
          {/* Bottom Row Images */}
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f4.JPG"
              alt="Image 4"
              className="bloc w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f5.svg"
              alt="Image 5"
              className="bloc w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f4.png"
              alt="Image 6"
              className="bloc w-full h-full object-cover object-right-bottom"
            />
          </div>
          <div className="col-span-1 w-full h-40 md:h-96">
            <img
              src="/home/footer/f5.jpeg"
              alt="Image 7"
              className="bloc w-full h-full object-cover object-left"
            />
          </div>
        </div>
        {/* Subscribe Section */}
        <div className="absolute bottom-0 w-6/7 mx-[10px] sm:mx-[20px] lg:ml-[250px] lg:w-2/3 h-[230px] sm:h-[300px] lg:h-3/5 bg-white p-8 sm:p-16 lg:pt-24 lg:px-32">
          <h2 className="text-lg md:text-3xl font-extrabold italic tracking-widest text-black mb-3 sm:mb-8 lg:mb-10 text-left">
            JOIN US AT NARA
          </h2>
          <p className="text-black font-normal mb-4 sm:mb-20 lg:pt-6 lg:pb-10 tracking-widest text-[11px] md:text-lg">
            We promise to NOT spam you. Share your email ID, so that we can keep
            you informed about our exclusive drops and offers.
          </p>
          <div className="flex justify-center items-center">
            <div className="relative w-full md:w-full ">
              <input
                type="email"
                placeholder="Email ID"
                className="border border-[#C4C4C4] h-12 sm:h-16 lg:h-16 p-2 sm:p-4 lg:pl-20 w-full pr-24 text-lg"
              />
              <button className="absolute top-0 right-0 bg-[#1E7B74] font-bold text-[14px] text-white py-1 px-2 lg:px-4 my-2 mr-2 sm:px-4 sm:h-12 lg:h-12 lg:w-24">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
