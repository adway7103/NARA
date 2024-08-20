import React, { useState, useEffect } from "react";
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
      image: "/home/person/img1.png",
      bgColor: "bg-[#d8e3b136]",
      border: "border-[#D8E3B1]",
    },
    {
      name: "Floyd Miles",
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit...",
      rating: 5,
      image: "/home/person/img2.png",
      bgColor: "bg-[#b6b1d23d]",
      border: "border-[#B6B1D2]",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(getVisibleReviews());
  function getVisibleReviews() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleReviews : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - visibleReviews ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const newVisibleReviews = getVisibleReviews();
      setVisibleReviews(newVisibleReviews);
      setCurrentIndex((prevIndex) =>
        prevIndex >= testimonials.length - newVisibleReviews ? 0 : prevIndex
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [testimonials.length]);
  return (
    <>
      <div className="bg-[#E9EAC6] min-h-screen relative flex flex-col justify-center items-center">
        <div className="absolute text-center top-28 ">
          <h1 className="text-3xl md:text-5xl font-semibold italic tracking-wide text-black mb-8 whitespace-break-spaces">
            <span className="block mb-3 tracking-widest">YOU CAN FIND</span>
            <span className="block tracking-widest">HIDDEN GEMS,</span>
          </h1>
          <p className="text-xl md:text-3xl font-normal text-black tracking-widest">
            if you look around, with all
          </p>
          <p className="text-xl md:text-3xl font-normal text-black text-left md:tracking-widest">
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
      <div className="relative">
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto text-left pl-3">
            <h2 className="text-xl md:text-3xl font-bold italic tracking-widest uppercase">
              Wind brought in the word
            </h2>
            <p className="mt-2 text-black">
              This is what people have to say about us.
            </p>
            <button className="mt-6 bg-transparent border border-[#B5B5B5] text-[#1F4A40] font-semibold py-2 px-6">
              View all
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-10 md:mx-20">
            {testimonials
              .slice(currentIndex, currentIndex + visibleReviews)
              .map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-6 border-2 ${testimonial.bgColor} ${testimonial.border}`}>
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

          <button
            className="absolute top-2/3 transform -translate-y-1/2 left-4 bg-gray-200 rounded-full p-2"
            onClick={handlePrevClick}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="absolute top-2/3 transform -translate-y-1/2 right-4 bg-gray-200 rounded-full p-2"
            onClick={handleNextClick}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default MidSection;
