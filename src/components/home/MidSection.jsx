import React from "react";

const MidSection = () => {
  const testimonials = [
    {
      name: "Floyd Miles",
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit...",
      rating: 4,
      image: "/home/person/img1.png",
      bgColor: "bg-[#d8e3b136]",
      border: "border-[#D8E3B1]",
    },
    {
      name: "Floyd Miles",
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit....",
      rating: 5,
      image: "/home/person/img2.png",
      bgColor: "bg-[#b6b1d23d]",
      border: "border-[#B6B1D2]",
    },
    {
      name: "Floyd Miles",
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit...",
      rating: 5,
      image: "/home/person/img3.png",
      bgColor: "bg-[#d8e3b136]",
      border: "border-[#D8E3B1]",
    },
    // {
    //   name: "Floyd Miles",
    //   text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit....",
    //   rating: 5,
    //   image: "/path/to/image2.jpg",
    //   bgColor: "bg-[#E4E8F9]",
    // },
  ];
  return (
    <>
      <div className="bg-[#E9EAC6] min-h-screen relative flex flex-col justify-center items-center">
        <div className="absolute text-center top-28 ">
          <h1 className="text-5xl font-semibold italic tracking-wide text-black mb-8  whitespace-break-spaces">
            <span className="block mb-3">YOU CAN FIND</span>
            <span className="block">HIDDEN GEMS,</span>
          </h1>
          <p className="text-3xl font-normal text-black">
            if you look around, with all
          </p>
          <p className="text-3xl font-normal text-black text-left">
            your heart.
          </p>
        </div>

        {/* Stars pattern at the bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <img
            src="/home/frame.png"
            alt="Stars pattern"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-3xl font-bold italic tracking-wide uppercase ">
            Wind brought in the word
          </h2>
          <p className="mt-2 text-black">
            This is what people have to say about us.
          </p>
          <button className="mt-6 bg-transparent border border-[#B5B5B5] text-[#1F4A40] font-semibold py-2 px-6">
            View all
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 border-2 ${testimonial.bgColor} ${testimonial.border}`}>
              <div className="flex mb-4 justify-between">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-[#1F4A40] text-3xl font-bold">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i}>*</span>
                  ))}
                </div>
              </div>
              <h3 className="text-[16px] font-bold text-black mb-7">
                {testimonial.name}
              </h3>
              <p className="text-black font-medium text-[14px]">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MidSection;
