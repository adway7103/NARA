import React from "react";

const BehindTheScreen = () => {
  return (
    <>
      <div
        className="text-black font-sans p-4"
        style={{
          backgroundImage: "url('/home/designs/design.jpeg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12 my-28">
          {/* Left Section */}
          <div className="flex flex-col justify-start items-end">
            <h2 className="text-3xl font-bold italic mb-4">BEHIND</h2>
            <h2 className="text-3xl font-bold italic mb-4">THE</h2>
            <h2 className="text-3xl font-bold italic mb-10">SCREEN</h2>
            <p className="mb-10 font-sans text-right">
              From brainstorming designs over chai to the final quality check, a
              lot of magic goes into each NARA piece.
            </p>
            <button className=" text-[#1F4A40] font-bold py-2 px-4 border-[2px] border-[#B5B5B5]">
              Our process
            </button>
          </div>

          {/* Center Section - Images */}
          <div className="relative grid grid-cols-2 gap-2 col-span-2">
            <div className="relative col-span-2 row-span-2">
              <video
                src="/home/designs/d5.mp4"
                autoPlay
                loop
                muted
                className="w-full h-[650px] object-cover"
              />
            </div>
            <img
              src="/home/designs/d4.png"
              alt="Fashion 2"
              className="absolute bottom-0 right-0 w-[250px] h-[450px] object-cover"
            />
            <img
              src="/home/designs/d2.png"
              alt="Overlayed Fashion 1"
              className="absolute top-0 right-0 w-1/3 h-1/3 object-fit"
            />
            <img
              src="/home/designs/d3.png"
              alt="Fashion 3"
              className="absolute bottom-0 left-0 w-1/2 h-[300px] object-cover"
            />
            <img
              src="/home/designs/d1.png"
              alt="Fashion 4"
              className="absolute bottom-0 right-0 mr-28 w-[250px] h-[300px] object-cover"
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-end items-left">
            <h2 className="text-3xl font-bold mb-2 italic">Peek Into The</h2>
            <h2 className="text-3xl font-bold mb-8 italic">Chaos</h2>
            <p className="text-lg mb-4">and creativity behind the scenes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BehindTheScreen;
