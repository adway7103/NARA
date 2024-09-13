import React from "react";

const BehindTheScreen = () => {
  return (
    <>
      <div
        className="text-black dark:!text-white dark:!bg-none  font-mono p-4 "
        style={{
          backgroundImage: "url('/home/designs/design.jpeg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 my-10 lg:my-28">
          <div className="hidden lg:flex flex-col justify-start items-center lg:items-end text-center lg:text-right">
            <h2 className=" text-3xl font-bold italic mb-2 tracking-widest  ">
              BEHIND
            </h2>
            <h2 className=" text-3xl font-bold italic mb-2 tracking-widest ">
              THE
            </h2>
            <h2 className=" text-3xl font-bold italic mb-6 lg:mb-10 tracking-widest ">
              SCREEN
            </h2>
            <p className="mb-6 lg:mb-10 font-mono text-right">
              From brainstorming designs over chai to the final quality check, a
              lot of magic goes into each NARA piece.
            </p>
            <button className="text-lg text-[#1F4A40] dark:!text-[#D8E3B1] font-bold py-2 px-4 border-[2px] border-[#B5B5B5]">
              Our process
            </button>
          </div>
          <div className="relative grid grid-cols-2 gap-2 lg:col-span-2">
            <div className="relative col-span-2 row-span-2">
              <video
                src="/home/designs/d5.mp4"
                autoPlay
                loop
                muted
                className="bloc w-full md:w-full h-[400px] sm:h-[600px] sm:w-full lg:h-[650px] object-cover"
              />
            </div>
            <img
              src="/home/designs/d4.png"
              alt="Fashion 2"
              className="bloc absolute bottom-0 right-0 w-[150px] h-[300px] sm:w-[300px] sm:h-[400px] lg:w-[250px] lg:h-[450px] object-cover object-center"
            />
            <img
              src="/home/designs/d2.png"
              alt="Overlayed Fashion 1"
              className="bloc absolute top-0 right-0 w-[100px] h-[120px] sm:w-[200px] sm:h-[200px] lg:w-1/3 lg:h-1/3 object-fit"
            />
            <img
              src="/home/designs/d3.png"
              alt="Fashion 3"
              className="bloc absolute bottom-0 left-0 w-[150px] h-[200px] sm:w-2/5 sm:h-[300px] lg:w-2/5 lg:h-[300px] object-cover object-center"
            />
            <img
              src="/home/designs/d1.png"
              alt="Fashion 4"
              className="bloc absolute bottom-0 right-0 w-2/5 h-[200px] mr-20 sm:mr-40 lg:mr-36 sm:w-2/5 sm:h-[300px] lg:w-[2/5] lg:h-[300px] object-cover"
            />
          </div>
          <div className="lg:hidden flex flex-col justify-start text-left items-start ">
            <h2 className="text-2xl font-bold italic mb-4 lg:hidden tracking-widest">
              BEHIND THE SCREEN
            </h2>
            <p className="mb-6 sm:text-lg font-mono ">
              From brainstorming designs over chai to the final quality check, a
              lot of magic goes into each NARA piece.
            </p>
            <button className="text-[#1F4A40] dark:!text-[#D8E3B1] font-bold font-mono py-2 px-4 border-[2px] border-[#B5B5B5] ">
              Our process
            </button>
          </div>
          <div className="hidden lg:flex flex-col justify-end items-center lg:items-start lg:text-left">
            <h2 className="text-3xl font-bold mb-2 italic tracking-widest">
              Peek Into The
            </h2>
            <h2 className="text-3xl font-bold mb-8 italic tracking-widest">
              Chaos
            </h2>
            <p className="text-sm md:text-lg mb-4">
              and creativity behind the scenes
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BehindTheScreen;
